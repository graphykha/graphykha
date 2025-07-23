# 🚀 Déploiement Graphykha sur Vercel

## Prérequis
- Compte GitHub (gratuit)
- Compte Vercel (gratuit)

## 📋 Étapes de déploiement

### 1. Créer un repository GitHub
1. Aller sur [github.com](https://github.com) et se connecter
2. Cliquer "New repository"
3. Nom : `graphykha-website`
4. Sélectionner "Public" ou "Private"
5. Cliquer "Create repository"

### 2. Uploader les fichiers
1. Dans le nouveau repository, cliquer "uploading an existing file"
2. Glisser-déposer TOUS les fichiers du site :
   - index.html
   - style.css
   - script.js
   - mentions-legales.html
   - politique-confidentialite.html
   - thank-you.html
   - vercel.json
   - robots.txt
   - sitemap.xml
   - logo-gk.svg
   - favicon.ico
   - Dossier `image/` complet
   - Dossier `portfolio/` complet

### 3. Connecter à Vercel
1. Aller sur [vercel.com](https://vercel.com)
2. "Sign up" avec votre compte GitHub
3. Cliquer "Import Project"
4. Sélectionner votre repository `graphykha-website`
5. **Paramètres importants :**
   - Framework Preset: "Other"
   - Root Directory: `./` (par défaut)
   - Build Command: (laisser vide)
   - Output Directory: (laisser vide)

### 4. Configuration du domaine
1. Une fois déployé, Vercel donne une URL : `graphykha-website.vercel.app`
2. Pour un domaine personnalisé :
   - Aller dans "Settings" > "Domains"
   - Ajouter `graphykha.fr`
   - Suivre les instructions DNS

## 🔧 Fichiers de configuration inclus

### `vercel.json`
- URLs propres (sans .html)
- Headers de sécurité
- Redirections automatiques
- Cache optimisé

### `robots.txt`
- Optimisé pour le SEO
- Référence au sitemap

### `sitemap.xml`
- Plan du site complet
- Images référencées
- Dates de modification

## 📊 Après déploiement

### Vérifications
- [ ] Site accessible sur l'URL Vercel
- [ ] Formulaire de contact fonctionne
- [ ] Images s'affichent correctement
- [ ] Version mobile optimisée
- [ ] Mentions légales complètes

### Analytics (optionnel)
1. Dans Vercel : "Analytics" > "Enable"
2. Google Analytics : ajouter le tracking ID dans `index.html`

## 🌐 URL finale
Votre site sera accessible sur :
- URL temporaire : `https://graphykha-website.vercel.app`
- Domaine personnalisé : `https://graphykha.fr` (après configuration DNS)

## 📞 Support
- Documentation Vercel : [vercel.com/docs](https://vercel.com/docs)
- En cas de problème : vérifier les logs dans le dashboard Vercel

## ✅ Avantages Vercel
- ⚡ Déploiement instantané
- 🌍 CDN mondial
- 📱 HTTPS automatique
- 🔄 Mises à jour automatiques via Git
- 📊 Analytics intégrés
- 💰 Plan gratuit généreux 