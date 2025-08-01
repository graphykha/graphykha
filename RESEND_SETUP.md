# Configuration Resend pour Graphykha

## 🚀 Installation et Configuration

### 1. Créer un compte Resend
1. Allez sur [resend.com](https://resend.com)
2. Créez un compte gratuit
3. Vérifiez votre domaine `graphykha.fr`

### 2. Obtenir la clé API
1. Dans le dashboard Resend, allez dans "API Keys"
2. Créez une nouvelle clé API
3. Copiez la clé (elle commence par `re_`)

### 3. Configuration Vercel
1. Allez sur [vercel.com](https://vercel.com)
2. Connectez votre dépôt GitHub
3. Dans les paramètres du projet, ajoutez la variable d'environnement :
   - **Nom** : `RESEND_API_KEY`
   - **Valeur** : Votre clé API Resend

### 4. Déploiement
```bash
# Installer les dépendances
npm install

# Déployer sur Vercel
vercel --prod
```

## 📧 Fonctionnalités

### Email reçu par Graphykha
- Nom et email du client
- Type de projet
- Budget et délai
- Description détaillée
- Possibilité de répondre directement

### Email de confirmation au client
- Accusé de réception automatique
- Récapitulatif de la demande
- Informations de contact

## 🔧 Structure des fichiers

```
├── api/
│   └── contact.js          # Endpoint API pour l'envoi d'emails
├── package.json            # Dépendances (Resend)
├── vercel.json            # Configuration Vercel
└── script.js              # JavaScript frontend modifié
```

## ✅ Avantages de Resend

- **Gratuit** : 100 emails/jour
- **Fiabilité** : 99.9% de délivrabilité
- **Simplicité** : API simple et moderne
- **Support** : Excellente documentation
- **Sécurité** : Chiffrement TLS

## 🐛 Dépannage

### Erreur 500
- Vérifiez que la clé API est correcte
- Vérifiez que le domaine est vérifié dans Resend

### Emails non reçus
- Vérifiez les logs dans Vercel
- Vérifiez le dossier spam
- Testez avec une adresse email différente

## 📞 Support

Pour toute question, contactez Graphykha directement. 