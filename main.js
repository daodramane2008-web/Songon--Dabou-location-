/* ===========================================================
   ABRI DIRECT — logique partagée
   =========================================================== */

/** Formate un prix en francs CFA, ex : 60000 -> "60 000 FCFA" */
function formatPrix(prix) {
  return prix.toLocaleString("fr-FR") + " FCFA";
}

/** Icône maison utilisée comme visuel de remplacement tant qu'il n'y a pas de vraie photo. */
const ICONE_MAISON = `
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 30L32 10L56 30" stroke="#1B2A38" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 26V52H50V26" stroke="#1B2A38" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="27" y="36" width="10" height="16" stroke="#1B2A38" stroke-width="3" stroke-linejoin="round"/>
  </svg>`;

/** Construit le HTML d'une carte annonce pour la grille. */
function carteAnnonceHTML(a) {
  return `
    <a class="card" href="annonce.html?id=${a.id}">
      <div class="card-thumb">
        ${a.boost ? '<span class="badge-boost">En avant</span>' : ""}
        <span class="price-flag">${formatPrix(a.prix)}</span>
        ${ICONE_MAISON}
      </div>
      <div class="card-body">
        <div class="card-quartier">${a.quartier}</div>
        <h3 class="card-title">${a.titre}</h3>
        <div class="card-meta">${a.type} · ${a.pieces} pièce${a.pieces > 1 ? "s" : ""}</div>
      </div>
    </a>`;
}

/** Affiche une liste d'annonces dans un conteneur donné (ou un message si vide). */
function afficherAnnonces(liste, conteneurId, messageVideId) {
  const conteneur = document.getElementById(conteneurId);
  const messageVide = messageVideId ? document.getElementById(messageVideId) : null;

  if (!liste.length) {
    conteneur.innerHTML = "";
    if (messageVide) messageVide.style.display = "block";
    return;
  }

  if (messageVide) messageVide.style.display = "none";
  conteneur.innerHTML = liste.map(carteAnnonceHTML).join("");
}

/** Trie les annonces boostées en premier, puis par date décroissante (déjà fait dans getAnnonces). */
function trierParBoostPuisDate(liste) {
  return [...liste].sort((a, b) => (b.boost === a.boost ? 0 : b.boost ? 1 : -1));
}
