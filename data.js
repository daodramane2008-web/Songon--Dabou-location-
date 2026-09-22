/* ===========================================================
   ABRI DIRECT — données
   -----------------------------------------------------------
   Pour l'instant les annonces sont stockées ici, en dur, comme
   exemple. Quand vous connecterez Supabase, remplacez le
   contenu de la fonction getAnnonces() par une vraie requête,
   par exemple :

     async function getAnnonces() {
       const { data, error } = await supabase.from('annonces').select('*');
       return data;
     }

   Le reste du site (filtres, cartes, page détail) n'a pas besoin
   de changer : il consomme juste le tableau retourné.
   =========================================================== */

const ANNONCES_EXEMPLE = [
  {
    id: "1",
    titre: "Studio meublé proche du marché",
    quartier: "Songon Agban",
    type: "Studio",
    pieces: 1,
    prix: 35000,
    description:
      "Studio calme au rez-de-chaussée, à 5 minutes à pied du marché de Songon Agban. Cuisine équipée, eau et électricité en bon état, cour commune sécurisée.",
    contact: "2250700000001",
    boost: true,
    dateAjout: "2026-09-10",
  },
  {
    id: "2",
    titre: "Appartement 2 pièces avec balcon",
    quartier: "Songon Agban",
    type: "Appartement",
    pieces: 2,
    prix: 60000,
    description:
      "Appartement lumineux au 1er étage, salon séparé, balcon donnant sur cour. Quartier calme, proche de la route principale.",
    contact: "2250700000002",
    boost: false,
    dateAjout: "2026-09-08",
  },
  {
    id: "3",
    titre: "Maison 3 pièces avec cour",
    quartier: "Route de Dabou",
    type: "Maison",
    pieces: 3,
    prix: 85000,
    description:
      "Maison de plain-pied avec grande cour privative, idéale pour une famille. Accès facile depuis la route de Dabou, quartier résidentiel.",
    contact: "2250700000003",
    boost: true,
    dateAjout: "2026-09-15",
  },
  {
    id: "4",
    titre: "Chambre indépendante",
    quartier: "Route de Dabou",
    type: "Chambre",
    pieces: 1,
    prix: 25000,
    description:
      "Chambre indépendante avec douche, dans une cour partagée avec 3 autres locataires. Bon pour étudiant, ambiance calme.",
    contact: "2250700000004",
    boost: false,
    dateAjout: "2026-09-05",
  },
  {
    id: "5",
    titre: "Appartement 3 pièces climatisé",
    quartier: "Songon Agban",
    type: "Appartement",
    pieces: 3,
    prix: 95000,
    description:
      "Bel appartement climatisé au 2e étage, cuisine américaine, salle de bain moderne. Immeuble sécurisé avec gardien.",
    contact: "2250700000005",
    boost: false,
    dateAjout: "2026-09-12",
  },
  {
    id: "6",
    titre: "Studio neuf tout équipé",
    quartier: "Route de Dabou",
    type: "Studio",
    pieces: 1,
    prix: 40000,
    description:
      "Studio récemment construit, jamais habité. Carrelage neuf, point d'eau intérieur, proche des transports vers Abidjan.",
    contact: "2250700000006",
    boost: false,
    dateAjout: "2026-09-17",
  },
];

const STORAGE_KEY = "abri_direct_annonces_locales";

/**
 * Retourne la liste complète des annonces : les exemples ci-dessus
 * + celles déposées via le formulaire (stockées localement dans le
 * navigateur en attendant la connexion à une vraie base de données).
 */
function getAnnonces() {
  const locales = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  return [...locales, ...ANNONCES_EXEMPLE].sort(
    (a, b) => new Date(b.dateAjout) - new Date(a.dateAjout)
  );
}

/** Retourne une annonce précise à partir de son id. */
function getAnnonceParId(id) {
  return getAnnonces().find((a) => a.id === id);
}

/** Ajoute une nouvelle annonce (déposée via le formulaire). */
function ajouterAnnonce(annonce) {
  const locales = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  annonce.id = "local-" + Date.now();
  annonce.dateAjout = new Date().toISOString().slice(0, 10);
  locales.unshift(annonce);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(locales));
  return annonce;
}
