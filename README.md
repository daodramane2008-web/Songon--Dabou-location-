# Abri Direct

Site de location pour Songon Agban et la route de Dabou.

## Ce que contient ce dossier

```
abri-direct/
├── index.html       Page d'accueil (recherche + annonces récentes)
├── annonces.html     Liste complète des annonces, avec filtres
├── annonce.html      Détail d'une annonce (ouverte via ?id=...)
├── deposer.html       Formulaire de dépôt d'une annonce
├── css/style.css      Toute la mise en forme du site
└── js/
    ├── data.js         Les annonces (données d'exemple + fonctions d'accès)
    └── main.js         Fonctions partagées (cartes, filtres, formatage)
```

C'est un site **statique** : pas d'installation, pas de `npm install`, pas de build.
Vous pouvez l'ouvrir directement en double-cliquant sur `index.html`.

## Comment fonctionne les données pour l'instant

Les annonces sont stockées dans `js/data.js`. Quand quelqu'un dépose une
annonce via le formulaire, elle est sauvegardée dans le navigateur
(`localStorage`) — pratique pour tester, mais **chaque visiteur voit
seulement les annonces qu'il a lui-même ajoutées**, en plus des exemples.
Ce n'est pas encore une vraie base de données partagée.

## Mettre le site en ligne (GitHub + Vercel)

1. Créez un compte sur [github.com](https://github.com) si ce n'est pas déjà fait.
2. Créez un nouveau repository (par exemple `abri-direct`) et envoyez ce dossier dedans.
3. Créez un compte sur [vercel.com](https://vercel.com) avec votre compte GitHub.
4. Sur Vercel, cliquez sur "Add New Project", choisissez le repository `abri-direct`.
5. Comme c'est un site statique (pas de framework), laissez les réglages par défaut et cliquez sur "Deploy".
6. Votre site est en ligne à une adresse du type `abri-direct.vercel.app`.

Chaque fois que vous modifierez le code et l'enverrez sur GitHub (`git push`),
Vercel redéploiera automatiquement la nouvelle version.

## Prochaine étape : connecter une vraie base de données (Supabase)

Tant que les annonces sont dans `data.js`, elles ne sont pas partagées entre
visiteurs. Pour que toutes les annonces déposées soient visibles par tout le
monde, il faut les stocker dans Supabase :

1. Créez un compte sur [supabase.com](https://supabase.com) et un nouveau projet.
2. Dans l'éditeur SQL de Supabase, créez une table `annonces` avec les colonnes :
   `id, titre, quartier, type, prix, pieces, description, contact, boost, date_ajout`.
3. Dans `index.html` (et les autres pages), ajoutez avant vos scripts :
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
   ```
4. Dans `js/data.js`, remplacez le contenu de `getAnnonces()`, `getAnnonceParId()`
   et `ajouterAnnonce()` par de vraies requêtes Supabase, par exemple :
   ```js
   const supabase = window.supabase.createClient(
     "VOTRE_URL_SUPABASE",
     "VOTRE_CLE_PUBLIQUE"
   );

   async function getAnnonces() {
     const { data } = await supabase.from("annonces").select("*").order("date_ajout", { ascending: false });
     return data;
   }
   ```
   Comme les autres pages appellent déjà `getAnnonces()`, `getAnnonceParId()`
   et `ajouterAnnonce()`, il n'y a rien d'autre à changer une fois ces trois
   fonctions branchées sur Supabase.
5. Pour les photos, utilisez le "Storage" de Supabase : il vous donne une URL
   publique par photo, à stocker dans la colonne `photo_url` de votre table.

## Idées pour la suite

- Un espace "Mon compte" pour que chaque propriétaire modifie/supprime ses annonces.
- Un vrai système de paiement pour les annonces "boostées" (ex : CinetPay, Wave, Orange Money).
- Un nom de domaine personnalisé (ex : `abri-direct.ci`), connecté depuis les réglages Vercel.
