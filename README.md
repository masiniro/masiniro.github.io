# 🚗 AutoRO — Blog Auto România

Blog auto modern, ultra-rapid, generat automat cu Claude AI și publicat pe GitHub Pages.

## Stack

- **Jekyll 4.3** — generator static nativ GitHub Pages
- **Vanilla JS** — zero framework, PageSpeed 100
- **CSS custom** — design sistem complet, dark futuristic
- **GitHub Actions** — deploy automat + auto-posting zilnic
- **Claude API** — generare articole (Faza 2)

---

## Instalare locală

### Cerințe
- Ruby 3.2+
- Bundler

```bash
# 1. Clonează repo
git clone https://github.com/USERNAME/autoblog.git
cd autoblog

# 2. Instalează dependențele
bundle install

# 3. Rulează local
bundle exec jekyll serve --livereload

# 4. Deschide în browser
open http://localhost:4000
```

---

## Deploy pe GitHub Pages

### Pasul 1 — Creează repo-ul

```bash
git init
git add .
git commit -m "🚀 Initial AutoRO blog"
git branch -M main
git remote add origin https://github.com/USERNAME/autoblog.git
git push -u origin main
```

### Pasul 2 — Activează GitHub Pages

1. Mergi la **Settings → Pages**
2. Source: **GitHub Actions**
3. Deploy-ul rulează automat la fiecare push pe `main`

### Pasul 3 — Actualizează `_config.yml`

```yaml
url: "https://USERNAME.github.io"
baseurl: "/autoblog"  # sau "" dacă e repo principal
```

---

## Structura proiectului

```
autoblog/
├── _config.yml           # Configurare Jekyll
├── _layouts/
│   ├── default.html      # Layout de bază (header + footer)
│   ├── home.html         # Homepage cu hero + ticker + grid
│   ├── post.html         # Pagina articol cu sidebar + TOC
│   ├── archive.html      # Arhivă paginată
│   └── category.html     # Pagini de categorie
├── _includes/
│   ├── head.html         # <head> SEO + CSS
│   ├── header.html       # Header fix (glassmorphic)
│   ├── footer.html       # Footer cu coloane
│   └── post-card.html    # Card articol reutilizabil
├── _posts/               # ← Articolele tale (Markdown)
├── _sass/
│   ├── _variables.scss   # Design tokens
│   ├── _base.scss        # Reset + tipografie
│   ├── _header.scss      # Stiluri header
│   ├── _footer.scss      # Stiluri footer
│   ├── _components.scss  # Cards, ticker, pagination
│   ├── _post.scss        # Pagina articol
│   ├── _home.scss        # Homepage specific
│   └── _animations.scss  # Reveal on scroll
├── assets/
│   ├── css/main.scss     # Entry point CSS
│   └── js/main.js        # Vanilla JS (5KB)
├── scripts/
│   └── generate_post.py  # Script Claude API (Faza 2)
└── .github/workflows/
    ├── deploy.yml         # Auto-deploy la push
    └── auto-post.yml      # Auto-posting zilnic (Faza 2)
```

---

## Cum publici un articol manual

Creează un fișier în `_posts/` cu formatul:

```
_posts/YYYY-MM-DD-titlul-articolului.md
```

### Template articol

```markdown
---
layout: post
title: "Titlul articolului tău"
description: "Descriere SEO de 150-160 caractere"
date: 2025-03-17 09:00:00 +0200
categories: [Știri]   # Știri | Teste | Sfaturi | Electrice | Second Hand
tags:
  - "tag1"
  - "tag2"
author: AutoRO
image: "https://url-imagine.jpg"  # opțional
---

Primul paragraf al articolului tău...

## Subtitlu principal

Conținut...

## Alt subtitlu

Mai mult conținut...

## Concluzie

Concluzia articolului.
```

**Asta e tot.** Design-ul se aplică automat. Nu trebuie să te ocupi de nimic altceva.

---

## Faza 2 — Auto-posting cu Claude API

### Setup

1. **Obține API key** de la [console.anthropic.com](https://console.anthropic.com)

2. **Adaugă secret în GitHub:**
   - Settings → Secrets → Actions → New secret
   - Name: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-...`

3. **Activează workflow-ul:**
   - Actions → `Auto-Post cu Claude AI` → Enable

### Funcționare

Zilnic la **08:00 ora României**, GitHub Actions:
1. Rulează `scripts/generate_post.py`
2. Claude scrie un articol complet în română (650-900 cuvinte)
3. Fișierul `.md` este commit-uit automat în `_posts/`
4. Jekyll rebuild-uiește și publică

### Trigger manual

Poți declanșa manual din **Actions → Auto-Post cu Claude AI → Run workflow**

Opțional poți specifica:
- **topic** — subiect specific (ex: "Dacia Logan 2025 preț nou")
- **category** — Știri / Teste / Sfaturi / Electrice / Second Hand

### Cost estimat

- ~1.500-2.000 tokens per articol
- Claude claude-opus-4-5: ~$0.01-0.02 per articol
- **~$5-7 / lună** pentru 365 articole/an

---

## Categorii disponibile

| URL | Categorie | Front matter |
|-----|-----------|--------------|
| `/stiri/` | Știri Auto | `categories: [Știri]` |
| `/teste/` | Teste Drive | `categories: [Teste]` |
| `/sfaturi/` | Sfaturi Practice | `categories: [Sfaturi]` |
| `/electrice/` | Mașini Electrice | `categories: [Electrice]` |
| `/second-hand/` | Second Hand | `categories: [Second Hand]` |

---

## Personalizare

### Culori (în `_sass/_variables.scss`)

```scss
--clr-accent: #E8FF47;   /* culoarea accent principală */
--clr-bg:     #080A0F;   /* background */
```

### Titlul blogului (în `_config.yml`)

```yaml
title: "NumeleTau"
description: "Descrierea ta..."
url: "https://username.github.io"
```

### Logo (în `_includes/header.html` și `footer.html`)

Caută `logo-mark` și schimbă `AR` cu inițialele tale.

---

## PageSpeed & Performance

- Zero JavaScript framework (vanilla JS < 5KB)
- CSS comprimat automat de Jekyll
- Fonturi Google cu `preconnect` și `display=swap`
- Imagini cu `loading="lazy"` și `decoding="async"`
- Fără render-blocking resources
- **Target: PageSpeed 95-100** pe mobile și desktop

---

## Licență

MIT — folosește liber, modifică cum dorești.
