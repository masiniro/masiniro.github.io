#!/usr/bin/env python3
"""
AutoRO — Generator automat de articole cu Claude API
Faza 2: Postare zilnică automată

Variabile de mediu necesare (GitHub Secrets):
  ANTHROPIC_API_KEY  — cheia API de la console.anthropic.com
  TOPIC              — subiect opțional (altfel Claude alege)
  CATEGORY           — categoria articolului
"""

import os
import re
import sys
import json
import datetime
import anthropic

# ─── Config ────────────────────────────────────────────────────────────────

ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")
TOPIC             = os.environ.get("TOPIC", "").strip()
CATEGORY          = os.environ.get("CATEGORY", "Știri")
MODEL             = "claude-opus-4-5"

CATEGORY_EMOJIS = {
    "Știri":       "📰",
    "Teste":       "🚗",
    "Sfaturi":     "💡",
    "Electrice":   "⚡",
    "Second Hand": "🔍",
}

TOPIC_POOLS = {
    "Știri": [
        "noile reglementări privind ITP-ul în România 2025",
        "prețurile carburanților în România — analiză lunară",
        "cele mai vândute mașini în România în ultimele luni",
        "autostrada A0 — stadiul actual al lucrărilor",
        "modificări la legislația privind permisele de conducere",
        "RAW — noi reguli pentru emisii CO2 în UE",
        "Dacia — noi modele anunțate pentru piața românească",
        "Electric charging infrastructure în România 2025",
    ],
    "Teste": [
        "Skoda Octavia 2025 — test drive complet în România",
        "Toyota Yaris Cross — cel mai bun hibrid accesibil?",
        "Renault Clio 2025 — test în traficul din București",
        "Volkswagen Golf 8 facelift — merită prețul în România?",
        "Hyundai Tucson PHEV — autonomie reală în condiții românești",
    ],
    "Sfaturi": [
        "cum alegi uleiul potrivit pentru mașina ta",
        "cum pregătești mașina pentru inspecția ITP",
        "ghid complet RCA — cum alegi asigurarea cea mai bună",
        "anvelope de iarnă vs. all-season în România",
        "economisire carburant — 10 tehnici testate",
    ],
    "Electrice": [
        "harta completă a stațiilor de încărcare din România 2025",
        "subvenții pentru mașini electrice în România — Rabla 2025",
        "costul real al unui an cu mașină electrică în România",
        "cele mai accesibile mașini electrice sub 25.000 euro",
    ],
    "Second Hand": [
        "cele mai fiabile mașini second hand sub 10.000 euro în România",
        "ghid verificare mașini germane aduse în România",
        "cum recunoști un kilometraj dat înapoi la mașinile second hand",
        "top mașini second hand care nu dau bătăi de cap",
    ],
}

SYSTEM_PROMPT = """Ești redactorul-șef al AutoRO, cel mai bun blog auto din România.
Scrii articole de înaltă calitate în română, precise, utile și captivante.

Regulile tale:
- Scrii EXCLUSIV în limba română corectă și fluentă
- Folosești diacritice corecte (ă, â, î, ș, ț)
- Articolele sunt bazate pe fapte reale, nu inventate
- Tonul este prietenos dar profesionist
- Incluzi date concrete, prețuri aproximative și sfaturi practice
- Structura: intro captivant, subtitluri H2/H3, liste, tabele dacă e cazul, concluzie
- Lungime: 600-900 cuvinte (nu mai mult, nu mai puțin)
- SEO natural: menționezi natural cuvintele cheie principale
- Nu inventezi cifre exacte — folosești "aproximativ", "în jur de", "conform surselor"
"""

# ─── Helpers ───────────────────────────────────────────────────────────────

def slugify(text: str) -> str:
    """Convert Romanian title to URL-safe slug."""
    replacements = {
        'ă': 'a', 'â': 'a', 'î': 'i', 'ș': 's', 'ț': 't',
        'Ă': 'a', 'Â': 'a', 'Î': 'i', 'Ș': 's', 'Ț': 't',
        'ş': 's', 'ţ': 't',  # alternate encodings
    }
    for ro, en in replacements.items():
        text = text.replace(ro, en)
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'\s+', '-', text.strip())
    text = re.sub(r'-+', '-', text)
    return text[:80]


def pick_topic() -> str:
    """Pick a topic — use env var or random from pool."""
    if TOPIC:
        return TOPIC
    import random
    pool = TOPIC_POOLS.get(CATEGORY, TOPIC_POOLS["Știri"])
    return random.choice(pool)


def get_date_strings():
    now = datetime.datetime.now()
    file_date  = now.strftime("%Y-%m-%d")
    front_date = now.strftime("%Y-%m-%d %H:%M:%S +0200")
    return file_date, front_date


def get_unsplash_image(query: str) -> str:
    """Return a safe Unsplash image URL for automotive content."""
    # Static curated car images to avoid API calls
    images = [
        "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&q=80",
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80",
        "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=80",
        "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=80",
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80",
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
        "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&q=80",
    ]
    import random
    return random.choice(images)


# ─── Core generator ────────────────────────────────────────────────────────

def generate_article(topic: str) -> dict:
    """Call Claude API and return structured article data."""
    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

    prompt = f"""Scrie un articol complet pentru blogul AutoRO despre: **{topic}**

Categoria articolului: {CATEGORY}

Returnează EXCLUSIV un JSON valid (fără markdown, fără backtick-uri) cu această structură:
{{
  "title": "Titlul articolului (max 80 caractere, captivant, cu keywords)",
  "description": "Meta description SEO (max 160 caractere)",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "content": "Conținutul complet în Markdown, cu H2 și H3, paragrafe, liste și tabele"
}}

Cerințe pentru content:
- Începe cu un paragraf introductiv captivant (fără titlu H1)
- Folosește 3-5 subtitluri H2
- Include cel puțin o listă sau un tabel
- Încheie cu o secțiune ## Concluzie
- 650-900 cuvinte total
- Markdown valid"""

    message = client.messages.create(
        model=MODEL,
        max_tokens=2000,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": prompt}]
    )

    raw = message.content[0].text.strip()

    # Strip any accidental markdown fences
    raw = re.sub(r'^```json\s*', '', raw)
    raw = re.sub(r'^```\s*', '', raw)
    raw = re.sub(r'\s*```$', '', raw)

    data = json.loads(raw)
    return data


def build_post_file(data: dict, topic: str) -> tuple[str, str]:
    """Build Jekyll front matter + content and return (filename, content)."""
    file_date, front_date = get_date_strings()
    slug      = slugify(data["title"])
    filename  = f"_posts/{file_date}-{slug}.md"
    image_url = get_unsplash_image(topic)
    tags_yaml = "\n".join(f'  - "{t}"' for t in data.get("tags", []))
    emoji     = CATEGORY_EMOJIS.get(CATEGORY, "🚗")

    front_matter = f"""---
layout: post
title: "{data['title'].replace('"', "'")}"
description: "{data['description'].replace('"', "'")}"
date: {front_date}
categories: [{CATEGORY}]
tags:
{tags_yaml}
author: AutoRO
image: "{image_url}"
generated: true
---

"""

    full_content = front_matter + data["content"]
    return filename, full_content


# ─── Main ──────────────────────────────────────────────────────────────────

def main():
    if not ANTHROPIC_API_KEY:
        print("❌ ANTHROPIC_API_KEY lipsește. Adaugă-o în GitHub Secrets.")
        sys.exit(1)

    topic = pick_topic()
    print(f"📝 Generez articol despre: {topic}")
    print(f"📁 Categoria: {CATEGORY}")

    try:
        data = generate_article(topic)
        print(f"✅ Titlu: {data['title']}")
    except json.JSONDecodeError as e:
        print(f"❌ Eroare parsing JSON: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Eroare API: {e}")
        sys.exit(1)

    filename, content = build_post_file(data, topic)

    # Write file
    os.makedirs("_posts", exist_ok=True)
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"✅ Articol salvat: {filename}")
    print(f"🔢 Cuvinte: {len(content.split())}")


if __name__ == "__main__":
    main()
