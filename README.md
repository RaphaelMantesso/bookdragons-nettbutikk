# 📚 BookDragons - Bruktbokhandel

En nettbutikk for brukte bøker bygget med Payload CMS og Next.js.

## 🚀 Kom i gang

### Forutsetninger

- Node.js 18+
- npm eller yarn

### Installasjon

```bash
# Klon repositoryet
git clone https://github.com/RaphaelMantesso/bookdragons-nettbutikk.git
cd bookdragons-nettbutikk

# Installer avhengigheter
npm install

# Start utviklingsserver
npm run dev
```

Åpne [http://localhost:3000](http://localhost:3000) i nettleseren.

### Admin-panel

Gå til [http://localhost:3000/admin](http://localhost:3000/admin) for å administrere innhold.

Ved første besøk må du opprette en admin-bruker.

## 📦 Teknologier

| Teknologi | Beskrivelse |
|-----------|-------------|
| [Payload CMS](https://payloadcms.com/) | Headless CMS for innholdshåndtering |
| [Next.js 15](https://nextjs.org/) | React-rammeverk med App Router |
| [React 19](https://react.dev/) | Frontend-bibliotek |
| [TypeScript](https://www.typescriptlang.org/) | Type-sikker JavaScript |
| [SQLite](https://www.sqlite.org/) | Lokal database |

## 🗂️ Prosjektstruktur

```
src/
├── app/
│   ├── (frontend)/      # Kundevendte sider
│   │   ├── page.tsx         # Forside med alle bøker
│   │   ├── books/[id]/      # Bokdetaljer
│   │   ├── authors/         # Forfatterliste og detaljer
│   │   ├── genres/          # Sjangerliste og detaljer
│   │   ├── cart/            # Handlekurv
│   │   └── checkout/        # Bestillingsskjema
│   └── (payload)/       # Admin-panel (Payload CMS)
├── collections/         # Payload innholdssamlinger
│   ├── Authors.ts
│   ├── Books.ts
│   ├── Genres.ts
│   ├── Orders.ts
│   └── Media.ts
├── components/          # Gjenbrukbare React-komponenter
│   ├── BookCard.tsx
│   ├── Button.tsx
│   └── Dashboard.tsx
└── payload.config.ts    # Payload konfigurasjon
```

## 📋 Funksjonalitet

### For kunder
- ✅ Se alle bøker til salgs
- ✅ Se detaljer om en bok
- ✅ Filtrere bøker etter forfatter
- ✅ Filtrere bøker etter sjanger
- ✅ Legge bøker i handlekurv
- ✅ Sende bestilling

### For ansatte (admin)
- ✅ Legge til, redigere og slette bøker
- ✅ Legge til, redigere og slette forfattere
- ✅ Legge til, redigere og slette sjangere
- ✅ Se alle bestillinger
- ✅ Oppdatere status på bestillinger
- ✅ Dashboard med statistikk

## 🎨 Tilgjengelighet (UU)

- Skip-link for tastaturnavigasjon
- ARIA-labels på interaktive elementer
- Semantisk HTML (`<header>`, `<main>`, `<nav>`, `<footer>`)
- Focus-states for tastaturbrukere
- Responsivt design

## 🧪 Scripts

```bash
npm run dev      # Start utviklingsserver
npm run build    # Bygg for produksjon
npm run start    # Start produksjonsserver
npm run seed     # Legg til testdata
```

## 📝 Testdata

For å legge til eksempeldata (bøker, forfattere, sjangere):

```bash
npx tsx src/seed.ts
```

## 👤 Forfatter

Raphael Mantesso - Gokstad Akademiet

## 📄 Lisens

ISC
