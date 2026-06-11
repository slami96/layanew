// ═══════════════════════════════════════════════════════════
//  LAYA HOME — data.js  (plain script, exposes window.LAYA)
//  SINGLE SOURCE OF TRUTH for all project data.
// ═══════════════════════════════════════════════════════════
window.LAYA = (function () {

const CATEGORIES = {
  architektura: 'Architektura',
  interier:     'Interiérový design',
  rekonstrukce: 'Rekonstrukce',
  exterier:     'Exteriér',
  komercni:     'Komerční design',
};

const PROJECTS = [
  {
    id: 1, slug: 'hasicska-zbrojnice', title: 'Hasičská Zbrojnice',
    category: 'architektura', categoryLabel: 'Architektura',
    image: 'nahled_1.jpg', featured: true,
    alt: 'Přestavěná historická hasičská zbrojnice — exteriér',
    desc: 'Přestavba historické hasičské zbrojnice na moderní multifunkční prostor se zachováním původního charakteru budovy.',
  },
  {
    id: 2, slug: 'rekonstrukce-rd-brno', title: 'Rekonstrukce RD Brno',
    category: 'rekonstrukce', categoryLabel: 'Rekonstrukce',
    image: 'nahled_2.jpg',
    alt: 'Rekonstruovaný rodinný dům v Brně — otevřený obytný prostor',
    desc: 'Kompletní rekonstrukce rodinného domu v Brně s důrazem na otevřený půdorys a přirozené světlo.',
  },
  {
    id: 3, slug: 'interier-bytu', title: 'Interiér Bytu',
    category: 'interier', categoryLabel: 'Interiérový design',
    image: 'nahled_3.jpg', featured: true,
    alt: 'Interiér městského bytu s přírodními materiály',
    desc: 'Návrh interiéru bytu v centru města kombinující moderní estetiku s teplými přírodními materiály.',
  },
  {
    id: 4, slug: 'kancelarske-prostory', title: 'Kancelářské Prostory',
    category: 'komercni', categoryLabel: 'Komerční design',
    image: 'nahled_4.jpg',
    alt: 'Kancelářský prostor podporující spolupráci',
    desc: 'Kancelářský prostor navržený tak, aby podporoval kreativitu a spolupráci v inspirativním prostředí.',
  },
  {
    id: 5, slug: 'moderni-vila', title: 'Moderní Vila',
    category: 'architektura', categoryLabel: 'Architektura',
    image: 'nahled_5.jpg',
    alt: 'Novostavba moderní vily s výhledem do krajiny',
    desc: 'Novostavba vily s panoramatickým výhledem do krajiny, navržená v souladu s okolní přírodou.',
  },
  {
    id: 6, slug: 'kuchynsky-design', title: 'Kuchyňský Design',
    category: 'interier', categoryLabel: 'Interiérový design',
    image: 'nahled_6.jpg',
    alt: 'Kuchyně s elegantními detaily a světelným designem',
    desc: 'Kuchyně jako srdce domova — funkční řešení s elegantními detaily a propracovaným světelným designem.',
  },
  {
    id: 7, slug: 'podkrovni-byt', title: 'Podkrovní Byt',
    category: 'interier', categoryLabel: 'Interiérový design',
    image: 'nahled_7.jpg',
    alt: 'Podkrovní byt s přiznanou konstrukcí krovu',
    desc: 'Proměna podkrovního prostoru v útulné bydlení s unikátní atmosférou a maximálním využitím výšky stropu.',
  },
  {
    id: 8, slug: 'rodinny-dum', title: 'Rodinný Dům',
    category: 'architektura', categoryLabel: 'Architektura',
    image: 'nahled_8.jpg',
    alt: 'Rodinný dům pro čtyřčlennou rodinu',
    desc: 'Rodinný dům navržený pro čtyřčlennou rodinu, kde každý prostor přirozeně navazuje na způsob života jeho obyvatel.',
  },
  {
    id: 9, slug: 'minimalisticka-kuchyne', title: 'Minimalistická Kuchyně',
    category: 'interier', categoryLabel: 'Design kuchyně',
    image: 'nahled_9.jpg', featured: true,
    alt: 'Minimalistická kuchyně s čistými liniemi',
    desc: 'Čistá linie, žádný zbytečný detail — kuchyně v minimalistickém duchu s nadčasovou estetikou.',
  },
  {
    id: 10, slug: 'obyvaci-pokoj', title: 'Obývací Pokoj',
    category: 'interier', categoryLabel: 'Interiérový design',
    image: 'nahled_10.jpg', featured: true,
    alt: 'Obývací pokoj s kvalitním nábytkem a doplňky',
    desc: 'Obývací prostor propojující soukromí s otevřeností, doplněný výběrem kvalitního nábytku a autentických doplňků.',
  },
  {
    id: 11, slug: 'koupelna', title: 'Koupelna',
    category: 'interier', categoryLabel: 'Interiérový design',
    image: 'nahled_11.jpg',
    alt: 'Koupelna s přírodním kamenem a dřevem',
    desc: 'Koupelna jako osobní wellness prostor s přírodním kamenem, teplým dřevem a promyšleným osvětlením.',
  },
  {
    id: 12, slug: 'terasa-a-zahrada', title: 'Terasa a Zahrada',
    category: 'exterier', categoryLabel: 'Exteriér',
    image: 'nahled_12.jpg',
    alt: 'Terasa a zahrada navazující na interiér domu',
    desc: 'Venkovní prostor navazující na interiér domu, vytvářející přirozený přechod mezi domovem a přírodou.',
  },
  {
    id: 13, slug: 'loznice', title: 'Ložnice',
    category: 'interier', categoryLabel: 'Interiérový design',
    image: 'nahled_13.jpg',
    alt: 'Klidná ložnice z přírodních materiálů',
    desc: 'Ložnice navržená pro maximální klid a pohodu, s důrazem na kvalitu spánku a přirozené materiály.',
  },
  {
    id: 14, slug: 'rekonstrukce-bytu', title: 'Rekonstrukce Bytu',
    category: 'rekonstrukce', categoryLabel: 'Rekonstrukce',
    image: 'nahled_14.jpg',
    alt: 'Rekonstruovaný starší byt proměněný v moderní domov',
    desc: 'Celková proměna staršího bytu v moderní domov bez ztráty původního kouzla a prostorového potenciálu.',
  },
  {
    id: 15, slug: 'pracovna', title: 'Pracovna',
    category: 'interier', categoryLabel: 'Interiérový design',
    image: 'nahled_15.jpg',
    alt: 'Domácí pracovna s inspirativním prostředím',
    desc: 'Domácí pracovna kde se snoubí efektivita práce s osobitou atmosférou a inspirativním prostředím.',
  },
  {
    id: 16, slug: 'vstupni-hala', title: 'Vstupní Hala',
    category: 'interier', categoryLabel: 'Interiérový design',
    image: 'nahled_16.jpg',
    alt: 'Elegantní vstupní hala domu',
    desc: 'První dojem je nezapomenutelný — vstupní hala jako elegantní vizitka celého domu i jeho obyvatel.',
  },
  {
    id: 17, slug: 'detsky-pokoj', title: 'Dětský Pokoj',
    category: 'interier', categoryLabel: 'Interiérový design',
    image: 'nahled_17.jpg', featured: true,
    alt: 'Hravý a bezpečný dětský pokoj',
    desc: 'Hravý a bezpečný prostor pro dětskou fantazii, navržený tak, aby rostl společně s dítětem.',
  },
  {
    id: 18, slug: 'jidelna', title: 'Jídelna',
    category: 'interier', categoryLabel: 'Interiérový design',
    image: 'nahled_18.jpg',
    alt: 'Jídelna jako místo setkávání rodiny',
    desc: 'Jídelna jako místo setkávání rodiny i přátel, kde každý společný večer je malou slavností.',
  },
  {
    id: 19, slug: 'venkovni-posezeni', title: 'Venkovní Posezení',
    category: 'exterier', categoryLabel: 'Exteriér',
    image: 'nahled_19.jpg',
    alt: 'Terasa s venkovním posezením',
    desc: 'Terasa s posezením přirozeně prodlužující obytný prostor domu do venkovního prostředí.',
  },
  {
    id: 20, slug: 'wellness', title: 'Wellness',
    category: 'interier', categoryLabel: 'Interiérový design',
    image: 'nahled_20.jpg',
    alt: 'Soukromé domácí wellness se saunou',
    desc: 'Soukromé wellness zázemí se saunou a relaxační zónou — útočiště od každodenního shonu přímo v domově.',
  },
  {
    id: 21, slug: 'rekonstrukce-domu', title: 'Rekonstrukce Domu',
    category: 'rekonstrukce', categoryLabel: 'Rekonstrukce',
    image: 'nahled_21.jpg', featured: true,
    alt: 'Citlivě rekonstruovaný starší dům',
    desc: 'Rozsáhlá rekonstrukce staršího domu s citlivým přístupem k původní architektuře a duchu místa.',
  },
];

// ── Derived helpers — never hardcode these numbers anywhere ──
const TOTAL = PROJECTS.length;

function countByCategory() {
  const counts = { all: PROJECTS.length };
  for (const p of PROJECTS) counts[p.category] = (counts[p.category] || 0) + 1;
  return counts;
}

function bySlug(slug) {
  return PROJECTS.find((p) => p.slug === slug) || null;
}

function featured() {
  return PROJECTS.filter((p) => p.featured);
}

function neighbours(slug) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length],
    next: PROJECTS[(i + 1) % PROJECTS.length],
  };
}

function detailUrl(p) {
  return `projekt.html?p=${encodeURIComponent(p.slug)}`;
}

return { CATEGORIES, PROJECTS, TOTAL, countByCategory, bySlug, featured, neighbours, detailUrl };
})();
