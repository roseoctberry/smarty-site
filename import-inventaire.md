# Inventaire d'import — source sma-rty.fr

Relevé le 16/09/2026. Étape 1 uniquement : **aucun fichier du site n'a été modifié.**
Branche de travail : `import-sma-rty`.

Méthode : pages ouvertes dans un navigateur réel et lues après rendu
(`document.body.innerText`, tableaux `<table>`, JSON-LD). Contre-vérification par
requête directe : le HTML servi contient déjà les tableaux de spécifications,
le rendu JavaScript n'ajoute pas de donnée technique.

Convention : ✅ conforme à votre relevé · ➕ complété par moi · ⚠️ écart ou contradiction.

---

## 1. Produits

### THR-LW Thermal — `/fr/products/thr-lw/` · `/en/products/thr-lw/`

| | FR | EN |
|---|---|---|
| Nom officiel | THR-LW Thermal | THR-LW Thermal |
| Sous-titre | Caméra Thermique Intelligente Haute Définition | High Definition Thermal Smart Camera |
| Statut affiché | ACTIF | Active |

| Grandeur (FR) | Valeur | Grandeur (EN) |
|---|---|---|
| TYPE CAPTEUR | 12 µm Microbolometer (Shutterless) | Sensor Type ✅ |
| RÉSOLUTION | 640 x 480 (VGA) | Resolution ✅ |
| SENSIBILITÉ | < 60 mK | Sensitivity ✅ |
| FRÉQUENCE | Jusqu'à 60 Hz | Frame Rate ✅ |
| INTERFACE | USB 3.1 Type-C / MIPI CSI-2 | Interface ✅ |
| TRAITEMENT | FPGA Temps-réel (NUC, BPC, AGC) | Processing ✅ |
| DIMENSIONS | 55 x 55 x 40 mm | Dimensions ✅ |
| ALIMENTATION | 12V DC / 2.5W | Power ✅ |
| TEMP. OP. | -10°C à +55°C | Op. Temp ✅ |

Visuel officiel (JSON-LD `image`) : `/images/perception/photos/tactical/LWIR/P1170655.png`
Autres visuels : `THR-LW-split3dlegend.png` (vue éclatée), `THR-LW_optics.jpeg`,
`photos/THR-LW_red/serie_THR-LW_detour.png` (flotte, détourage partiel : plan de travail visible à droite)

### FNX-SWIR — `/fr/products/fnx-swir/`

| | FR | EN |
|---|---|---|
| Nom officiel | FNX-SWIR | FNX-SWIR |
| Sous-titre | Vision Infrarouge à Ondes Courtes (SWIR) | Short-Wave Infrared (SWIR) Vision |
| Statut affiché | ⚠️ INTÉGRATION ANTICIPÉE | Early Integration |

| Grandeur (FR) | Valeur | Grandeur (EN) |
|---|---|---|
| CAPTEUR | InGaAs (Indium Gallium Arsenide) | Sensor ✅ |
| RÉSOLUTION | 640 x 512 (VGA) | Resolution ✅ |
| PITCH PIXEL | 15 µm | Pixel Pitch ✅ |
| SPECTRE | 0.9 µm - 1.7 µm | Spectrum ✅ |
| DYNAMIQUE | Modes High gain / Low gain | Dynamic Range ✅ |
| INTERFACE | MIPI CSI-2 / USB 3.0 | Interface ✅ |

Visuel officiel : `/images/perception/photos/fnx-swir/fnx-3.png`
➕ Le site précise : « Elle partage la même architecture que la gamme THR-LW, dans un format mécanique plus large. »

### ASB-1080 Mono — `/fr/products/asb/` ➕ (chiffres qui manquaient)

| | FR | EN |
|---|---|---|
| Nom officiel | ASB-1080 Mono | ASB-1080 Mono |
| Sous-titre | Vision Global Shutter Haute Vitesse | High-Speed Global Shutter Vision |
| Statut affiché | ACTIF | Active |

| Grandeur (FR) | Valeur | Grandeur (EN) |
|---|---|---|
| CAPTEUR | 1/2.9" Global Shutter CMOS | Sensor |
| RÉSOLUTION | 1920 x 1080 (FHD) | Resolution |
| FRÉQUENCE | 60 fps @ Pleine Res | Frame Rate — 60 fps @ Full Res |
| EFFICACITÉ SHUTTER | > 99.9% | Shutter Efficiency |
| MONTURE | C/CS | Mount — C/CS Mount |
| INTERFACE | DVP vers FPGA / USB 3.0 | Interface — DVP to FPGA / USB 3.0 |

Sensibilité spectrale annoncée : 400 nm – 1 µm (Visible / P-IR)
Visuel officiel : `/images/perception/photos/tactical/VISIBLE/P1170637.png`

### BNX Carrier — `/fr/products/bnx/` ➕

| | FR | EN |
|---|---|---|
| Nom officiel | BNX Carrier | BNX Carrier |
| Sous-titre | Carte Porteuse Industrielle pour NVIDIA Xavier NX | Industrial Carrier for NVIDIA Xavier NX |
| Statut affiché | ACTIF | Active |

| Grandeur (FR) | Valeur | Grandeur (EN) |
|---|---|---|
| COMPATIBILITÉ | Jetson Xavier NX / Orin NX | Compatibility ✅ |
| ENTRÉE CAMÉRA | ⚠️ 3x MIPI CSI-2 (via HDMI étanche) | Camera Input — 3x MIPI CSI-2 (over waterproofed HDMI) |
| RÉSEAU | 1x Gigabit Ethernet, étanche | Networking |
| STOCKAGE | 1x M.2 NVMe Key M | Storage |
| AFFICHAGE | 1x DisplayPort 4K@60 | Display |
| TENSION | 9V - 19V DC | Input Voltage |

➕ Faits complémentaires : refroidissement passif sans ventilateur ; connecteurs endurcis
(poussière, humidité) ; livrée avec le SOM NVIDIA Xavier NX.
Visuels : `/images/perception/photos/tactical/BNX/P1170679.png` (officiel),
`/images/IA/BNX/bnx_top_legend.png`, `/images/IA/BNX/bnx_quad_THR-LW.png`

---

## 2. Études de cas — `/fr/projects/…` ✅

| Champ | FR | EN |
|---|---|---|
| Intitulé | Suivi de Particules 3D (Flux d'Air) | 3D Airflow Particle Tracking |
| Année | 2023 | 2023 |
| Domaine | Partenaire Industriel | Industrial Partner |
| Description | Configuration utilisant les caméras ASB Global Shutter pour suivre des particules dans un espace 3D ; visualise et analyse les flux d'air en salles blanches et systèmes CVC, avec des données temps réel sur la qualité de l'air et l'efficacité de circulation. | (version EN relevée, disponible) |
| Chiffre | *aucun chiffre publié* | — |
| Étiquettes | Vision 3D · Industriel · Suivi de particules | 3D Vision · Industrial · Particle Tracking |

| Champ | FR | EN |
|---|---|---|
| Intitulé | Navigation de Drone sans GPS | GPS-Denied Drone Navigation |
| Année | 2024 | 2024 |
| Domaine | Défense & Robotique | Defense & Robotics |
| Description | Navigation visuelle « inside-out » pour drones en environnement privé de GPS ; carte au sol pré-apprise et traitement IA embarqué, opération autonome en tunnels et canyons urbains. | (version EN relevée, disponible) |
| Chiffre | **précision de localisation 20 cm** | 20 cm localization precision |
| Étiquettes | Robotique · SLAM · Edge AI | Robotics · SLAM · Edge AI |

---

## 3. Équipe — `/fr/team/` et `/en/team/`

| # | Nom | Titre (identique FR/EN) | Ligne de domaine FR | Ligne de domaine EN | LinkedIn |
|---|---|---|---|---|---|
| 01 | François Berry | Chief Executive Officer SMF | Direction scientifique et stratégie industrielle | Scientific leadership and industrial strategy | `/in/fran%C3%A7ois-berry-a4399a2/` |
| 02 | Kamel Abdelouahab | Edge AI Specialist | IA embarquée et pipelines de perception | Embedded AI and perception pipelines | `/in/kamelabdelouahab/` ➕ |
| 03 | Yorick Geoffre | Embedded Engineer | Intégration électronique et firmware embarqué | Electronic integration and embedded firmware | `/in/yorick-g-318b08221/` ✅ |
| 04 | Edoardo Malaspina | PhD in Multispectral Smart Cameras | Caméras intelligentes multispectrales | Multispectral smart cameras | `/in/edoardo-malaspina-75ba4b232/` ➕ |

⚠️ **L'ordre diffère** du dépôt local : en ligne c'est Berry, Abdelouahab, **Geoffre**, **Malaspina** ;
en local Berry, Abdelouahab, **Malaspina**, **Geoffre**.

Photos (déjà téléchargées le 15/09 dans `assets/media/team/`, à recadrer en 800×800) :
`francois-berry.jpg` (706×652 — ⚠️ **sous la cible 800**), `kamel-abdelouahab.jpg` (1000×1000),
`edoardo-malaspina.jpg` (1000×1000), `yorick-geoffre.webp` (1000×1000)

---

## 4. Contact et entité — `/fr/contact/` ✅

| Champ | Valeur |
|---|---|
| Raison sociale affichée | **SMA-RTY SAS** (jamais « SMA-RTY France SAS » ; « SMA-RTY France » sert de nom d'usage éditorial) |
| Adresse | Institut Pascal, 4 avenue Blaise Pascal, 63178 Aubière |
| E-mail général | info@sma-rty.com |
| E-mail support | support@sma-rty.com ➕ |
| Téléphone | **aucun, sur aucune page** ✅ |
| Formulaire | ouvre le client e-mail du visiteur, aucun envoi serveur |

---

## 5. Pages légales

| Page | URL | État |
|---|---|---|
| Politique de confidentialité | `/fr/legal/privacy/` · `/en/legal/privacy/` | ✅ **contenu complet, FR et EN**, 4 sections, « Dernière mise à jour : 21 mai 2026 » |
| Conditions de vente | `/fr/legal/terms/` · `/en/legal/terms/` | ⚠️ **HTTP 200 mais `<main>` vide (0 caractère)**, FR comme EN. Le lien existe en pied de page, la page n'a aucun contenu. |
| Mentions légales | — | ⚠️ **n'existe pas.** `/fr/legal/mentions/`, `/fr/legal/notice/`, `/fr/mentions-legales/` → 404 |

Sections de la page confidentialité : *Ce site ne crée pas de compte utilisateur* ·
*Contact par e-mail* · *Mesure d'audience et cookies* · *Vos demandes*. Texte intégral relevé, FR et EN.

---

## 6. Positionnement (pour la question 6)

Relevé sur `/fr/` : « **Solutions de vision embarquée de bout en bout, de l'algorithme au déploiement.** »
(bloc Services → *Développement de Projet*)
Autres services affichés : *Fabrication de Caméras sur Mesure*, *Solutions Clés en Main sur Commande*.
Accroche : « Écosystème de vision haute performance pour des applications de défense et industrielles ».

Le site local dit l'inverse : « La société ne prend pas la maîtrise d'œuvre d'un système :
elle fournit la tête optique, la chaîne de traitement et la documentation de définition. »

---

## NON TROUVÉ

Rien de ce qui suit n'est publié sur sma-rty.fr. Ces champs restent **en l'état** dans le dépôt.

- **Condition de mesure du NETD** (point 3f). Le site donne « < 60 mK » sans condition —
  ni température de scène, ni f/#, ni bande. La consigne demandait « < 60 mK avec sa condition » :
  la condition n'existe pas à la source.
- **Prix Électrons d'Or 2023** : aucune mention, sur aucune page.
- **METACAMERA** : aucune mention. Pas de tête multi-bandes au catalogue.
- **Chiffre de résultat pour l'étude de cas « Suivi de particules 3D »**.
- **Téléphone**, **SIREN**, **capital social**, **directeur de publication**, **hébergeur**,
  **numéro de TVA** : absents du site en ligne. (Le SIREN 845 146 935 et la TVA figurent
  dans le dépôt local, source inconnue — non vérifiables ici.)
- **Contenu des CGV** : la page existe mais elle est vide.
- **Mentions légales** : page inexistante.
- Bandes spectrales détaillées de METACAMERA, budget de latence, consommation du BNX,
  masse des caméras, indice de protection : non publiés.

## ÉCARTÉ

- **Tout le texte marketing** de sma-rty.fr (« révéler l'invisible », « Libérant tout le potentiel »,
  « idéal pour les scénarios les plus exigeants »…) — consigne : faits seulement.
- **`availability: OutOfStock`** présent dans le JSON-LD des quatre produits : valeur par défaut
  du gabarit, pas une information de disponibilité réelle.
- **`serie_THR-LW_detour.png`** comme visuel produit : détourage incomplet, le plan de travail
  reste visible sur la droite.
- Les captures d'application (`scenes/lwir-*.png`, `swir-*.png`, `crack_detection.gif`) :
  ce sont des images de démonstration, pas des visuels produits détourés.

## CONTRADICTIONS À ARBITRER

1. **Statut FNX-SWIR** : le dépôt local affiche « En production » ; le site officiel affiche
   « Intégration anticipée / Early Integration ». Le local surclasse la réalité publiée.
2. **Entrées caméra du BNX** : le tableau dit « 3x MIPI CSI-2 », le texte de la même page dit
   « jusqu'à 4 caméras MIPI ». Laquelle publie-t-on ?
3. **Ordre de l'équipe** (voir §3).
4. **Positionnement** (voir §6).

---

## LES SIX QUESTIONS

1. **Nomenclature** — THR-LW / ASB-1080 Mono / FNX-SWIR / BNX Carrier (en ligne) ou
   KALIX / FONIX / METACAMERA / BASEN (local) ? *Le renommage vers les noms officiels a déjà été
   fait le 15/09 sur `main`, sans arbitrage de votre part : à confirmer ou à annuler.*
2. **METACAMERA** — on la garde ? Si oui, sur quelle source, avec quel visuel, et quel statut ?
   Sinon, je la remplace par ASB-1080 Mono, qui existe et dont j'ai toutes les données.
3. **Électrons d'Or 2023** — invérifiable. Je le retire, ou vous me donnez une source ?
   *Il est actuellement attribué à THR-LW Thermal dans le dépôt, par effet du renommage.*
4. **Raison sociale** — le site officiel écrit partout « SMA-RTY SAS ». Je m'aligne ?
5. **Téléphone** — aucun numéro publié nulle part. Je retire la ligne, ou vous m'en donnez un ?
6. **Positionnement** — « pas la maîtrise d'œuvre » (local) ou « de bout en bout » (en ligne) ?
   Cet arbitrage touche l'argumentaire du nouveau site, pas seulement une phrase.

Deux questions supplémentaires que l'extraction a fait apparaître :

7. **CGV** — la page en ligne est vide. Je crée une page vide dans le gabarit, j'attends un texte,
   ou je ne crée pas la page ?
8. **Mentions légales** — inexistantes en ligne. Les rédiger demande des informations que vous seul
   avez (capital, RCS, directeur de publication, hébergeur). Vous me les fournissez ?

---

# Journal d'intégration — 16/09/2026

Arbitrage reçu : **sur les deux contradictions, le site officiel fait foi.**
Statut FNX-SWIR → « Intégration anticipée ». Entrées caméra BNX → 3 × MIPI CSI-2
(le tableau de spécifications l'emporte sur la phrase de la même page).

Appliqué par la règle « aucune valeur inventée », faute de réponse aux questions 2 et 3 :
METACAMERA et le prix Électrons d'Or **restent en l'état**, sans source ajoutée.
Le positionnement n'est pas touché : la rédaction du nouveau site ne change pas.

| Point | État | Fichier |
|---|---|---|
| a · SPECS | 4 instruments, 29 lignes, bilingue, sous le tableau de synthèse | `src/content.js`, `src/build.js` |
| b · Études de cas | section `#cas`, 2 projets datés | idem |
| c · Équipe | 4 portraits 800×800, titres officiels, LinkedIn | `assets/media/team/`, `src/content.js` |
| d · Support | `support@sma-rty.com` dans les coordonnées | idem |
| e · Pages légales | confidentialité FR + EN ; CGV et mentions légales **non créées** | `fr/confidentialite/`, `en/privacy/` |
| f · NETD | `à confirmer` → `< 60 mK`, **sans condition** (la source n'en publie pas) | `src/content.js` |
| g · Visuels | 4 détourages recadrés sur boîte alpha, largeur max 1400 px | `assets/media/instruments/` |

`assets/css/style.css` n'a pas été modifié à cette étape. Aucune section existante n'a été
restructurée : SPECS s'insère sous le tableau existant, « Études de cas » est une section neuve.
