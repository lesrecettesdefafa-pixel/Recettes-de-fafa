# FAFA — Génération vidéo IA gratuite (Kaggle)

Ce dossier contient un vrai notebook Python pour lancer [Wan2GP](https://github.com/deepbeepmeep/WanGP) et animer une photo en vidéo MP4 avec les GPU de Kaggle.

## Ouvrir depuis Kaggle sans téléchargement

Le précédent lien direct `kaggle.com/kernels/welcome?src=...` peut renvoyer « Invalid field utm_source ». Utiliser l'import officiel :

1. [Ouvrir Kaggle — nouveau notebook](https://www.kaggle.com/code/new)
2. Dans le menu **File**, choisir **Import Notebook** (parfois **Open/Upload Notebook**) puis **GitHub**.
3. Coller l'adresse du notebook FAFA :

```text
https://github.com/lesrecettesdefafa-pixel/Recettes-de-fafa/blob/main/outils-video/wan22-5b-kaggle/Fafa_Wan22_5B_Kaggle.ipynb
```

On peut aussi [télécharger le fichier .ipynb sur GitHub](./Fafa_Wan22_5B_Kaggle.ipynb) puis l'importer dans Kaggle via **Upload**.

## Sur smartphone Samsung

1. Connectez-vous à votre compte Kaggle ; la vérification du numéro de téléphone peut être nécessaire pour obtenir un GPU gratuit.
2. Dans les paramètres du notebook, activez **Internet** et choisissez **GPU T4** (ou T4 ×2 si proposé).
3. Lancez toutes les cellules l'une après l'autre. La première installation télécharge de gros fichiers et prend du temps.
4. Dans le résultat de la dernière cellule, touchez le lien **Gradio** affiché pour ouvrir l'interface vidéo sur le téléphone. Gardez le notebook ouvert et en cours d'exécution.
5. Dans Wan2GP, choisissez **Wan 2.2 TextImage2Video 5B FastWan**, importez une photo, puis testez un clip de **3 secondes** en **480p** avant d'augmenter la résolution. Sélectionnez le format portrait **9:16** lorsqu'il est proposé.
6. Téléchargez le MP4 dès qu'il est prêt ; les fichiers et GPU temporaires de Kaggle ne sont pas persistants.

### Prompt pour tester le tajine

```text
A woman's hand gently drops three green olives into the chicken tajine. The olives fall naturally into the sauce. Gentle steam. Fixed camera, realistic cooking motion, same pot, no extra hands, no text.
```

## Ce que « installé » veut dire ici

Le **fichier du moteur et son programme d'installation sont sauvegardés dans ton GitHub**. Mais GitHub ne fournit pas de GPU ; le serveur vidéo **ne s'installe réellement et ne démarre que lorsque tu exécutes le notebook dans Kaggle**. Aucun test de génération complète ni benchmark n'a encore été réalisé sur ton compte.

Kaggle impose des limites de GPU gratuit et la génération peut rester lente. Ce montage n'est **pas** une promesse de vidéos gratuites illimitées, ni de création immédiate.

## Crédits et licence

Notebook adapté depuis [Square-Zero-Labs/Wan2GP-on-Kaggle](https://github.com/Square-Zero-Labs/Wan2GP-on-Kaggle), sous licence Apache 2.0 ; code du moteur [DeepBeepMeep/Wan2GP](https://github.com/deepbeepmeep/WanGP). La licence de l'original se trouve sur [GitHub](https://github.com/Square-Zero-Labs/Wan2GP-on-Kaggle/blob/main/LICENSE).

