# Lecteur Vocal PWA – Guide de déploiement

## Fichiers du projet

```
lecteur-vocal-pwa/
├── index.html      ← Application principale
├── manifest.json   ← Manifeste PWA (installation Android)
├── sw.js           ← Service Worker (mode hors-ligne)
├── icon-192.png    ← Icône 192×192 (à créer)
└── icon-512.png    ← Icône 512×512 (à créer)
```

## Créer les icônes

Les icônes peuvent être générées gratuitement via :
- https://favicon.io/favicon-generator/ → choisir 🎧 sur fond #0A0F1E
- https://maskable.app/editor pour l'icône "maskable" Android

Enregistrer en `icon-192.png` et `icon-512.png` dans le même dossier.

## Déploiement Netlify (recommandé)

1. Créez un compte sur https://netlify.com (gratuit)
2. Glissez-déposez le dossier `lecteur-vocal-pwa/` dans Netlify Drop
3. Netlify fournit automatiquement HTTPS (obligatoire pour les PWA)
4. L'URL ressemblera à : `https://votre-app.netlify.app`

## Installation sur Android

1. Ouvrez l'URL dans **Chrome Android**
2. Chrome affiche une bannière "Ajouter à l'écran d'accueil"
   – OU menu ⋮ → "Ajouter à l'écran d'accueil"
3. L'app s'installe comme une appli native

## Utilisation avec Google Docs

### Méthode 1 – Copier-coller (universelle)
1. Dans Google Docs → sélectionnez tout (appui long → Tout sélectionner)
2. Copiez le texte
3. Ouvrez Lecteur Vocal → Onglet "Coller" → Appui long → Coller
4. Appuyez sur ▶️ LIRE

### Méthode 2 – Partage Web Share Target (si PWA installée)
1. Dans Google Docs → ⋮ → Partager et exporter → Envoyer une copie → Texte
2. Dans la liste de partage Android, choisissez "Lecteur Vocal"
3. Le texte arrive automatiquement dans l'app, prêt à être lu

## Fonctionnalités

- ✅ Lecture phrase par phrase (corrige le bug Chrome Mobile)
- ✅ Vitesse réglable : 0.6× / 0.8× / 1.0× / 1.3× / 1.6×
- ✅ Pause / Reprendre / Stop
- ✅ Sélection de la voix française disponible
- ✅ Statistiques (mots, phrases, durée estimée)
- ✅ Barre de progression
- ✅ Mode hors-ligne (Service Worker)
- ✅ Installable sur l'écran d'accueil Android
- ✅ Compatible TalkBack
