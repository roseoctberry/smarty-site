/* ============================================================
   SMA-RTY — contenu éditorial (v5)
   Dosage : une accroche opérationnelle courte, puis la ligne de spec.
   Jamais d'antithèse, jamais de chute. Titres ≤ 10 mots.
   ============================================================ */

const site = {
  brand: 'SMARTY', sub: 'FRANCE',
  baseUrl: 'https://sma-rty.fr',
  siren: '845 146 935',
  /* Adobe Fonts — kit « Europa ». */
  typekit: 'wst3qpr',
  lieu: { fr: 'Institut Pascal, Aubière (63)', en: 'Institut Pascal, Aubière, France' },
  cree: 2019,
  adresse: ['4 avenue Blaise Pascal', '63178 Aubière', 'France'],
  siret: '845 146 935 00018',
  tva: 'FR12 845 146 935',
  mail: 'info@sma-rty.com',
  support: 'support@sma-rty.com',
  /* ⚠ non publié sur sma-rty.com — à renseigner avant mise en ligne. */
  tel: '',
  groupe: { it: 'SMA-RTY Italia SRL : Cologno Monzese (Milan), Vimodrone (Milan), La Spezia' },
};

/* ---------- Menu ---------- */
const NAV = [
  { id:'capacites', n:{fr:'Capacités',en:'Capabilities'},
    d:{fr:'Relevés comparatifs par bande.',en:'Comparative captures by band.'} },
  { id:'instruments', n:{fr:'Instruments',en:'Instruments'},
    d:{fr:'THR-LW, FNX-SWIR, Metacamera, calcul embarqué.',en:'THR-LW, FNX-SWIR, Metacamera, embedded compute.'} },
  { id:'integration', n:{fr:'Intégration',en:'Integration'},
    d:{fr:'Architecture de l’instrument et paramètres ajustables.',en:'Instrument architecture and adjustable parameters.'} },
  { id:'secteurs', n:{fr:'Domaines d’emploi',en:'Fields of use'},
    d:{fr:'Défense, sites, aéronautique, industrie.',en:'Defence, sites, aviation, industry.'} },
  { id:'labo', n:{fr:'Laboratoire',en:'Laboratory'},
    d:{fr:'Vidéos de banc et publications associées.',en:'Bench videos and companion papers.'} },
  { id:'equipe', n:{fr:'Équipe',en:'Team'},
    d:{fr:'Direction et ingénierie.',en:'Management and engineering.'} },
  { id:'contact', n:{fr:'Contact & société',en:'Contact & company'},
    d:{fr:'Adresse, téléphone, genèse, mentions légales.',en:'Address, telephone, origin, legal information.'} },
];

/* ---------- Hero : scènes ---------- */
const POC = [
  { id:'nocturne', k:{fr:'NUIT',en:'NIGHT'},
    label:{fr:'Terrain lisible sans éclairage',en:'Terrain legible without light'},
    layers:[ {id:'vis', n:{fr:'Visible',en:'Visible'}, w:'0,4–0,7 µm', img:'poc-nocturne-vis.jpg'},
             {id:'ir',  n:{fr:'LWIR',en:'LWIR'},       w:'8–14 µm',   img:'poc-nocturne-lwir.jpg'} ],
    start:'ir',
    where:{fr:'Trois heures après le coucher du soleil, sans lune. Routes, cours d’eau et bâti gardent assez de contraste thermique pour servir d’amers de recalage.',
           en:'Three hours after sunset, no moon. Roads, waterways and buildings keep enough thermal contrast to serve as re-localization landmarks.'},
    metric:{fr:'NETD < 60 mK · 150 m sol',en:'NETD < 60 mK · 150 m AGL'},
    gear:{fr:'THR-LW + calcul embarqué',en:'THR-LW + embedded compute'} },

  { id:'fumee', k:{fr:'OBSCURCISSANT',en:'OBSCURANT'},
    label:{fr:'Fumée sèche traversée',en:'Dry smoke penetrated'},
    layers:[ {id:'vis', n:{fr:'Visible',en:'Visible'}, w:'0,4–0,7 µm', img:'poc-fumee-vis.jpg'},
             {id:'ir',  n:{fr:'LWIR',en:'LWIR'},       w:'8–14 µm',   img:'poc-fumee-lwir.jpg'},
             {id:'fus', n:{fr:'Fusion',en:'Fusion'},   w:'VIS + LWIR',img:'poc-fumee-fusion.jpg'} ],
    start:'ir',
    where:{fr:'Les suies diffusent dans le visible et restent transparentes à 8–14 µm. La voie, le véhicule et la clôture réapparaissent là où l’image visible sature.',
           en:'Soot scatters in the visible and stays transparent at 8–14 µm. Lane, vehicle and fence reappear where the visible image saturates.'},
    metric:{fr:'Portée à travers l’obscurcissant à mesurer',en:'Range through obscurant TBC'},
    gear:{fr:'THR-LW',en:'THR-LW'} },

  { id:'verglas', k:{fr:'ÉTAT DE SURFACE',en:'SURFACE STATE'},
    label:{fr:'Eau et glace séparées',en:'Water and ice separated'},
    layers:[ {id:'vis', n:{fr:'Visible',en:'Visible'}, w:'0,4–0,7 µm', img:'poc-verglas-vis.jpg'},
             {id:'ir',  n:{fr:'SWIR',en:'SWIR'},       w:'0,9–1,7 µm',img:'poc-verglas-swir.jpg'},
             {id:'fus', n:{fr:'Fusion',en:'Fusion'},   w:'VIS + SWIR',img:'poc-verglas-fusion.jpg'} ],
    start:'ir',
    where:{fr:'L’eau absorbe fortement au-delà de 1,4 µm. Une aire qui paraît uniformément humide rend en SWIR la carte réelle de l’eau retenue.',
           en:'Water absorbs strongly beyond 1.4 µm. A surface that looks uniformly damp yields in SWIR the real map of standing water.'},
    metric:{fr:'Résolution au sol à mesurer',en:'Ground resolution TBC'},
    gear:{fr:'FNX-SWIR sur porteur véhicule',en:'FNX-SWIR, vehicle-mounted'} },

  { id:'spot', k:{fr:'DÉSIGNATION',en:'DESIGNATION'},
    label:{fr:'Marquage à 1,06 et 1,55 µm',en:'Marking at 1.06 and 1.55 µm'},
    layers:[ {id:'vis', n:{fr:'Visible',en:'Visible'}, w:'0,4–0,7 µm', img:'poc-spot-vis.jpg'},
             {id:'ir',  n:{fr:'SWIR',en:'SWIR'},       w:'0,9–1,7 µm',img:'poc-spot-swir.jpg'} ],
    start:'ir',
    where:{fr:'Un spot de désignation ne dépose pas d’énergie thermique exploitable : la bande 8–14 µm ne le restitue pas. La bande 0,9–1,7 µm couvre les deux longueurs d’onde usuelles.',
           en:'A designation spot deposits no usable thermal energy: the 8–14 µm band does not render it. The 0.9–1.7 µm band covers both standard wavelengths.'},
    metric:{fr:'Scène à 300 m · dynamique intra-image à mesurer',en:'Scene at 300 m · intra-frame dynamic range TBC'},
    gear:{fr:'FNX-SWIR',en:'FNX-SWIR'} },
];

/* ---------- Hero : suite d'images plein écran ----------
   Ordre d'apparition au défilement horizontal. Chaque entrée pointe une
   bande déjà décrite dans POC : pas de duplication d'image ni de libellé. */
const HEROSEQ = [
  { poc:'fumee',   layer:'vis' },
  { poc:'fumee',   layer:'fus' },
  { poc:'verglas', layer:'vis' },
  { poc:'verglas', layer:'fus' },
];

/* ---------- Spécifications publiées ----------
   Grandeurs reprises du catalogue constructeur, telles que publiées.
   `c` = condition de mesure, uniquement quand la source en énonce une.
   METACAMERA n'y figure pas : aucune grandeur publiée. */
const SPECS = {
  h:{fr:'Grandeurs publiées',en:'Published figures'},
  p:{fr:'Aucune valeur n’est extrapolée : une grandeur absente du catalogue est absente d’ici.',
     en:'No value is extrapolated: a figure absent from the catalogue is absent here.'},
  cols:{fr:['Grandeur','Valeur'],en:['Quantity','Value']},
  units:[
    { id:'thr-lw', n:'THR-LW Thermal',
      rows:[
        { k:{fr:'Type de capteur',en:'Sensor type'},   v:{fr:'Microbolomètre 12 µm, sans obturateur',en:'12 µm microbolometer, shutterless'} },
        { k:{fr:'Résolution',en:'Resolution'},          v:{fr:'640 × 480 (VGA)',en:'640 × 480 (VGA)'} },
        { k:{fr:'Sensibilité',en:'Sensitivity'},        v:{fr:'< 60 mK',en:'< 60 mK'} },
        { k:{fr:'Fréquence',en:'Frame rate'},           v:{fr:'jusqu’à 60 Hz',en:'up to 60 Hz'} },
        { k:{fr:'Profondeur de flux',en:'Stream depth'},v:{fr:'14 bits',en:'14-bit'} },
        { k:{fr:'Traitement',en:'Processing'},          v:{fr:'FPGA temps réel (NUC, BPC, AGC)',en:'Real-time FPGA (NUC, BPC, AGC)'} },
        { k:{fr:'Refroidissement',en:'Cooling'},        v:{fr:'non refroidi, correction active',en:'uncooled, active correction'} },
        { k:{fr:'Interface',en:'Interface'},            v:{fr:'USB 3.1 Type-C / MIPI CSI-2',en:'USB 3.1 Type-C / MIPI CSI-2'} },
        { k:{fr:'Protocole',en:'Protocol'},             v:{fr:'USB-UVC',en:'USB-UVC'} },
        { k:{fr:'Dimensions',en:'Dimensions'},          v:{fr:'55 × 55 × 40 mm',en:'55 × 55 × 40 mm'} },
        { k:{fr:'Alimentation',en:'Power'},             v:{fr:'12 V DC · 2,5 W',en:'12 V DC · 2.5 W'} },
        { k:{fr:'Température d’emploi',en:'Operating temperature'}, v:{fr:'−10 à +55 °C',en:'−10 to +55 °C'} },
      ] },
    { id:'fnx-swir', n:'FNX-SWIR',
      rows:[
        { k:{fr:'Capteur',en:'Sensor'},        v:{fr:'InGaAs',en:'InGaAs'} },
        { k:{fr:'Résolution',en:'Resolution'}, v:{fr:'640 × 512 (VGA)',en:'640 × 512 (VGA)'} },
        { k:{fr:'Pas pixel',en:'Pixel pitch'}, v:{fr:'15 µm',en:'15 µm'} },
        { k:{fr:'Bande',en:'Spectrum'},        v:{fr:'0,9 – 1,7 µm',en:'0.9 – 1.7 µm'} },
        { k:{fr:'Dynamique',en:'Dynamic range'}, v:{fr:'modes gain haut / gain bas',en:'high gain / low gain modes'} },
        { k:{fr:'Interface',en:'Interface'},   v:{fr:'MIPI CSI-2 / USB 3.0',en:'MIPI CSI-2 / USB 3.0'} },
        { k:{fr:'Protocole',en:'Protocol'},    v:{fr:'USB-UVC',en:'USB-UVC'} },
        { k:{fr:'Architecture',en:'Architecture'}, v:{fr:'commune à la gamme THR-LW',en:'shared with the THR-LW range'},
          c:{fr:'format mécanique plus large',en:'wider mechanical format'} },
      ] },
    { id:'asb-1080', n:'ASB-1080 Mono',
      rows:[
        { k:{fr:'Capteur',en:'Sensor'},        v:{fr:'CMOS global shutter 1/2,9″',en:'1/2.9″ global shutter CMOS'} },
        { k:{fr:'Résolution',en:'Resolution'}, v:{fr:'1920 × 1080 (FHD)',en:'1920 × 1080 (FHD)'} },
        { k:{fr:'Fréquence',en:'Frame rate'},  v:{fr:'60 im/s',en:'60 fps'},
          c:{fr:'à pleine résolution',en:'at full resolution'} },
        { k:{fr:'Efficacité d’obturation',en:'Shutter efficiency'}, v:{fr:'> 99,9 %',en:'> 99.9%'} },
        { k:{fr:'Monture',en:'Mount'},         v:{fr:'C / CS',en:'C / CS'} },
        { k:{fr:'Interface',en:'Interface'},   v:{fr:'DVP vers FPGA / USB 3.0',en:'DVP to FPGA / USB 3.0'} },
        { k:{fr:'Protocole',en:'Protocol'},    v:{fr:'USB-UVC',en:'USB-UVC'} },
        { k:{fr:'Sensibilité spectrale',en:'Spectral response'}, v:{fr:'400 nm – 1 µm',en:'400 nm – 1 µm'} },
      ] },
    { id:'bnx', n:'BNX Carrier',
      rows:[
        { k:{fr:'Compatibilité',en:'Compatibility'}, v:{fr:'NVIDIA Jetson Xavier NX / Orin NX',en:'NVIDIA Jetson Xavier NX / Orin NX'} },
        { k:{fr:'Entrées caméra',en:'Camera inputs'}, v:{fr:'3 × MIPI CSI-2',en:'3 × MIPI CSI-2'},
          c:{fr:'par HDMI étanche',en:'over waterproofed HDMI'} },
        { k:{fr:'Réseau',en:'Networking'},     v:{fr:'1 × Gigabit Ethernet étanche',en:'1 × waterproofed Gigabit Ethernet'} },
        { k:{fr:'Stockage',en:'Storage'},      v:{fr:'1 × M.2 NVMe Key M',en:'1 × M.2 NVMe Key M'} },
        { k:{fr:'Affichage',en:'Display'},     v:{fr:'1 × DisplayPort 4K à 60 Hz',en:'1 × DisplayPort 4K at 60 Hz'} },
        { k:{fr:'Accélération',en:'Acceleration'}, v:{fr:'CUDA / TensorRT',en:'CUDA / TensorRT'} },
        { k:{fr:'Système',en:'Operating system'},  v:{fr:'Linux embarqué',en:'Embedded Linux'} },
        { k:{fr:'Commande',en:'Control'},          v:{fr:'I²C',en:'I²C'} },
        { k:{fr:'Liaison sans fil',en:'Wireless'}, v:{fr:'Wi-Fi / 5G',en:'Wi-Fi / 5G'} },
        { k:{fr:'Tension d’entrée',en:'Input voltage'}, v:{fr:'9 – 19 V DC',en:'9 – 19 V DC'} },
        { k:{fr:'Refroidissement',en:'Cooling'}, v:{fr:'passif, sans ventilateur',en:'passive, fanless'} },
        { k:{fr:'Connectique',en:'Connectors'},  v:{fr:'endurcie',en:'ruggedised'},
          c:{fr:'poussière et humidité',en:'dust and moisture'} },
      ] },
  ],
};

/* ---------- Études de cas ----------
   Deux projets livrés, documentés au même format que les relevés comparatifs.
   Images extraites des séquences publiées par la société. */
const CASES = {
  ey:{fr:'Projets livrés',en:'Delivered projects'},
  h:{fr:'Deux systèmes en service',en:'Two systems in service'},
  items:[
    { id:'particules',
      h:{fr:'Suivi de particules en trois dimensions dans un flux d’air',
         en:'Three-dimensional particle tracking in an airflow'},
      p:{fr:'Des caméras ASB-1080 à global shutter suivent des particules dans un volume. L’obturation globale fige chaque particule sans traînée de balayage, ce qui rend les trajectoires exploitables image après image. Le système reconstruit les déplacements en trois dimensions et en déduit les schémas de circulation d’air en salle blanche et en installation de chauffage, ventilation et climatisation, avec des données de qualité d’air et d’efficacité de circulation disponibles en temps réel.',
         en:'ASB-1080 global shutter cameras track particles across a volume. Global shuttering freezes each particle with no rolling smear, which makes the tracks usable frame after frame. The system reconstructs the motion in three dimensions and derives airflow patterns in cleanrooms and in heating, ventilation and air-conditioning installations, with air quality and circulation efficiency available in real time.'},
      cols:[ {n:{fr:'Début d’acquisition',en:'Start of acquisition'},  img:'particules-1.jpg'},
             {n:{fr:'Accumulation des tracés',en:'Track accumulation'}, img:'particules-2.jpg'},
             {n:{fr:'Fin de séquence',en:'End of sequence'},            img:'particules-3.jpg'} ],
      metric:{fr:'Partenaire industriel · 2023',en:'Industrial partner · 2023'},
      gear:{fr:'ASB-1080 Mono',en:'ASB-1080 Mono'} },

    { id:'drone',
      h:{fr:'Navigation de drone en environnement privé de GPS',
         en:'Drone navigation in a GPS-denied environment'},
      p:{fr:'Navigation visuelle « inside-out » : le drone se localise en regardant le sol, sans signal extérieur. Une carte apprise au préalable et le traitement embarqué recalent la position en vol. L’affichage de mission confronte la trajectoire de référence et la trajectoire estimée, et rend compte du nombre d’amers verrouillés et de l’indice de confiance de la solution. La localisation annoncée est de 20 cm, ce qui ouvre le vol autonome en tunnel et en canyon urbain.',
         en:'Inside-out visual navigation: the drone locates itself by looking at the ground, with no external signal. A pre-learned map and on-board processing correct the position in flight. The mission display sets the reference track against the estimated track, and reports the number of locked landmarks and the confidence index of the solution. Stated localisation is 20 cm, which opens autonomous flight in tunnels and urban canyons.'},
      cols:[ {n:{fr:'Début de mission',en:'Start of mission'}, img:'drone-1.jpg'},
             {n:{fr:'Mi-parcours',en:'Mid-course'},            img:'drone-2.jpg'},
             {n:{fr:'Fin de trajectoire',en:'End of track'},    img:'drone-3.jpg'} ],
      metric:{fr:'Défense et robotique · 2024 · localisation 20 cm',
              en:'Defence and robotics · 2024 · 20 cm localisation'},
      gear:{fr:'Traitement embarqué',en:'On-board processing'} },
  ],
};

/* ---------- Pages légales ----------
   Confidentialité reprise des deux versions linguistiques existantes.
   Conditions de vente et mentions légales : rien à reprendre. */
const LEGAL = {
  privacy: {
    slug:{fr:'confidentialite',en:'privacy'},
    ey:{fr:'Mentions',en:'Legal'},
    h:{fr:'Confidentialité',en:'Privacy'},
    intro:{fr:'Cette page explique simplement comment les informations sont traitées sur la version statique de notre site.',
           en:'This page simply explains how information is handled on the static version of our website.'},
    sections:[
      { h:{fr:'Ce site ne crée pas de compte utilisateur',en:'This site does not create user accounts'},
        p:[{fr:'La version statique du site ne propose pas de connexion, de tableau de bord client, d’espace employé ou de base de données applicative. Les pages concernées renvoient vers la page de contact.',
            en:'The static version of the site does not provide login, customer dashboards, employee areas or an application database. Related pages redirect to the contact page.'}] },
      { h:{fr:'Contact par e-mail',en:'Contact by email'},
        p:[{fr:'Le formulaire de contact ouvre votre logiciel de messagerie. Le message n’est envoyé que si vous le validez depuis votre propre client e-mail.',
            en:'The contact form opens your email client. The message is only sent if you confirm it from your own email application.'},
           {fr:'Les informations transmises peuvent inclure votre nom, votre adresse e-mail et le contenu de votre demande.',
            en:'The information sent may include your name, email address and the content of your request.'}] },
      { h:{fr:'Mesure d’audience et cookies',en:'Analytics and cookies'},
        p:[{fr:'Cette version du site n’utilise pas de cookies publicitaires. Certains réglages de confort, comme le thème ou la langue, peuvent être conservés localement dans votre navigateur.',
            en:'This version of the site does not use advertising cookies. Some convenience settings, such as theme or language, may be stored locally in your browser.'}] },
      { h:{fr:'Vos demandes',en:'Your requests'},
        p:[{fr:'Pour toute question, modification ou suppression d’un échange envoyé par e-mail, contactez-nous directement.',
            en:'For any question, modification or deletion request regarding an email exchange, contact us directly.'}] },
    ],
    updated:{fr:'Dernière mise à jour : 16 septembre 2026',en:'Last updated: 16 September 2026'},
  },
};

/* ---------- Relevés comparatifs ---------- */
const PROOF = [
  { id:'jumeaux',
    h:{fr:'Même température, matières différentes',en:'Same temperature, different materials'},
    p:{fr:'Deux plaques indiscernables à l’œil, mises à l’équilibre thermique. En 8–14 µm l’écart est nul. En 0,9–1,7 µm la réflectance diffère franchement : la discrimination porte sur la matière.',
       en:'Two panels indistinguishable to the eye, at thermal equilibrium. At 8–14 µm the difference is nil. At 0.9–1.7 µm reflectance differs plainly: discrimination is on material.'},
    cols:[ {n:{fr:'Visible',en:'Visible'}, img:'poc-jumeaux-vis.jpg'},
           {n:{fr:'LWIR, confondues',en:'LWIR, indistinguishable'}, img:'poc-jumeaux-lwir.jpg'},
           {n:{fr:'SWIR, séparées',en:'SWIR, separated'}, img:'poc-jumeaux-swir.jpg'} ],
    metric:{fr:'Écart thermique < 0,2 K · recalage inter-bandes cible < 1 px',
            en:'Thermal delta < 0.2 K · inter-band registration target < 1 px'},
    gear:{fr:'Metacamera',en:'Metacamera'} },

  { id:'retro',
    h:{fr:'Une optique en observation se trahit à 150 m',en:'An observing optic gives itself away at 150 m'},
    p:{fr:'Toute optique renvoie la lumière vers sa source. Sous illumination coaxiale eye-safe, un objectif enfoui dans une haie rend un point saturant. Le point dur tient à la dynamique : garder la scène lisible pendant qu’un point sature.',
       en:'Any optic returns light toward its source. Under eye-safe coaxial illumination, a lens buried in a hedgerow returns a saturating point. The hard part is dynamic range: keeping the scene readable while one point saturates.'},
    cols:[ {n:{fr:'Visible',en:'Visible'}, img:'poc-retro-vis.jpg'},
           {n:{fr:'SWIR + illuminateur',en:'SWIR + illuminator'}, img:'poc-retro-swir.jpg', mark:true} ],
    metric:{fr:'150 m · illuminateur 1550 nm eye-safe · contraste à mesurer',
            en:'150 m · 1550 nm eye-safe illuminator · contrast TBC'},
    gear:{fr:'FNX-SWIR + illuminateur coaxial',en:'FNX-SWIR + coaxial illuminator'} },
];

/* ---------- Bandeau chiffré ---------- */
const METRICS = [
  { pre:'×', n:4, suf:'', spectral:true,
    l:{fr:'bandes sur une même tête',en:'bands on one head'},
    s:{fr:'visible · NIR · SWIR · LWIR',en:'visible · NIR · SWIR · LWIR'} },
  { pre:'', n:0, suf:' %',
    l:{fr:'de charge sur le CPU hôte',en:'load on the host CPU'},
    s:{fr:'FPGA + GPU à bord',en:'FPGA + GPU on board'} },
  { pre:'', n:1, suf:' px',
    l:{fr:'cible de recalage inter-bandes',en:'inter-band registration target'},
    s:{fr:'mesure publiée après essais',en:'measurement published after testing'} },
  { pre:'', n:100, suf:' %',
    l:{fr:'conçu et produit en France',en:'designed and built in France'},
    s:{fr:'autorité de conception sur 5 étages',en:'design authority across 5 stages'} },
];

/* ---------- Les cinq étages (cible des légendes cliquables) ---------- */
const STAGES = [
  { id:'optique', img:'pc-0-optique.png', r:373,
    n:{fr:'Optique',en:'Optics'},
    h:{fr:'Objectif dessiné pour la bande et pour le porteur',en:'Lens designed for the band and the platform'},
    p:{fr:'Combinaison optique calculée en interne selon la bande : verres et traitements antireflet différents en visible, en SWIR et en LWIR. Athermalisation sur la plage d’emploi, monture tenue en vibration, champ et ouverture arbitrés avec vous. Sur la THR-LW, l’objectif se monte et se démonte : plusieurs formats optiques sont proposés pour un même corps de caméra.',
       en:'Optical combination computed in-house for the band: different glasses and AR coatings in visible, SWIR and LWIR. Athermalisation over the operating range, vibration-rated mount, field and aperture arbitrated with you. On the THR-LW the lens is removable: several optical formats are offered for the same camera body.'},
    mod:{fr:['Focale et champ','Ouverture et profondeur de champ','Traitement selon la bande','Monture et interface mécanique'],
         en:['Focal length and field','Aperture and depth of field','Coating per band','Mount and mechanical interface']} },

  { id:'capot', img:'pc-1-capot.png', r:438,
    n:{fr:'Capot & mécanique',en:'Housing & mechanics'},
    h:{fr:'Étanchéité, dissipation, tenue mécanique',en:'Sealing, heat dissipation, mechanical strength'},
    p:{fr:'Le capot évacue la chaleur du calcul sans ventilateur, protège l’ensemble et porte les interfaces mécaniques. L’encombrement et la masse admissibles par le porteur sont fixés en début d’étude et commandent le reste de la conception. La THR-LW tient dans 55 × 55 × 40 mm et fonctionne de −10 à +55 °C ; le corps coté sur la vue éclatée mesure 50 × 50 × 35 mm, hors objectif et connectique.',
       en:'The housing removes compute heat without a fan, protects the assembly and carries the mechanical interfaces. The envelope and mass the platform allows are fixed at the start of the study and drive the rest of the design. The THR-LW fits within 55 × 55 × 40 mm and operates from −10 to +55 °C; the body dimensioned on the exploded view measures 50 × 50 × 35 mm, excluding lens and connectors.'},
    mod:{fr:['Encombrement et masse','Indice de protection','Dissipation passive ou assistée','Fixations et repères mécaniques'],
         en:['Envelope and mass','Ingress protection','Passive or assisted dissipation','Fixings and mechanical datums']} },

  { id:'capteur', img:'pc-2-capteur.png', r:295,
    n:{fr:'Capteur',en:'Sensor'},
    h:{fr:'Détecteur et électronique de proximité',en:'Detector and proximity electronics'},
    p:{fr:'Microbolomètre en LWIR, InGaAs en SWIR, CMOS en visible et NIR. L’électronique de proximité est dessinée par nos soins : pilotage, séquencement, correction de non-uniformité, gestion du gain. Cet étage fixe la qualité du premier pixel. Sur la THR-LW, le détecteur est un microbolomètre de pas 12 µm en 640 × 480, non refroidi et sans obturateur mécanique, pour une sensibilité annoncée sous 60 mK.',
       en:'Microbolometer in LWIR, InGaAs in SWIR, CMOS in visible and NIR. Proximity electronics are drawn by us: driving, sequencing, non-uniformity correction, gain management. This stage sets the quality of the first pixel. On the THR-LW the detector is an uncooled 12 µm pitch microbolometer at 640 × 480, with no mechanical shutter, for a stated sensitivity below 60 mK.'},
    mod:{fr:['Choix du détecteur et du format','Cadence et temps d’intégration','Stratégie de correction (NUC)','Synchronisation entre bandes'],
         en:['Detector and format choice','Frame rate and integration time','Correction strategy (NUC)','Inter-band synchronisation']} },

  { id:'calcul', img:'pc-3-calcul.png', r:214,
    n:{fr:'Calcul embarqué',en:'Embedded compute'},
    h:{fr:'FPGA au fil du flux, GPU pour l’inférence',en:'FPGA on the stream, GPU for inference'},
    p:{fr:'Le FPGA met en forme le flux pixel à la volée : correction, recalage inter-bandes, horodatage, sans mémoire de trame inutile. Le GPU exécute la détection. Le CPU du porteur reste disponible pour la fonction système. Sur la THR-LW, le FPGA porte la correction de non-uniformité, la correction de pixels défectueux et le gain automatique, et sort un flux 14 bits jusqu’à 60 Hz.',
       en:'The FPGA shapes the pixel stream on the fly: correction, inter-band registration, time-stamping, with no needless frame memory. The GPU runs detection. The platform CPU stays available for the system function. On the THR-LW the FPGA carries non-uniformity correction, defective pixel correction and automatic gain, and outputs a 14-bit stream at up to 60 Hz.'},
    mod:{fr:['Budget de latence','Modèle d’inférence embarqué','Enveloppe de consommation','Répartition bord / sol'],
         en:['Latency budget','Embedded inference model','Power envelope','On-board / ground split']} },

  { id:'embase', img:'pc-4-embase.png', r:236,
    n:{fr:'Embase & interfaces',en:'Base & interfaces'},
    h:{fr:'Ce que le système reçoit, et sous quelle forme',en:'What the system receives, and in what form'},
    p:{fr:'Alimentation, synchronisation, protocoles et connectique. Le format de sortie est une décision d’architecture : flux brut, flux corrigé et recalé, ou métadonnées horodatées seules. Nous livrons la documentation qui permet à l’intégrateur de tenir sa propre autorité de conception. La THR-LW sort en USB 3.1 Type-C ou en MIPI CSI-2 et se contente de 12 V pour 2,5 W.',
       en:'Power, synchronisation, protocols and connectors. The output format is an architecture decision: raw stream, corrected and registered stream, or time-stamped metadata alone. We deliver the documentation that lets the integrator hold their own design authority. The THR-LW outputs over USB 3.1 Type-C or MIPI CSI-2 and draws 2.5 W at 12 V.'},
    mod:{fr:['Protocole et connectique','Format et débit de sortie','Horloge et synchronisation externe','Documentation et transfert'],
         en:['Protocol and connectors','Output format and rate','Clock and external sync','Documentation and transfer']} },
];

/* ---------- Gamme ---------- */
const RANGE = {
  /* Visuels détourés importés du catalogue sma-rty.fr (fond transparent),
     redimensionnés à 620 px. Les identifiants restent inchangés : ce sont
     les ancres (#in-kalix…) utilisées ailleurs dans la page. */
  cards:[
    { id:'kalix', spec:'thr-lw', slug:'thr-lw', src:'https://sma-rty.fr/fr/products/thr-lw/', img:'thr-lw.png', n:'THR-LW Thermal', b:'LWIR 8–14 µm',
      h:{fr:'Caméra thermique intelligente, sans volet mécanique',
         en:'Smart thermal camera, no mechanical shutter'},
      p:{fr:'Les erreurs et aberrations thermiques sont corrigées par traitement embarqué, ce qui supprime le volet de calibration et les interruptions d’image qu’il impose.',
         en:'Thermal errors and aberrations are corrected by on-board processing, removing the calibration shutter and the image interruptions it imposes.'},
      award:{fr:'Prix Électrons d’Or 2023, catégorie Électronique industrielle',
             en:'Électrons d’Or Award 2023, Industrial Electronics category'} },
    { id:'fonix', spec:'fnx-swir', slug:'fnx-swir', src:'https://sma-rty.fr/fr/products/fnx-swir/', img:'fnx-swir.png', n:'FNX-SWIR', b:'SWIR 0,9–1,7 µm',
      h:{fr:'Caméra SWIR pour la discrimination de matière',
         en:'SWIR camera for material discrimination'},
      p:{fr:'Réflectance au-delà du visible : eau et glace, dépôts, textiles, et sources actives à 1,06 et 1,55 µm.',
         en:'Reflectance beyond the visible: water and ice, deposits, textiles, and active sources at 1.06 and 1.55 µm.'} },
    { id:'metacamera', slug:'metacamera', img:'metacamera.png', n:'METACAMERA', b:{fr:'Visible · NIR · SWIR · LWIR',en:'Visible · NIR · SWIR · LWIR'},
      h:{fr:'Tête multi-bandes recalée et fusionnée',en:'Registered, fused multi-band head'},
      p:{fr:'Acquisition simultanée des quatre bandes sur un même axe, recalage au pixel et couche de fusion à la cadence capteur.',
         en:'Simultaneous acquisition of all four bands on one axis, pixel registration and a fusion layer at sensor rate.'} },
    { id:'basen', spec:'bnx', slug:'bnx', src:'https://sma-rty.fr/fr/products/bnx/', img:'bnx.png', n:'BNX Carrier', b:{fr:'FPGA + GPU',en:'FPGA + GPU'},
      h:{fr:'Module de traitement au plus près du capteur',en:'Processing module closest to the sensor'},
      p:{fr:'Mise en forme du flux pixel sur FPGA, inférence sur GPU, sortie en métadonnées horodatées. Intégrable aux trois têtes.',
         en:'FPGA pixel-stream shaping, GPU inference, time-stamped metadata output. Integrable with all three heads.'} },
  ],
  more:{fr:'Voir la fiche',en:'View the sheet'},
  back:{fr:'Retour aux instruments',en:'Back to instruments'},
  srcL:{fr:'Fiche constructeur',en:'Manufacturer sheet'},
  cols:{ fr:['Instrument','Bande','Fonction dominante','Sortie','Statut'],
         en:['Instrument','Band','Primary function','Output','Status'] },
  rows:[
    { k:'THR-LW', b:'LWIR 8–14 µm',
      f:{fr:'Nuit, obscurcissants secs, anomalie thermique, sans volet mécanique',en:'Night, dry obscurants, thermal anomaly, shutterless'},
      o:{fr:'Flux corrigé + détections',en:'Corrected stream + detections'},
      s:{fr:'En production',en:'In production'} },
    { k:'FNX-SWIR', b:'SWIR 0,9–1,7 µm',
      f:{fr:'Matière, eau et glace, sources 1,06 / 1,55 µm',en:'Materials, water and ice, 1.06 / 1.55 µm sources'},
      o:{fr:'Flux corrigé + détections',en:'Corrected stream + detections'},
      /* statut repris du catalogue sma-rty.fr/fr/products/fnx-swir/ */
      s:{fr:'Intégration anticipée',en:'Early integration'} },
    { k:'METACAMERA', b:{fr:'Visible · NIR · SWIR · LWIR',en:'Visible · NIR · SWIR · LWIR'},
      f:{fr:'Acquisition multi-bandes recalée et fusionnée',en:'Registered, fused multi-band acquisition'},
      o:{fr:'Bandes recalées + couche de fusion',en:'Registered bands + fusion layer'},
      s:{fr:'Plateforme d’étude et d’intégration',en:'Study and integration platform'} },
    { k:'BNX Carrier', b:{fr:'Sans objet',en:'Not applicable'},
      f:{fr:'Mise en forme FPGA, inférence GPU à bord',en:'FPGA shaping, on-board GPU inference'},
      o:{fr:'Métadonnées horodatées',en:'Time-stamped metadata'},
      s:{fr:'Intégrable aux trois têtes',en:'Integrable with all three heads'} },
  ],
  note:{fr:'Formats, interfaces et performances mesurées sur fiche technique, sous accord de confidentialité.',
        en:'Formats, interfaces and measured performance on datasheet, under non-disclosure agreement.'},
};

/* ---------- Domaines d'emploi ---------- */
const SECTORS = [
  { id:'defense', n:{fr:'Défense & sécurité',en:'Defence & security'}, poc:'nocturne',
    d:{fr:'Navigation en GNSS contesté, désignation, protection de la force.',
       en:'GNSS-denied navigation, designation, force protection.'},
    seed:{fr:'Défense & sécurité',en:'Defence & security'} },
  { id:'sites', n:{fr:'Protection de sites',en:'Site protection'}, poc:'retro',
    d:{fr:'Détection d’optiques, surveillance sans émission visible.',
       en:'Optics detection, surveillance with no visible emission.'},
    seed:{fr:'Protection de sites',en:'Site protection'} },
  { id:'aero', n:{fr:'Aéronautique & infrastructures',en:'Aviation & infrastructure'}, poc:'verglas',
    d:{fr:'État de surface de piste, exploitation par visibilité dégradée.',
       en:'Runway surface state, operations in degraded visibility.'},
    seed:{fr:'Aéronautique & infrastructures',en:'Aviation & infrastructure'} },
  { id:'industrie', n:{fr:'Industrie & énergie',en:'Industry & energy'}, poc:'fumee',
    d:{fr:'Contrôle matière en ligne, milieux obscurcis, anomalies thermiques.',
       en:'In-line material control, obscured environments, thermal anomalies.'},
    seed:{fr:'Industrie & énergie',en:'Industry & energy'} },
];

/* ============================================================
   RÉFÉRENCES & CONFORMITÉ
   Substituts crédibles à l'habilitation Secret Défense.
   `st` : 'ok' = vérifié · 'tbc' = à confirmer par SMA-RTY avant publication
   ============================================================ */
/* NON PUBLIÉ — conservé hors rendu tant que les items ne sont pas vérifiés.
   Basculer publish:true dans build.js pour le réactiver. */
const TRUST = {
  publish:false,
  ey:{fr:'Références & conformité',en:'References & compliance'},
  h:{fr:'Ce qu’un maître d’œuvre vérifie avant de vous consulter',
     en:'What a prime contractor checks before consulting you'},
  p:{fr:'Un fournisseur de sous-ensemble optronique est évalué sur son statut, sa capacité de qualification et la traçabilité de sa chaîne, avant toute question d’habilitation.',
     en:'An optronic sub-system supplier is assessed on status, qualification capability and supply-chain traceability, before any clearance question.'},
  groups:[
    { n:{fr:'Statut fournisseur',en:'Supplier status'}, items:[
      { t:{fr:'Code NCAGE / OTAN',en:'NCAGE / NATO code'}, st:'tbc',
        d:{fr:'Identifiant fournisseur reconnu par les organismes d’armement.',en:'Supplier identifier recognised by defence procurement bodies.'} },
      { t:{fr:'Enregistrement biens à double usage',en:'Dual-use registration'}, st:'tbc',
        d:{fr:'Règlement (UE) 2021/821 : classement des produits et procédure de licence en place.',en:'Regulation (EU) 2021/821: product classification and licensing procedure in place.'} },
      { t:{fr:'Capital et direction français',en:'French capital and management'}, st:'ok',
        d:{fr:'Aucun contrôle extra-européen. SIREN 845 146 935.',en:'No non-European control. Company registration 845 146 935.'} },
      { t:{fr:'Pérennité',en:'Continuity'}, st:'ok',
        d:{fr:'Société créée en 2019, activité continue, production en propre.',en:'Founded 2019, continuous activity, in-house production.'} },
    ]},
    { n:{fr:'Qualification & environnement',en:'Qualification & environment'}, items:[
      { t:{fr:'Conception selon MIL-STD-810',en:'Design to MIL-STD-810'}, st:'tbc',
        d:{fr:'Thermique, vibrations, chocs : méthodes applicables identifiées par porteur.',en:'Thermal, vibration, shock: applicable methods identified per platform.'} },
      { t:{fr:'CEM selon MIL-STD-461 / DO-160',en:'EMC to MIL-STD-461 / DO-160'}, st:'tbc',
        d:{fr:'Campagnes conduites en laboratoire accrédité.',en:'Campaigns run in an accredited laboratory.'} },
      { t:{fr:'Démarche qualité ISO 9001',en:'ISO 9001 quality system'}, st:'tbc',
        d:{fr:'Procédures de conception, de revue et de configuration documentées.',en:'Design, review and configuration procedures documented.'} },
      { t:{fr:'Traçabilité de configuration',en:'Configuration traceability'}, st:'tbc',
        d:{fr:'Identification unique par instrument, dossier de définition maintenu.',en:'Unique identification per instrument, maintained definition file.'} },
    ]},
    { n:{fr:'Recherche & propriété',en:'Research & IP'}, items:[
      { t:{fr:'Institut Pascal, UMR CNRS / UCA',en:'Institut Pascal, CNRS / UCA joint unit'}, st:'ok',
        d:{fr:'Implantation sur site, travaux conduits avec l’unité.',en:'On-site location, work conducted with the unit.'} },
      { t:{fr:'Partenaires : UCA, Clermont Auvergne INP, INESCOP',en:'Partners: UCA, Clermont Auvergne INP, INESCOP'}, st:'ok',
        d:{fr:'Coopérations de recherche et d’essais.',en:'Research and testing partnerships.'} },
      { t:{fr:'Projets financés (ANR)',en:'Funded projects (national research agency)'}, st:'ok',
        d:{fr:'Sélection par évaluation scientifique indépendante.',en:'Selected through independent scientific review.'} },
      { t:{fr:'Publications et brevets',en:'Publications and patents'}, st:'tbc',
        d:{fr:'Travaux à comité de lecture, portefeuille en propre.',en:'Peer-reviewed work, own portfolio.'} },
    ]},
    { n:{fr:'Souveraineté & chaîne',en:'Sovereignty & supply chain'}, items:[
      { t:{fr:'Autorité de conception sur les cinq étages',en:'Design authority across all five stages'}, st:'ok',
        d:{fr:'Aucun étage en boîte noire ; modification possible sans tiers.',en:'No black-box stage; modification possible without a third party.'} },
      { t:{fr:'Contenu européen ≥ 65 %',en:'European content ≥ 65 %'}, st:'tbc',
        d:{fr:'Seuil de coût des composants visé au titre du règlement (UE) 2025/2643 (EDIP).',en:'Component-cost threshold targeted under Regulation (EU) 2025/2643 (EDIP).'} },
      { t:{fr:'Assemblage et essais en France',en:'Assembly and testing in France'}, st:'ok',
        d:{fr:'Aubière (63). Aucune sous-traitance d’assemblage hors UE.',en:'Aubière, France. No assembly subcontracting outside the EU.'} },
      { t:{fr:'Données et outils hébergés en UE',en:'Data and tools hosted in the EU'}, st:'tbc',
        d:{fr:'Chaîne de conception et sauvegardes sans dépendance extra-européenne.',en:'Design chain and backups with no non-European dependency.'} },
    ]},
  ],
  /* Le point d'habilitation, traité de face plutôt qu'esquivé. */
  clearance:{
    t:{fr:'Habilitation Secret Défense',en:'Defence security clearance'},
    d:{fr:'SMA-RTY France ne détient pas d’habilitation à ce jour. Les demandes d’habilitation individuelle et d’homologation de site sont engagées dès qu’un programme le requiert : la structure de l’entreprise (capital et direction français, production sur site unique, aucun contrôle extra-européen) ne présente aucun obstacle connu à l’instruction. Nos travaux se conduisent aujourd’hui au niveau Diffusion Restreinte et sur des sous-ensembles non classifiés, ce qui couvre la phase d’étude et de levée de risque de la plupart des programmes.',
       en:'SMA-RTY France does not currently hold a clearance. Individual clearance and site accreditation are initiated as soon as a programme requires them: the company structure (French capital and management, single-site production, no non-European control) presents no known obstacle to the process. Work today is conducted at restricted-distribution level and on unclassified sub-systems, which covers the study and risk-reduction phase of most programmes.'} },
};

/* ============================================================
   JOURNAL DE LABORATOIRE
   Chaque entrée est un relevé, pas une annonce. Un papier est lié.
   ============================================================ */
const LAB = {
  ey:{fr:'Laboratoire',en:'Laboratory'},
  h:{fr:'Journal de laboratoire',en:'Laboratory notebook'},
  p:{fr:'Chaque essai est filmé au banc : une à deux minutes, la manipulation réelle, le chiffre à l’écran. L’article scientifique correspondant est joint à chaque épisode.',
     en:'Every test is filmed at the bench: one to two minutes, the actual run, the figure on screen. The companion scientific paper is attached to each episode.'},
  play:{fr:'Voir l’essai',en:'Watch the run'},
  epi:{fr:'Épisode',en:'Episode'},
  read:{fr:'Lire l’article',en:'Read the paper'},
  soon:{fr:'Article en préparation',en:'Paper in preparation'},
  sub:{ t:{fr:'Recevoir les épisodes',en:'Receive the episodes'},
        d:{fr:'Sélectionnez les bandes qui vous concernent et le niveau de détail. Une adresse suffit.',
           en:'Select the bands that concern you and the level of detail. One address is enough.'},
        bands:[ {v:'swir', t:'SWIR 0,9–1,7 µm'}, {v:'lwir', t:'LWIR 8–14 µm'},
                {v:'multi',t:{fr:'Multispectral et fusion',en:'Multispectral and fusion'}},
                {v:'calc', t:{fr:'Calcul embarqué',en:'Embedded compute'}} ],
        depth:[ {v:'video', t:{fr:'La vidéo seule',en:'The video alone'}},
                {v:'papier',t:{fr:'La vidéo et l’article',en:'The video and the paper'}} ],
        mail:{fr:'Adresse professionnelle',en:'Work email'},
        send:{fr:'Recevoir les épisodes',en:'Subscribe'},
        done:{fr:'Prototype : aucune donnée n’est transmise à ce stade.',en:'Prototype: no data is transmitted at this stage.'} },
  /* PLACEHOLDERS — vignettes provisoires, à remplacer par les images de banc réelles. */
  entries:[
    { ep:3, d:'2026-07', band:'SWIR', bandv:'swir', dur:'1:48', thumb:'poc-verglas-swir.jpg',
      t:{fr:'Séparation eau libre / glace sur revêtement rainuré',en:'Free water / ice separation on grooved pavement'},
      p:{fr:'Trois angles d’incidence, dalle rainurée à température d’équilibre. Écart de réflectance mesuré entre eau retenue et glace formée.',
         en:'Three incidence angles, grooved slab at equilibrium temperature. Reflectance difference measured between standing water and formed ice.'},
      bench:{fr:'Banc réflectance',en:'Reflectance bench'}, url:'', paper:'' },
    { ep:2, d:'2026-05', band:'MULTI', bandv:'multi', dur:'2:05', thumb:'poc-jumeaux-swir.jpg',
      t:{fr:'Erreur de recalage inter-bandes sur mire à 20 m',en:'Inter-band registration error on 20 m target'},
      p:{fr:'Erreur résiduelle entre visible, SWIR et LWIR après calibration, mesurée sur toute la plage de température d’emploi.',
         en:'Residual error between visible, SWIR and LWIR after calibration, measured across the full operating temperature range.'},
      bench:{fr:'Banc de recalage',en:'Registration bench'}, url:'', paper:'' },
    { ep:1, d:'2026-03', band:'LWIR', bandv:'lwir', dur:'1:22', thumb:'poc-fumee-lwir.jpg',
      t:{fr:'Transmission à travers fumée de combustion sèche',en:'Transmission through dry combustion smoke'},
      p:{fr:'Atténuation à 8–14 µm en fonction de la densité optique visible, cible de contraste connu en fond de chambre.',
         en:'Attenuation at 8–14 µm against visible optical density, known-contrast target at the far wall.'},
      bench:{fr:'Chambre obscurcissante',en:'Obscurant chamber'}, url:'', paper:'' },
  ],
};

const TEAM = {
  ey:{fr:'Équipe',en:'Team'},
  h:{fr:'Direction et ingénierie',en:'Management and engineering'},
  p:{fr:'Quatre ingénieurs et chercheurs à Aubière. L’un d’eux lit votre demande et y répond.',
     en:'Four engineers and researchers in Aubière. One of them reads your request and answers it.'},
  hint:{fr:'Survolez un portrait pour le parcours détaillé.',en:'Hover a portrait for the detailed background.'},
  members:[
    { id:'fb', ph:'fb.jpg', n:'François Berry', ini:'FB',
      role:{fr:'Chief Executive Officer SMF',en:'Chief Executive Officer SMF'},
      dom:{fr:'Caméras intelligentes, architectures FPGA de vision',en:'Smart cameras, FPGA vision architectures'},
      edu:{fr:'Professeur des universités, Université Clermont Auvergne',en:'Full Professor, Université Clermont Auvergne'},
      from:{fr:'Institut Pascal (UMR CNRS / UCA), équipe vision embarquée',en:'Institut Pascal (CNRS / UCA joint unit), embedded vision group'},
      yrs:{fr:'25+',en:'25+'},
      out:{fr:'Architectures de caméras intelligentes à base de FPGA ; langage de traitement de flux sur FPGA ; publications à comité de lecture',
           en:'FPGA-based smart camera architectures; FPGA stream-processing language; peer-reviewed publications'},
      bio:{fr:'Conduit la stratégie technique de SMA-RTY France et le lien avec la recherche académique. Ses travaux portent depuis deux décennies sur le traitement d’image au plus près du capteur.',
           en:'Leads the technical strategy of SMA-RTY France and its articulation with academic research. His work has focused for two decades on processing images as close as possible to the sensor, which is the question real-time multispectral raises.'},
      li:'https://www.linkedin.com/in/fran%C3%A7ois-berry-a4399a2/',
      rg:'https://www.researchgate.net/profile/Francois-Berry-2' },

    { id:'ka', ph:'ka.jpg', n:'Kamel Abdelouahab', ini:'KA',
      role:{fr:'Edge AI Specialist',en:'Edge AI Specialist'},
      dom:{fr:'Inférence de réseaux de neurones sur FPGA et calcul embarqué',en:'Neural network inference on FPGA and embedded compute'},
      edu:{fr:'Docteur, Université Clermont Auvergne / Institut Pascal',en:'PhD, Université Clermont Auvergne / Institut Pascal'},
      from:{fr:'Institut Pascal, accélération d’inférence sur cible embarquée',en:'Institut Pascal, inference acceleration on embedded targets'},
      yrs:{fr:'10+',en:'10+'},
      out:{fr:'Travaux de référence sur l’accélération de l’inférence CNN sur FPGA ; publications à comité de lecture',
           en:'Reference work on accelerating CNN inference on FPGAs; peer-reviewed publications'},
      bio:{fr:'Responsable de la chaîne de détection embarquée : quantification des modèles, placement FPGA/GPU, budget de latence. C’est l’étage qui permet de sortir des métadonnées plutôt qu’un flux vidéo.',
           en:'Owns the on-board detection chain: model quantisation, FPGA/GPU placement, latency budget. This is the stage that allows metadata output rather than a video stream.'},
      li:'https://www.linkedin.com/in/kamelabdelouahab/',
      rg:'https://www.researchgate.net/profile/Kamel-Abdelouahab' },

    { id:'em', ph:'em.jpg', n:'Edoardo Malaspina', ini:'EM',
      role:{fr:'PhD in Multispectral Smart Cameras',en:'PhD in Multispectral Smart Cameras'},
      dom:{fr:'Acquisition multi-bandes, recalage et fusion',en:'Multi-band acquisition, registration and fusion'},
      edu:{fr:'Master en intelligence artificielle, Università di Pisa ; licence en bio-ingénierie, Università di Pisa',
           en:'Master’s in artificial intelligence, Università di Pisa; bachelor’s in bioengineering, Università di Pisa'},
      from:{fr:'Doctorat industriel chez SMA-RTY depuis 2024, après un poste d’ingénieur R&D dans la société',
            en:'Industrial PhD at SMA-RTY since 2024, following an R&D engineer position in the company'},
      yrs:{fr:'2 ans 5 mois chez SMA-RTY',en:'2 years 5 months at SMA-RTY'},
      out:{fr:'Thèse en cours sur les caméras intelligentes multispectrales',en:'Ongoing PhD on multispectral smart cameras'},
      bio:{fr:'Travaille sur l’acquisition simultanée de plusieurs bandes et sur leur recalage : synchronisation des capteurs, correction géométrique, couche de fusion. C’est le cœur de la différence entre quatre caméras et un instrument.',
           en:'Works on simultaneous multi-band acquisition and its registration: sensor synchronisation, geometric correction, fusion layer. This is the core of the difference between four cameras and one instrument.'},
      li:'https://www.linkedin.com/in/edoardo-malaspina-75ba4b232/',
      rg:'https://www.researchgate.net/profile/Edoardo-Malaspina' },

    { id:'yg', ph:'yg.jpg', n:'Yorick Geoffre', ini:'YG',
      role:{fr:'Embedded Systems Engineer',en:'Embedded Systems Engineer'},
      dom:{fr:'Électronique de proximité, firmware, traitement du signal et VHDL',
           en:'Proximity electronics, firmware, signal processing and VHDL'},
      edu:{fr:'Master SETSIS, systèmes embarqués pour le traitement de l’image et du son, Université Clermont Auvergne',
           en:'SETSIS master’s, embedded systems for image and sound processing, Université Clermont Auvergne'},
      from:{fr:'Licence développement mobile, Université Clermont Auvergne',
            en:'Bachelor’s in mobile development, Université Clermont Auvergne'},
      yrs:{fr:'Non communiqué',en:'Not disclosed'},
      out:{fr:'Non communiqué',en:'Not disclosed'},
      bio:{fr:'Conçoit et met au point la chaîne électronique entre le détecteur et le système : pilotage capteur, séquencement, protocoles et connectique de sortie.',
           en:'Designs and commissions the electronic chain between detector and system: sensor driving, sequencing, protocols and output connectors.'},
      li:'https://www.linkedin.com/in/yorick-g-318b08221/' },
  ],
  labels:{ edu:{fr:'Formation',en:'Education'}, from:{fr:'Parcours',en:'Background'},
           dom:{fr:'Domaine',en:'Domain'}, yrs:{fr:'Ans d’expérience',en:'Years of experience'},
           out:{fr:'Production',en:'Output'}, li:{fr:'LinkedIn',en:'LinkedIn'},
           pub:{fr:'Publications',en:'Publications'} },

};

/* ============================================================
   QUALIFICATEUR v2
   La maturité n'est jamais demandée : elle est lue dans la 1re réponse,
   puis la profondeur des questions suivantes s'y adapte.
   ============================================================ */
const QUAL = {
  ey:{fr:'Demande technique',en:'Technical enquiry'},
  h:{fr:'Un ingénieur vous répond sous 48 heures ouvrées',
     en:'An engineer replies within 48 working hours'},
  intro:{fr:'Quatre questions suffisent à pré-cadrer un besoin optronique. Vous recevez un avis technique écrit : faisabilité, bande pertinente, points durs.',
         en:'Four questions are enough to pre-scope an optronic requirement. You receive a written technical opinion: feasibility, relevant band, sticking points.'},
  back:{fr:'Retour',en:'Back'},
  skip:{fr:'Passer directement au contact',en:'Go straight to contact'},
  send:{fr:'Envoyer la note de cadrage',en:'Send the scoping note'},
  mailL:{fr:'Adresse professionnelle',en:'Work email'},
  orgL:{fr:'Organisation',en:'Organisation'},
  freeL:{fr:'Une précision, si vous le souhaitez',en:'One detail, if you wish'},
  freeP:{fr:'Facultatif : une ligne suffit.',en:'Optional: one line is enough.'},
  nextT:{fr:'Ce que vous recevez',en:'What you receive'},
  sla:{fr:'Réponse sous 48 h ouvrées',en:'Reply within 48 working hours'},
  done:{fr:'Prototype : aucune donnée n’est transmise à ce stade.',en:'Prototype: no data is transmitted at this stage.'},

  steps:[
    { id:'entree', q:{fr:'Quelle est la nature de votre demande ?',en:'What is the nature of your enquiry?'},
      o:[ {v:'limite', t:{fr:'Lever une limite sur un système en service',en:'Lift a limitation on a fielded system'},
             go:'terrain', ack:{fr:'Dans ce cas l’analyse part de la scène observée.',
                                en:'In that case the analysis starts from the observed scene.'} },
          {v:'specif', t:{fr:'Spécifier une chaîne image pour un nouveau système',en:'Specify an imaging chain for a new system'},
             go:'archi', ack:{fr:'Les arbitrages structurants sont la bande, le format de sortie et le budget de latence.',
                              en:'The structuring trade-offs are band, output format and latency budget.'} },
          {v:'consult',t:{fr:'Consulter un fournisseur sur un besoin déjà spécifié',en:'Consult a supplier on an already specified requirement'},
             go:'sourcing', ack:{fr:'Nous répondons sur périmètre couvert, exigences tenues et calendrier.',
                                 en:'We respond on scope covered, requirements met and schedule.'} },
          {v:'coop',   t:{fr:'Monter un projet de recherche ou de coopération',en:'Set up a research or partnership project'},
             go:'labo', ack:{fr:'Ces dossiers sont montés avec l’Institut Pascal et nos partenaires académiques.',
                             en:'These are built with Institut Pascal and our academic partners.'} } ] },

    /* --- système en service --- */
    { id:'manque', br:'terrain', q:{fr:'Quelle information manque aujourd’hui à l’image ?',en:'What information is missing from the image today?'},
      o:[ {v:'nuit', t:{fr:'Scène nocturne, sans éclairage artificiel',en:'Night scene, no artificial lighting'},
             ack:{fr:'Domaine de la bande LWIR 8–14 µm.',en:'LWIR 8–14 µm territory.'}},
          {v:'obsc', t:{fr:'Scène masquée par fumée, poussière ou brouillard',en:'Scene masked by smoke, dust or fog'},
             ack:{fr:'LWIR pour les obscurcissants secs ; la vapeur d’eau reste une limite physique.',
                  en:'LWIR for dry obscurants; water vapour remains a physical limit.'}},
          {v:'mat',  t:{fr:'Nature d’un matériau, d’un dépôt ou d’un liquide',en:'Nature of a material, deposit or liquid'},
             ack:{fr:'Domaine de la bande SWIR 0,9–1,7 µm.',en:'SWIR 0.9–1.7 µm territory.'}},
          {v:'src',  t:{fr:'Présence d’une source ou d’une optique active',en:'Presence of an active source or optic'},
             ack:{fr:'SWIR : 1,06 et 1,55 µm, et retour rétro-réflectif.',en:'SWIR: 1.06 and 1.55 µm, plus retro-reflective return.'}},
          {v:'car',  t:{fr:'À caractériser avec vous',en:'To be characterised with you'},
             ack:{fr:'C’est une réponse recevable : la caractérisation fait partie de l’étude.',
                  en:'A valid answer: characterisation is part of the study.'}} ] },
    { id:'porteur', br:'terrain', q:{fr:'Sur quel porteur l’instrument est-il installé ?',en:'On which platform is the instrument installed?'},
      o:[ {v:'fixe',t:{fr:'Poste fixe',en:'Fixed post'}}, {v:'veh',t:{fr:'Véhicule',en:'Vehicle'}},
          {v:'drone',t:{fr:'Drone',en:'UAV'}}, {v:'aero',t:{fr:'Aéronef',en:'Aircraft'}},
          {v:'main',t:{fr:'Portatif',en:'Hand-held'}} ] },
    { id:'avance', br:'terrain', q:{fr:'Où en est le projet ?',en:'How far along is the project?'},
      o:[ {v:'analyse',t:{fr:'Analyse de besoin',en:'Requirement analysis'}},
          {v:'etude',  t:{fr:'Étude en cours',en:'Study under way'}},
          {v:'budget', t:{fr:'Budget engagé',en:'Budget committed'}} ] },

    /* --- spécification --- */
    { id:'bandes', br:'archi', multi:true, q:{fr:'Quelles bandes sont visées ?',en:'Which bands are targeted?'},
      o:[ {v:'vis',t:{fr:'Visible 0,4–0,7 µm',en:'Visible 0.4–0.7 µm'}}, {v:'nir',t:'NIR 0,7–0,9 µm'},
          {v:'swir',t:'SWIR 0,9–1,7 µm'}, {v:'lwir',t:'LWIR 8–14 µm'},
          {v:'arb',t:{fr:'Arbitrage à conduire avec vous',en:'Trade-off to be conducted with you'}} ] },
    { id:'sortie', br:'archi', q:{fr:'Quelle sortie le système doit-il recevoir ?',en:'What output must the system receive?'},
      o:[ {v:'brut',t:{fr:'Flux brut, corrections côté système (CoaXPress / GigE)',en:'Raw stream, corrections system-side (CoaXPress / GigE)'}},
          {v:'corr',t:{fr:'Flux corrigé et recalé, prêt à exploiter',en:'Corrected, registered stream, ready to use'},
             ack:{fr:'Configuration où le FPGA porte la charge et laisse le CPU du porteur à la fonction système.',
                  en:'Configuration where the FPGA carries the load and leaves the platform CPU to the system function.'}},
          {v:'meta',t:{fr:'Détections horodatées seules, sans flux vidéo',en:'Time-stamped detections only, no video stream'},
             ack:{fr:'Débit réduit d’un ordre de grandeur : souvent ce qui débloque la liaison.',
                  en:'Bandwidth cut by an order of magnitude: often what unblocks the datalink.'}},
          {v:'def', t:{fr:'Point encore ouvert',en:'Still an open point'}} ] },
    { id:'dim', br:'archi', q:{fr:'Quelle exigence dimensionne le sous-ensemble ?',en:'Which requirement sizes the sub-system?'},
      o:[ {v:'swap',t:{fr:'Masse, volume et consommation',en:'Mass, volume and power'}},
          {v:'env', t:{fr:'Tenue en environnement : thermique, vibrations, étanchéité',en:'Environmental withstand: thermal, vibration, sealing'}},
          {v:'lat', t:{fr:'Cadence et latence de bout en bout',en:'End-to-end frame rate and latency'}},
          {v:'reca',t:{fr:'Recalage et synchronisation entre bandes',en:'Inter-band registration and synchronisation'}} ] },
    { id:'stade', br:'archi', q:{fr:'À quel stade se situe le programme ?',en:'At what stage is the programme?'},
      o:[ {v:'amont',t:{fr:'Étude amont',en:'Upstream study'}},
          {v:'trl',  t:{fr:'Levée de risque, TRL 4 à 6',en:'Risk reduction, TRL 4 to 6'}},
          {v:'serie',t:{fr:'Intégration en série',en:'Series integration'}},
          {v:'retro',t:{fr:'Rétrofit d’un système en service',en:'Retrofit of a fielded system'}} ] },

    /* --- consultation fournisseur --- */
    { id:'base', br:'sourcing', q:{fr:'Sur quelle base consultez-vous ?',en:'On what basis are you consulting?'},
      o:[ {v:'cdc', t:{fr:'Cahier des charges rédigé',en:'Written specification'}},
          {v:'spec',t:{fr:'Fiche de spécification technique',en:'Technical specification sheet'}},
          {v:'ao',  t:{fr:'Appel d’offres en cours',en:'Live tender'}} ] },
    { id:'vol', br:'sourcing', q:{fr:'Quel volume et quelle échéance ?',en:'What volume and deadline?'},
      o:[ {v:'proto',t:{fr:'Prototypes, quelques unités',en:'Prototypes, a few units'}},
          {v:'presr',t:{fr:'Présérie, quelques dizaines',en:'Pre-series, a few tens'}},
          {v:'serie',t:{fr:'Série, centaines et au-delà',en:'Series, hundreds and above'}} ] },
    { id:'exig', br:'sourcing', multi:true, q:{fr:'Quelles exigences doivent être couvertes ?',en:'Which requirements must be covered?'},
      o:[ {v:'mil',t:{fr:'Qualification en environnement',en:'Environmental qualification'}},
          {v:'cem',t:{fr:'Compatibilité électromagnétique',en:'Electromagnetic compatibility'}},
          {v:'eu', t:{fr:'Contenu européen et souveraineté',en:'European content and sovereignty'}},
          {v:'doc',t:{fr:'Dossier de définition transférable',en:'Transferable definition file'}},
          {v:'sec',t:{fr:'Contraintes de confidentialité programme',en:'Programme confidentiality constraints'}} ] },

    /* --- recherche --- */
    { id:'coop', br:'labo', q:{fr:'Quelle forme de coopération envisagez-vous ?',en:'What form of partnership do you envisage?'},
      o:[ {v:'codev',t:{fr:'Co-développement d’un sous-ensemble',en:'Co-development of a sub-system'}},
          {v:'finan',t:{fr:'Projet financé, national ou européen',en:'Funded project, national or European'}},
          {v:'acad', t:{fr:'Coopération académique ou thèse',en:'Academic partnership or PhD'}},
          {v:'banc', t:{fr:'Accès à un banc ou à une campagne d’essais',en:'Access to a bench or test campaign'}} ] },
  ],

  next:{
    terrain: {fr:'Un avis écrit sur la bande pertinente et les points durs de votre scène, puis un échange de vingt minutes avec l’ingénieur qui l’a rédigé.',
              en:'A written opinion on the relevant band and the sticking points of your scene, then a twenty-minute exchange with the engineer who wrote it.'},
    archi:   {fr:'La fiche technique détaillée sous accord de confidentialité, et une revue d’architecture sur vos contraintes.',
              en:'The detailed datasheet under non-disclosure agreement, and an architecture review against your constraints.'},
    sourcing:{fr:'Une réponse écrite à votre consultation : périmètre couvert, périmètre non couvert, exigences tenues, calendrier.',
              en:'A written response to your enquiry: scope covered, scope not covered, requirements met, schedule.'},
    labo:    {fr:'Une note d’intention commune et la mise en relation avec l’unité de recherche concernée.',
              en:'A joint statement of intent and an introduction to the relevant research unit.'},
    'null':  {fr:'Un avis technique écrit, puis un échange avec l’ingénieur qui l’a rédigé.',
              en:'A written technical opinion, then an exchange with the engineer who wrote it.'},
  },
};

/* ============================================================
   CONTACT / SOCIÉTÉ
   ============================================================ */
/* ---------- pied de page ---------- */
const FOOT = {
  cols:[
    { t:{fr:'SMA-RTY France',en:'SMA-RTY France'},
      l:[{n:{fr:'La société',en:'The company'}, h:'#contact'},
         {n:{fr:'Nous écrire',en:'Contact us'},  h:'#cadrer'},
         {n:{fr:'Équipe',en:'Team'},             h:'#equipe'}] },
    { t:{fr:'Instruments',en:'Instruments'}, range:true },
    { t:{fr:'Ressources',en:'Resources'},
      l:[{n:{fr:'Capacités',en:'Capabilities'},          h:'#capacites'},
         {n:{fr:'Architecture',en:'Architecture'},        h:'#integration'},
         {n:{fr:'Journal de laboratoire',en:'Laboratory notebook'}, h:'#labo'}] },
    { t:{fr:'Mentions',en:'Legal'}, legal:true },
  ],
  top:{fr:'Haut de page',en:'Back to top'},
};

const CONTACT = {
  ey:{fr:'Contact',en:'Contact'},
  h:{fr:'SMA-RTY France SAS',en:'SMA-RTY France SAS'},
  gen:{fr:'Genèse',en:'Origin'},
  genP:{fr:'SMA-RTY naît des travaux conduits à l’Institut Pascal, unité mixte du CNRS et de l’Université Clermont Auvergne, sur le traitement de l’image au plus près du capteur. La question de départ est restée la même : comment décider à bord, sans renvoyer le flux au sol ni saturer le calculateur du porteur. La société est créée en 2019 et s’installe sur le site même de l’unité, à Aubière. L’entité française porte l’optronique et le calcul embarqué ; l’entité italienne du groupe porte les réseaux et la transmission. La caméra thermique THR-LW, issue de ces travaux, a reçu le prix Électrons d’Or 2023 dans la catégorie Électronique industrielle.',
        en:'SMA-RTY originates from work conducted at Institut Pascal, a joint research unit of CNRS and Université Clermont Auvergne, on processing images as close as possible to the sensor. The founding question has not changed: how to decide on board, without sending the stream to the ground or saturating the platform computer. The company was founded in 2019 and settled on the unit’s own campus in Aubière. The French entity handles optronics and embedded compute; the group’s Italian entity handles networks and transmission. The THR-LW thermal camera, born of this work, received the 2023 Électrons d’Or award in the Industrial Electronics category.'},
  coords:{fr:'Coordonnées',en:'Contact details'},
  legal:{fr:'Mentions légales',en:'Legal information'},
  eco:{fr:'Écosystème',en:'Ecosystem'},
  ecoL:{fr:['Institut Pascal, UMR CNRS / Université Clermont Auvergne',
            'Clermont Auvergne INP',
            'INESCOP',
            'Projets de recherche financés par l’ANR'],
        en:['Institut Pascal, CNRS / Université Clermont Auvergne joint unit',
            'Clermont Auvergne INP',
            'INESCOP',
            'Research projects funded by the French National Research Agency']},
  grp:{fr:'Groupe',en:'Group'},
  labels:{ adr:{fr:'Adresse',en:'Address'}, tel:{fr:'Téléphone',en:'Telephone'},
           mail:{fr:'Courriel',en:'Email'}, support:{fr:'Support',en:'Support'}, rs:{fr:'Raison sociale',en:'Legal name'},
           cree:{fr:'Création',en:'Founded'}, siren:{fr:'SIREN',en:'Company number'},
           siret:{fr:'SIRET',en:'Establishment number'}, tva:{fr:'TVA intracommunautaire',en:'VAT number'},
           forme:{fr:'Forme juridique',en:'Legal form'} },
  forme:{fr:'Société par actions simplifiée',en:'Simplified joint-stock company'},
  telTBC:{fr:'à renseigner',en:'to be provided'},
};

/* ---------- Interface ----------
   Registre : intitulés de section neutres, corps de texte dense et factuel.
   Aucun jeu de mots, aucune chute, aucun impératif publicitaire dans les titres.
   ------------------------------------------------------------------ */
const UI = {
  menu:{fr:'MENU',en:'MENU'},
  cta:{fr:'Consulter nos ingénieurs',en:'Consult our engineers'},
  ctaSub:{fr:'',en:''},

  heroH:{fr:'Caméras multispectrales et traitement embarqué pour systèmes optroniques',
         en:'Multispectral cameras and embedded processing for optronic systems'},
  heroP:{fr:'Visible, NIR, SWIR 0,9–1,7 µm et LWIR 8–14 µm sur une tête unique, recalés au pixel et traités à bord. Conception, assemblage et essais en France.',
         en:'Visible, NIR, SWIR 0.9–1.7 µm and LWIR 8–14 µm on a single head, pixel-registered and processed on board. Designed, assembled and tested in France.'},
  heroPrev:{fr:'PRÉVISUALISATION',en:'PREVISUALIZATION'},
  heroLab:{fr:'Journal de laboratoire',en:'Laboratory notebook'},

  posEy:{fr:'Périmètre de fourniture',en:'Scope of supply'},
  posH:{fr:'Sous-ensemble optronique et autorité de conception',en:'Optronic sub-system and design authority'},
  posP:{fr:'SMA-RTY France conçoit et assemble ses instruments à Aubière, sur le site de l’Institut Pascal. Elle fournit la tête optique, la chaîne de traitement et la documentation de définition. L’intégrateur garde la maîtrise d’œuvre de son système.',
        en:'SMA-RTY France designs and assembles its instruments in Aubière, on the Institut Pascal campus. The company does not act as system prime contractor: it supplies the optical head, the processing chain and the definition file, so that the integrator retains control of its own system.'},
  posLi:{fr:['Optique et mécanique dessinées en interne, adaptées au porteur',
             'Électronique capteur et carte de traitement conçues en interne',
             'Correction, recalage et fusion maîtrisés ligne à ligne',
             'Code, schémas et procédures transmissibles sous accord'],
         en:['Optics and mechanics drawn in-house, adapted to the platform',
             'Sensor electronics and processing board designed in-house',
             'Correction, registration and fusion mastered line by line',
             'Code, schematics and procedures transferable under agreement']},

  proofEy:{fr:'Capacités',en:'Capabilities'},
  proofH:{fr:'Relevés comparatifs par bande',en:'Comparative captures by band'},
  proofP:{fr:'Deux cas où l’image visible et une bande infrarouge unique ne permettent pas de conclure.',
          en:'Two cases where the visible image and a single infrared band do not allow a conclusion.'},

  sigN:{fr:'THR-LW Thermal',en:'THR-LW Thermal'},
  sigK:{fr:'Vue éclatée',en:'Exploded view'},

  stEy:{fr:'Intégration',en:'Integration'},
  stH:{fr:'Architecture de l’instrument : THR-LW Thermal',en:'Instrument architecture: THR-LW Thermal'},
  stP:{fr:'La vue éclatée est celle de la THR-LW Thermal, caméra LWIR de production : objectif, capot, carte capteur, carte de traitement, capot arrière et interfaces. Chaque étage est ajustable au besoin du porteur et du système ; les valeurs citées ci-dessous sont celles publiées au catalogue pour cette caméra.',
       en:'The exploded view is the THR-LW Thermal, the LWIR production camera: lens, housing, sensor board, processing board, rear cover and interfaces. Each stage is adjustable to the platform and system requirement; the figures quoted below are those published in the catalogue for this camera.'},
  stMod:{fr:'Paramètres ajustables',en:'Adjustable parameters'},

  rangeEy:{fr:'Instruments',en:'Instruments'},
  rangeH:{fr:'Gamme et chaîne de traitement',en:'Range and processing chain'},
  rangeP:{fr:'Trois têtes optiques et un module de calcul, conçus pour fonctionner ensemble ou séparément.',
          en:'Three optical heads and one compute module, designed to work together or separately.'},
  rangeTbl:{fr:'Tableau de synthèse',en:'Summary table'},
  pipeH:{fr:'Chaîne de traitement embarquée',en:'Embedded processing chain'},

  secEy:{fr:'Applications',en:'Applications'},
  secH:{fr:'Domaines d’emploi',en:'Fields of use'},
  secCta:{fr:'Partir de ce domaine',en:'Start from this field'},

  socEy:{fr:'Société',en:'Company'},
  socH:{fr:'SMA-RTY France SAS',en:'SMA-RTY France SAS'},
  socP:{fr:'Société par actions simplifiée créée en 2019, implantée sur le site de l’Institut Pascal à Aubière. Travaux conduits avec l’Université Clermont Auvergne, Clermont Auvergne INP et INESCOP, et dans le cadre de projets financés par l’ANR. Entité française du groupe SMA-RTY, dont le second centre de R&D est en Italie.',
        en:'Simplified joint-stock company founded in 2019, located on the Institut Pascal campus in Aubière. Work conducted with Université Clermont Auvergne, Clermont Auvergne INP and INESCOP, and within nationally funded research projects. French entity of the SMA-RTY group, whose second R&D centre is in Italy.'},

  proto:{fr:'Maquette de refonte, prototype non contractuel. Images de prévisualisation, non représentatives de relevés capteur.',
         en:'Redesign prototype, non-contractual. Previsualization imagery, not representative of sensor captures.'},

  tbc:{fr:'à confirmer',en:'to confirm'},
};

module.exports = { site, NAV, POC, HEROSEQ, SPECS, CASES, LEGAL, FOOT, PROOF, METRICS, STAGES, RANGE, SECTORS, TRUST, LAB, TEAM, QUAL, CONTACT, UI };
