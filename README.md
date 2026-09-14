# SMA-RTY France — site (maquette de refonte)

Générateur statique. Aucune dépendance : `node src/build.js` écrit `fr/index.html`,
`en/index.html` et la redirection à la racine. Les liens sont relatifs, le site
fonctionne donc aussi bien à la racine d'un domaine que dans un sous-répertoire.

```
src/build.js      générateur (structure des pages)
src/content.js    tout le texte, les données, les coordonnées — c'est ici qu'on édite
src/logo.js       tracé vectoriel du logo (charte)
src/shoot.js      captures d'écran automatisées (Playwright, facultatif)
assets/css        feuille de style unique
assets/js/main.js comportements du site
assets/js/da.js   atelier de design en direct — À RETIRER AVANT MISE EN LIGNE
assets/media      images
```

---

## 1. Police Europa (Adobe Fonts)

Le kit est déjà branché : `site.typekit = 'wst3qpr'` dans `src/content.js`, ce qui
émet `<link rel="stylesheet" href="https://use.typekit.net/wst3qpr.css">`.

**Adobe Fonts n'autorise le kit que sur les domaines déclarés dans le Web Project.**
Tant que le domaine n'est pas listé, la police ne se charge pas et la pile de secours
s'applique (Avenir Next / système). À faire une fois :

1. fonts.adobe.com → **My Adobe Fonts → Web Projects** → ouvrir le projet contenant Europa.
2. Champ **Domains** : ajouter, séparés par des virgules —
   - `localhost` et `127.0.0.1` (aperçu local)
   - `<votre-compte>.github.io` (GitHub Pages)
   - `sma-rty.fr` et `www.sma-rty.fr` (domaine final)
3. Vérifier que les graisses **300, 400 et 700** sont cochées, en romain et en italique.
4. **Save / Publish**. La propagation prend quelques minutes.

Aperçu local : ouvrir le dossier avec un petit serveur plutôt qu'en `file://`,
sans quoi Adobe Fonts refuse l'origine.

```bash
node src/build.js
npx serve .            # puis http://localhost:3000/fr/
```

---

## 2. Déploiement GitHub Pages

Le workflow `.github/workflows/pages.yml` régénère les pages et publie à chaque
`push` sur `main`. Côté GitHub : **Settings → Pages → Source : GitHub Actions**.

### Points à connaître avant de pousser

- **Dépôt privé.** GitHub Pages sur dépôt privé demande un plan Pro, Team ou
  Enterprise. En plan gratuit, publier depuis un dépôt privé n'est pas possible :
  soit le dépôt est public, soit il faut passer par Cloudflare Pages ou Netlify,
  gratuits et compatibles avec un dépôt privé.
- **Une page publiée est publique**, même depuis un dépôt privé, et sans
  authentification possible sur GitHub Pages. Tant que la hiérarchie n'a pas
  validé le contenu défense, préférer un hébergement avec mot de passe
  (Cloudflare Access, Netlify password protection) ou garder l'aperçu local.
- Le bandeau `noindex, nofollow` est déjà dans chaque page : à retirer seulement
  au lancement réel.
- `.nojekyll` est présent : GitHub ne doit pas traiter le dossier comme un site Jekyll.
- **Domaine personnalisé :** Settings → Pages → Custom domain → `sma-rty.fr`,
  puis créer un enregistrement CNAME chez le registrar. Penser à rajouter ce
  domaine dans le Web Project Adobe Fonts (point 1).

### Avant la mise en ligne

1. Retirer l'atelier de design : supprimer la ligne `da.js` dans `src/build.js`.
2. Retirer le bandeau prototype (`UI.proto` dans `src/content.js`) et le `noindex`.
3. Renseigner le téléphone (`site.tel`) et déposer les portraits dans
   `assets/media/team/` (`fb.jpg`, `ka.jpg`, `em.jpg`, `yg.jpg`).
4. Remplacer les images de prévisualisation par les vraies prises de vue, et les
   épisodes de laboratoire par les vraies vidéos.
5. Vérification export / double usage du contenu défense.

---

## 3. Atelier de design en direct

Sur n'importe quelle page : touche **D**, ou `?da=1`, ou la pastille en bas à droite.

Quatre onglets — **Typo** (quatre niveaux de taille, interlignage, approche),
**Couleurs** (surfaces, textes, accents, opacité des filets, les cinq points du
dégradé spectral), **Composition** (largeur de grille, marges, respiration, gouttières,
côté et proportion de l'image du hero, alignements, arrondis, épaisseur des filets),
**Sections** (ordre et visibilité, appliqués à la volée).

**Exporter le CSS** rend le bloc `:root` à coller dans `assets/css/style.css`, ainsi
que l'ordre des sections à reporter dans `src/build.js`. Les réglages sont mémorisés
dans le navigateur : « Tout réinitialiser » revient à la version de référence.

---

## 4. Images à déposer

Deux dossiers attendent des fichiers. Tant qu'ils sont vides, le site affiche des
réserves propres (initiales pour l'équipe, gabarit pour les instruments) : rien ne casse.

### Instruments — `assets/media/instruments/`

Visuels détourés, fond transparent ou noir, 1200 px de large minimum :

| Fichier attendu | Source à télécharger sur sma-rty.com |
|---|---|
| `kalix.webp` | `https://sma-rty.com/KALIX - no text .webp` |
| `fonix.webp` | à fournir (pas trouvé en ligne) |
| `metacamera.webp` | à fournir (pas trouvé en ligne) |
| `basen.webp` | `https://sma-rty.com/1 copy.webp` (module BASEN) |

Autre visuel utile, si vous préférez une photo de caméra générique :
`https://sma-rty.com/camera.webp`.

Ouvrir l'URL dans le navigateur, clic droit → *Enregistrer l'image sous…*, renommer
selon la première colonne.

### Équipe — `assets/media/team/`

`fb.jpg`, `ka.jpg`, `em.jpg`, `yg.jpg` — portraits au format 4/5, 800 px de large
minimum. Le cadrage est en `object-fit: cover`, donc un portrait vertical classique
convient ; le visage doit être dans le tiers supérieur.

---

## 5. Retoucher le design après déploiement

L'atelier reste disponible sur le site en ligne : la pastille « Design · D » ne
s'affiche qu'en local ou avec `?da=1` dans l'URL, mais **la touche D fonctionne
partout**. Un visiteur ne voit donc rien ; vous, vous ouvrez le panneau à la demande.

Boucle de travail conseillée :

1. Ouvrir la page déployée, appuyer sur **D**, régler jusqu'à satisfaction.
2. **Exporter le CSS**, coller le bloc `:root` à la fin de `assets/css/style.css`.
3. Commit, push — GitHub Actions republie tout seul.

Pour éditer le code sans rien installer : sur la page du dépôt, appuyer sur la touche
**`.`** (point) ouvre **github.dev**, un VS Code complet dans le navigateur, avec
commit direct. Suffisant pour ajuster le CSS et le contenu de `src/content.js`.
Aucun aperçu en direct dans github.dev : c'est l'atelier qui joue ce rôle.
