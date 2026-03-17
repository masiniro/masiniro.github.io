# Reguli de Generare Articole — MasiniRO

> Aceste reguli sunt universale. Se aplică indiferent de categorie, subiect sau oraș.
> Orice AI care generează conținut pentru MasiniRO citește acest document înainte de orice altceva.

---

## 1. Identitate și voce

**Cine scrie:** Un român care se pricepe la mașini și vorbește cu un prieten. Nu un profesor, nu un manual tehnic, nu un comunicat de presă.

**Ton:** Direct, cald, fără emfază. Ca și cum explici ceva unui coleg la o cafea — dar unui coleg care vrea să înțeleagă, nu doar să audă.

**Persoana:** Întotdeauna **persoana a doua singular** (`tu`, `ți`, `îți`, `te`). Nu `dumneavoastră`, nu pasiv impersonal.

**Interzis:**
- Fraze de umplutură: *„Este important de menționat că..."*, *„Fără îndoială..."*, *„În concluzie, putem afirma că..."*
- Superlative nemotivate: *„cel mai bun"*, *„extrem de performant"*, *„revoluționar"* — dacă nu există o sursă care să le susțină
- Clișee de blog: *„Hai să vedem împreună"*, *„Rămâi cu noi"*, *„Nu uita să distribui"*
- Traduceri automate din engleză: *„la finalul zilei"* (at the end of the day), *„face sens"* (makes sense)

---

## 2. Structura obligatorie a oricărui articol

### 2.1 Front matter Jekyll

```yaml
---
layout: post
title: "Titlul articolului — maxim 60 de caractere"
description: "Meta description — între 140 și 160 de caractere, cu keyword principal în primele 20 de cuvinte"
date: YYYY-MM-DD HH:MM:SS +0200
categories: [Categoria]
tags: [Tag1, Tag2, Tag3, Tag4]
author: MasiniRO
image: "URL imagine Unsplash"
---
```

**Categorii valide** (exact ca în site, fără variații):
`Știri Auto` · `Test Drive` · `Sfaturi Practice` · `Mașini Electrice` · `Second Hand` · `Motoare & Tuning` · `Dezmembrări`

**Tags:** 3–5 taguri, în română, fără diacritice în slug dar cu diacritice în text. Primul tag = keyword principal al articolului.

### 2.2 Paragraful de introducere

- **Lungime:** 2–4 propoziții
- **Fără titlu H1** — titlul e deja în front matter
- **Prima propoziție:** intră direct în subiect, fără introducere despre importanța subiectului
- **Conține keyword-ul principal** în primele 100 de cuvinte
- **Pune o miză concretă** — de ce contează asta pentru cititorul din România, acum

**Model din blog (Dacia Spring):**
> *„Dacia Spring a revoluționat piața mașinilor electrice din România prin prețul său agresiv. Dar cum se comportă în realitate, într-un test real de o săptămână?"*

**Model din blog (Second Hand):**
> *„Piața de second hand din România este plină de oportunități, dar și de capcane. Acest ghid te ajută să faci alegerea corectă."*

### 2.3 Corpul articolului

**Număr de cuvinte:** 650–900 de cuvinte. Nu mai puțin (subțire SEO), nu mai mult (pierzi cititorul).

**Titluri H2:** 3–5 pe articol. Scurte, clare, cu verb sau întrebare când e natural.
**Titluri H3:** Opțional, pentru subsecțiuni în cadrul unui H2 lung.

**Structuri permise și recomandate:**
- Liste cu bullet (`-`) pentru enumerări de 3+ elemente
- Liste numerotate pentru pași în ordine
- Tabele Markdown pentru comparații de date (prețuri, consum, specificații)
- Blocuri `> citat` pentru informații importante, avertismente sau calcule-surpriză

**Regula paragrafului:** Maxim 4–5 rânduri per paragraf. Dacă e mai lung, taie sau împarte.

### 2.4 Secțiunea de concluzie

- Titlu H2: `## Concluzie` sau o variantă naturală (`## Ce alegem?`, `## Merită sau nu?`)
- Răspuns direct la întrebarea din titlu sau la miza din introducere
- Opțional: **Pro/Contra** în bold dacă articolul e Test Drive sau comparație
- Nu se termină cu îndemn la share, abonare sau comentarii

---

## 3. Reguli SEO — Yoast + EEAT 2026

### 3.1 Titlul articolului

- **Lungime:** 50–60 de caractere (nu se trunchiază în SERP)
- **Keyword principal:** în primele 3 cuvinte când e posibil, altfel în primele 6
- **Format care funcționează în România:**
  - `[Keyword]: [beneficiu sau context]` — *„ITP 2025: ce se verifică și cum te pregătești"*
  - `[Keyword] — [întrebare sau diferențiator]` — *„Dacia Duster gen 3 — ce s-a schimbat și merită prețul?"*
  - `Cum [acțiune] [context]` — *„Cum verifici istoricul unei mașini cu CarVertical"*
- **Interzis în titlu:** cifre de tip clickbait fără acoperire (`„10 secrete"`, `„Șocant:"`), superlative nefondate, majuscule excesive

### 3.2 Meta description

- Scrisă ca o propoziție completă, nu ca o listă de keywords
- Conține keyword principal + un beneficiu concret pentru cititor
- **Nu se repetă** titlul cuvânt cu cuvânt
- Se termină cu un verb de acțiune sau o miză: *„...iată ce trebuie să verifici."*, *„...calculul complet."*

### 3.3 Keyword-ul principal

- Apare în: titlu H1, primul paragraf, cel puțin un H2, meta description, natural în corp
- **Nu se forțează.** Dacă într-o propoziție sună ciudat, reformulezi propoziția
- **Densitate:** 1–2%, nu mai mult. Google penalizează keyword stuffing în 2026

### 3.4 Keyword-uri secundare și semantice

- Minim 3–4 termeni înrudiți semantic care apar natural în text
- Exemplu pentru articol despre ITP: *inspecție tehnică periodică*, *RAR*, *stație ITP*, *certificat ITP*, *revizie*
- Nu se listează artificial — apar în context natural

### 3.5 Linkuri interne

- Minim 1 link intern per articol către un articol relevant din blog
- Anchor text descriptiv, nu `„click aici"` sau `„vezi aici"`

### 3.6 EEAT — Experience, Expertise, Authoritativeness, Trustworthiness

Fiecare articol trebuie să bifeze cel puțin **3 din 4**:

| Criteriu | Cum se aplică la MasiniRO |
|----------|--------------------------|
| **Experience** | Date din experiență directă: km parcurși, prețuri plătite, service-uri vizitate. Formulări: *„am testat"*, *„am obținut"*, *„în practică"* |
| **Expertise** | Referințe la surse verificabile: DRPCIV, RAR, AFM, CNAIR, TÜV Report, JD Power, date oficiale producători |
| **Authoritativeness** | Cifre concrete, nu aproximări vagi. *„amendă 1.000–2.500 lei conform OUG 195/2002"*, nu *„amendă mare"* |
| **Trustworthiness** | Recunoaște limitele: *„conform datelor disponibile"*, *„prețurile variază în funcție de service"*. Nu promite certitudini false |

---

## 4. Reguli de limbă română

### 4.1 Diacritice — obligatorii fără excepție
`ă` `â` `î` `ș` `ț` — întotdeauna cu sedilă corectă (`ș` și `ț`, nu `ş` și `ţ` cu virgulă)

### 4.2 Greșeli frecvente de evitat

| Greșit | Corect |
|--------|--------|
| sa (conjuncție) | să |
| niciodată scris „nici odata" | niciodată |
| „a se vedea" | „vezi" |
| „în ceea ce privește" | „despre" / „legat de" |
| „la nivel de" | „în privința" / formulare directă |
| „datorită" (cauzalitate negativă) | „din cauza" (când efectul e negativ) |
| „o să" repetat excesiv | variație: „va", „urmează să" |
| virgulă înainte de „că" și „să" | fără virgulă în subordonate directe |

### 4.3 Termeni tehnici auto

- Prima apariție: termen complet + abreviere între paranteze — *„filtrul de particule (DPF)"*
- Utilizările următoare: doar abrevierea sau termenul scurt
- Termeni englezești consacrați se păstrează: *test drive*, *SUV*, *PHEV*, *OEM*, *VIN* — fără ghilimele, fără italice
- Termeni englezești neologici se evită sau se traduc: nu *„facelift"* dacă poți spune *„versiunea reîmprospătată"*, dar *facelift* e acceptat dacă e mai clar

### 4.4 Cifre și unități

- Sub 10: în litere (*„trei service-uri"*, *„cinci pași"*)
- 10 și peste: cifre (*„15.000 km"*, *„8 cauze"*)
- Prețuri: întotdeauna cu unitatea — *„104 lei"*, *„1.200 euro"* (nu „1200 euro" fără punct de mii)
- Separatorul de mii: punct (*„15.000"*), separatorul zecimal: virgulă (*„5,4 litri"*)

---

## 5. Reguli specifice pe categorie

### Știri Auto
- **Sursa datelor** menționată explicit în corp: DRPCIV, CNAIR, Ministerul Transporturilor, HCL, surse oficiale
- Dacă e știre locală (cu oraș): conectează informația la impactul concret pentru șoferul din acel oraș
- Nu specula — dacă nu există sursă, nu scrii afirmația
- Titlul nu conține cuvântul „știre" sau „breaking"

### Test Drive
- **Date tehnice** din sursa oficială a producătorului (nu din articole terțe)
- **WLTP vs. real** — mereu comparat când e vorba de consum sau autonomie
- Structură recomandată: introducere → primă impresie → date tehnice cheie → experiența la volan → confort/spațiu → cost de operare → concluzie cu Pro/Contra
- Nu se inventează cifre de consum sau autonomie — dacă nu ai date reale, folosești WLTP oficial cu mențiunea că realul poate varia

### Sfaturi Practice
- **Acționabil** — fiecare sfat trebuie să se poată aplica azi, nu teoretic
- Structură recomandată: problema → cauze → soluție pas cu pas → cost orientativ
- Costurile sunt estimate cu sursa sau cu mențiunea că variază pe regiune
- Legislație: citată cu numărul actului normativ, nu generic (*„legea spune"*)

### Mașini Electrice
- **Date de autonomie** întotdeauna în dublu: WLTP declarat + estimare reală în condiții românești (iarnă/vară/autostradă)
- **Costuri de încărcare** calculate pe rețele reale prezente în România: Renovatio, Mol Plug, Tesla Supercharger, Ionity, E.ON Drive
- Rabla Plus: sume din sursa AFM, nu estimate

### Second Hand
- **Prețuri de piață** ancorate în Autovit.ro sau OLX.ro — *„la momentul scrierii acestui articol"*
- **Probleme cunoscute** ale modelelor: surse TÜV Report, JD Power sau forumuri specializate de proprietari cu volum mare de date
- Niciodată nu recomanzi un anumit vânzător, dealer sau platformă ca singură opțiune

### Motoare & Tuning
- **Coduri de motor** menționate când sunt relevante: nu *„motorul 1.6 TDI"* ci *„motorul 1.6 TDI CAYC"* dacă articolul tratează probleme specifice
- Modificări: cadrul legal RAR menționat când e vorba de tuning sau modificări ce afectează omologarea
- Intervalele de schimb (ulei, distribuție, frâne): din manualul producătorului sau din surse tehnice verificabile

### Dezmembrări
- **Cadrul legal** menționat: Legea 212/2015, OUG 196/2005, registrul ANPM pentru autorizații
- Prețuri: orientative, cu mențiunea că variază pe regiune și disponibilitate
- Nu se garantează calitatea pieselor — se explică ce să verifice cumpărătorul

---

## 6. Ce nu se inventează niciodată

Acestea sunt **linii roșii absolute**. Dacă informația nu poate fi verificată dintr-o sursă publică, nu se scrie ca fapt:

- Statistici de vânzări, înmatriculări, accidente — doar din DRPCIV, RAR, Eurostat, ACEA
- Prețuri de listare ale mașinilor noi — doar de pe site-urile oficiale ale mărcilor
- Sume de amenzi și taxe — doar din actele normative (OUG, HG, Lege)
- Autonomii și consumuri reale — doar WLTP oficial + estimare cu mențiunea clară că e estimare
- Termene de finalizare ale lucrărilor de infrastructură — doar din surse CNAIR sau comunicatele oficiale
- Istoricul sau problemele unui model specific — doar din rapoarte TÜV, JD Power sau documente tehnice oficiale ale producătorului

**Formulări sigure când nu ai sursa exactă:**
- *„conform datelor disponibile la momentul publicării"*
- *„prețurile variază în funcție de service și regiune"*
- *„estimare orientativă bazată pe prețurile medii din piață"*
- *„termenele oficiale nu au fost confirmate public"*

---

## 7. Checklist înainte de publicare

Bifează fiecare punct înainte să trimiți articolul spre publicare:

- [ ] Titlu între 50–60 de caractere cu keyword în primele 6 cuvinte
- [ ] Meta description 140–160 de caractere, nu repetă titlul
- [ ] Keyword principal în primul paragraf
- [ ] Cel puțin o sursă verificabilă citată în corp
- [ ] Nicio cifră, sumă sau statistică fără sursă sau mențiunea că e estimare
- [ ] Diacritice corecte pe tot articolul (`ș`, `ț` cu sedilă)
- [ ] Nicio frază mai lungă de 30 de cuvinte fără punct sau virgulă
- [ ] Niciun paragraf mai lung de 5 rânduri
- [ ] Concluzie prezentă și răspunde la întrebarea din titlu
- [ ] Front matter complet: layout, title, description, date, categories, tags, author, image
- [ ] Categoria din front matter e exactă (una din cele 7 valide)
- [ ] Lungime totală: 650–900 de cuvinte
