# Les recettes de Fafa — Studio Pixel

Studio indépendant : https://lesrecettesdefafa-pixel.github.io/Recettes-de-fafa/

Le fichier `index.html` (minuscules) est le studio Pixel. `Index.html` conserve l’atelier de recettes existant. Les autres versions et tout l’historique sont conservés.

## Configuration Pixel

- Hébergement : GitHub Pages, branche `main`, dossier racine.
- Relais distinct : https://fafa-pixel-relais.frostydaisy5.chatgpt.site
- Contrôle du relais : https://fafa-pixel-relais.frostydaisy5.chatgpt.site/health
- Code reproductible du relais : `pixel-relay-worker.js` (Cloudflare Worker ESM).
- Site source du relais géré par Sites : projet `appgprj_6ae47ae734788191924bc9eb83fe955a`.
- Aucune clé ni référence de calcul du studio original utilisée.
- Origines autorisées : domaine GitHub Pages Pixel et domaine du relais Pixel. Aucun proxy vers une URL arbitraire.
- Sauvegardes du navigateur séparées : préfixes `fafa-pixel-` ; projets JSON exportables ; photos et clips dans IndexedDB.

## Utilisation

1. Importer une photo et vérifier son recadrage 9:16 (432 × 768).
2. Choisir un geste ou écrire un prompt. Tester 2 secondes et 6 étapes.
3. Lancer l’animation, laisser l’onglet ouvert, télécharger le MP4 reçu.
4. Sauvegarder aussi le projet JSON pour retrouver la photo et le texte sur un autre appareil.

Le MP4 n’est annoncé prêt qu’après réception d’un fichier vidéo. Les dimensions réellement produites s’affichent sous la vidéo. Le téléchargement est proposé à partir d’un Blob local et non d’un lien temporaire externe.

## Moteur et limites

Le relais interroge le Space public Wan 2.2 de cbensimon (`cbensimon/Wan2.2-FP8DA-AOTI-Preview2`). Son API `generate_video` a été inspectée le 30 octobre 2026 : 16 paramètres, modèle Wan 2.2 14B I2V Lightning. Une copie du site ne fournit pas de GPU supplémentaire et ne contourne aucun quota. Le service peut être occupé, dormir ou refuser une génération. Aucun abonnement payant n’a été souscrit.

Alternative de calcul indépendante du Space : [WanGP (anciennement Wan2GP)](https://github.com/deepbeepmeep/WanGP), moteur libre à exécuter sur un GPU compatible, par exemple avec le notebook [Wan 2.2 sur Kaggle](outils-video/wan22-5b-kaggle/). Les quotas et la disponibilité du GPU restent ceux de l’hébergeur. Le notebook conservé n’a pas fait l’objet d’une génération validée dans cette session.

Références officielles : https://huggingface.co/docs/hub/spaces-api-endpoints et https://github.com/Wan-Video/Wan2.2.

## Sources préservées

Ce dépôt est issu de `fardje2905-ux/Recettes-de-fafa` : cette mention est une attribution historique, pas une adresse opérationnelle Pixel. Le studio original https://fafa-niftyvid.frostydaisy5.chatgpt.site/ et son dépôt ne sont pas modifiés.

Les dossiers `niftyvid-sauvegarde` (copie figée) et `niftyvid-evolution` (miroir synchronisable) conservent les sources et licences d’Igor Lima. Le studio personnalisé se trouve à la racine pour ne pas être écrasé par la synchronisation du miroir. Licence MIT du code NiftyVid conservée dans `LICENSE-NIFTYVID.txt` et dans les sources. Licence Apache 2.0 du notebook conservée dans son dossier.

