---
layout: default
title: "Auto pe Orașe din România — AutoRO"
description: "Știri și informații auto organizate pe orașe din România. Găsește știri auto relevante pentru orașul tău."
permalink: /orase/
---

<section style="padding: var(--space-3xl) 0;">
  <div class="container">

    <div style="margin-bottom: var(--space-2xl);">
      <p style="font-family:var(--font-mono);font-size:0.75rem;color:var(--clr-accent);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:var(--space-sm);">
        40 de orașe
      </p>
      <h1>Auto pe Orașe din România</h1>
      <p style="color:var(--clr-text-3);margin-top:var(--space-md);max-width:580px;">
        Știri auto, prețuri carburant și informații relevante pentru fiecare oraș major din România.
      </p>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:var(--space-sm);">

      {% assign cities = "București,Cluj-Napoca,Timișoara,Iași,Constanța,Craiova,Brașov,Galați,Ploiești,Oradea,Brăila,Arad,Pitești,Sibiu,Bacău,Târgu Mureș,Baia Mare,Buzău,Satu Mare,Râmnicu Vâlcea,Suceava,Piatra Neamț,Deva,Focșani,Târgoviște,Tulcea,Reșița,Slobozia,Alexandria,Zalău,Sfântu Gheorghe,Miercurea Ciuc,Dej,Lugoj,Mediaș,Roman,Turda,Hunedoara,Câmpina,Drobeta-Turnu Severin" | split: "," %}

      {% for city in cities %}
        {% assign city_slug = city | downcase
           | replace: " ", "-"
           | replace: "ă", "a" | replace: "â", "a" | replace: "î", "i"
           | replace: "ș", "s" | replace: "ț", "t"
           | replace: "Ă", "a" | replace: "Â", "a" | replace: "Î", "i"
           | replace: "Ș", "s" | replace: "Ț", "t" %}
        <a href="{{ '/orase/' | append: city_slug | append: '/' | relative_url }}"
           style="
             display:flex;align-items:center;gap:10px;
             background:var(--clr-surface);border:1px solid var(--clr-border);
             border-radius:var(--r-md);padding:14px 16px;
             font-family:var(--font-display);font-weight:600;font-size:0.9rem;
             color:var(--clr-text-2);transition:all 180ms;
           "
           onmouseover="this.style.borderColor='var(--clr-accent)';this.style.color='var(--clr-accent)';this.style.background='var(--clr-accent-dim)'"
           onmouseout="this.style.borderColor='var(--clr-border)';this.style.color='var(--clr-text-2)';this.style.background='var(--clr-surface)'">
          <span style="font-size:1.1rem;">📍</span>
          {{ city }}
        </a>
      {% endfor %}

    </div>

  </div>
</section>
