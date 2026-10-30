# Compte rendu — Fafa Pixel

Vérification du 30 octobre 2026.

## Adresse publique vérifiée

https://lesrecettesdefafa-pixel.github.io/Recettes-de-fafa/

Le studio est publié sur GitHub Pages et son interface a été ouverte et testée dans le navigateur Work connecté au compte `lesrecettesdefafa-pixel`.

## Réalisé

| Étape | Résultat vérifié |
|---|---|
| Compte Pixel | Session navigateur connectée à lesrecettesdefafa-pixel ; modifications enregistrées avec ce compte. Le connecteur GitHub lisait le dépôt, mais son écriture retournait 403 : les commits ont été effectués dans le navigateur Work. |
| Dépôt original | Branche main de fardje2905-ux/Recettes-de-fafa inchangée : bbcfb65f4893a8eec0e4b12fb476e1255ca94d92, identique au début de l’intervention. Aucune mutation du studio original. |
| Historique | Ajout de commits normaux dans Pixel ; aucun effacement, force-push ou changement du dépôt original. |
| Liens Pixel | Guide d’organisation, guide d’accès et lien d’import du notebook corrigés vers Pixel. Les mentions de l’auteur d’origine et les attributions historiques restent conservées. |
| Configuration indépendante | Nouveau index.html à la racine ; atelier précédent conservé dans Index.html ; préfixes fafa-pixel- pour les données locales ; relais séparé ; aucune clé du studio original réutilisée. |
| GitHub Pages | Activé sur main, dossier racine ; HTTPS obligatoire ; page publique chargée avec le titre Fafa Pixel · Studio vidéo. |
| Relais vidéo | Cloudflare Worker ESM distinct publié via Sites : https://fafa-pixel-relais.frostydaisy5.chatgpt.site. Route /health observée : ok=true, studio=fafa-pixel. |
| NiftyVid | Copies figée et évolutive présentes et conservées. Personnalisation placée hors du miroir synchronisable afin de ne pas être écrasée par une synchronisation. |
| Wan 2.2 | API réelle du Space cbensimon/Wan2.2-FP8DA-AOTI-Preview2 inspectée : generate_video, 16 paramètres, Wan 2.2 14B I2V avec Lightning. Notebook Wan 2.2 5B Kaggle présent ; il n’a pas été exécuté dans cette session. |
| Mobile | Contrôle en fenêtre intégrée de 390 pixels, avec 375 pixels de largeur utile : une colonne, pas de débordement horizontal, huit boutons de gestes testés. Il s’agit d’une simulation de largeur mobile dans Chrome Work, pas d’un test matériel sur Samsung. |
| Sauvegardes | Export JSON téléchargé et contenu vérifié. Restauration du JSON dans le studio public vérifiée : message Projet restauré et texte rétabli. Photo et prompt retrouvés après rechargement. |
| Sécurité du relais | Origines de navigateur limitées à Pixel et au relais ; destinations de téléchargement limitées aux fichiers du Space configuré. Tests de validation des entrées, contrat Wan, SSE et compatibilité de redirection Cloudflare réussis. Aucun abonnement souscrit. |

## Génération vidéo et téléchargement : validation incomplète

La photo d’essai finalement envoyée au moteur est **une photo publique du domaine public**, Chicken and rice, Renee Comet / National Cancer Institute, via Wikimedia Commons : https://commons.wikimedia.org/wiki/File:Chicken_and_rice.jpg. Aucune photo personnelle de Fafa n’a été envoyée au moteur.

- Premier essai public, 2 secondes / 6 étapes : le moteur a renvoyé un événement de fin et une adresse MP4. Le transfert a échoué avec HTTP 502 à cause d’un mode de redirection non supporté par Cloudflare.
- Cause identifiée et corrigée : utilisation de manual à la place de error. Test de régression ajouté au relais.
- Les essais suivants, y compris 2 secondes / 4 étapes, ont été interrompus par le moteur avec un événement SSE error et une valeur null, sans raison précise. Une indisponibilité GPU, un quota ou une erreur interne sont des possibilités ; aucune n’est affirmée comme cause certaine.
- La récupération d’une vidéo terminée est désormais conservée localement et peut être relancée sans demander un nouveau calcul GPU.
- **Aucun MP4 final n’a été téléchargé et validé de bout en bout dans cette session.** Les dimensions d’une vidéo réellement produite et sa qualité d’animation ne sont donc pas certifiées. Le recadrage d’entrée en 432 × 768 est vérifié ; il ne prouve pas à lui seul le format de sortie du moteur.
- Aucun diaporama ni faux clip n’a été substitué à une génération IA réussie. Les essais GPU ont été arrêtés après l’échec de l’essai allégé.

## Moteurs indépendants recherchés

1. **WanGP (anciennement Wan2GP)** : https://github.com/deepbeepmeep/WanGP. Moteur libre multi-modèles, incluant Wan 2.2 et LTX. Il peut s’exécuter indépendamment du Space public sur un GPU compatible. Le code ne facture pas de crédits, mais le GPU doit être disponible ; Kaggle impose ses propres limites. Le notebook du dépôt constitue une piste d’exécution, pas un serveur actuellement actif.
2. **LTX-2 / Lightricks** : https://huggingface.co/Lightricks/LTX-2 et https://github.com/Lightricks/LTX-2. Modèle image-vers-vidéo à poids ouverts et exécution locale possible sous sa licence communautaire ; GPU nécessaire. Une licence à poids ouverts ne garantit ni GPU distant gratuit ni quota gratuit illimité. Aucun service payant LTX n’a été activé et aucun test LTX n’est revendiqué ici.

Documentation officielle des quotas et API : https://huggingface.co/docs/hub/spaces-api-endpoints et https://huggingface.co/docs/hub/spaces-zerogpu.

## Fichiers et licences

- index.html : studio Pixel autonome.
- pixel-relay-worker.js : code du relais et configuration des origines.
- LICENSE-NIFTYVID.txt : licence MIT d’Igor Lima reproduite.
- outils-video/niftyvid-sauvegarde et niftyvid-evolution : sources et licences préservées.
- outils-video/wan22-5b-kaggle : notebook et licence Apache 2.0 conservés.

Le relais de production est versionné séparément dans Sites (projet appgprj_6ae47ae734788191924bc9eb83fe955a). La page de contrôle /mobile-preview est un outil de vérification d’affichage.

Le studio public est utilisable pour préparer les gestes et conserver les projets. La production IA reste dépendante de la disponibilité du moteur : **la mission n’est pas présentée comme une validation complète de génération MP4**.

