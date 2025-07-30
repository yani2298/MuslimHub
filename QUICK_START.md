# 🚀 MuslimHub - Guide de Démarrage Rapide

Bienvenue dans **MuslimHub**, la plateforme révolutionnaire qui transforme l'expérience numérique musulmane ! 🕌

## ⚡ Installation Ultra-Rapide

### Option 1: Démarrage en Une Commande (Recommandé)

```bash
# Clone du projet révolutionnaire
git clone https://github.com/muslimhub/muslimhub.git
cd muslimhub

# Installation complète des dépendances
npm run install-deps

# Démarrage en mode développement
npm run dev
```

✨ **C'est tout !** Votre révolution numérique est maintenant accessible sur:
- 🎨 **Frontend**: http://localhost:3000
- ⚡ **Backend API**: http://localhost:5000

### Option 2: Docker (Production Ready)

```bash
# Avec Docker Compose (infrastructure complète)
docker-compose up -d

# Accès à l'application
open http://localhost:3000
```

## 🔧 Configuration Initiale

### 1. Variables d'Environnement

Copiez et configurez vos variables d'environnement:

```bash
# Backend
cp backend/.env.example backend/.env

# Modifiez selon vos besoins:
# - MongoDB URI
# - JWT Secret
# - API Keys pour services islamiques
```

### 2. Base de Données

**MongoDB** (développement local):
```bash
# Installation avec Homebrew (macOS)
brew install mongodb-community
brew services start mongodb/brew/mongodb-community

# Ou avec Docker
docker run -d -p 27017:27017 --name mongodb mongo:6
```

## 🌟 Fonctionnalités Révolutionnaires

### 🕌 Calculs de Prières Ultra-Précis
- **15+ méthodes de calcul** (MWL, ISNA, Égypte, Mecque, etc.)
- **Géolocalisation automatique** avec corrections astronomiques
- **Notifications intelligentes** avec respect des préférences

### 📖 Lecteur Coran Intelligent
- **50+ traductions** dans toutes les langues
- **Recherche sémantique IA** pour trouver n'importe quel verset
- **Audio HD** avec 10+ récitateurs célèbres
- **Mode hors ligne** complet

### 💰 Calculateur Zakat Révolutionnaire
- **Support cryptomonnaies** (Bitcoin, Ethereum, etc.)
- **Toutes les méthodologies** islamiques
- **Taux en temps réel** des métaux précieux
- **Historique des calculs** et rappels automatiques

### 🤖 Assistant IA Islamique
- **Réponses basées sur le Coran et la Sunna**
- **Recherche dans les Hadiths** avec authentification
- **Conseils spirituels personnalisés**
- **Apprentissage interactif** de l'arabe

### 🌍 Communauté Globale
- **Forums thématiques** modérés
- **Événements géolocalisés** (iftars, conférences)
- **Groupes locaux** par mosquée/région
- **Messagerie halal** avec modération IA

## 📱 Progressive Web App (PWA)

MuslimHub fonctionne **complètement hors ligne** !

### Installation sur Mobile/Desktop:

1. **Mobile**: Ouvrez dans Safari/Chrome → "Ajouter à l'écran d'accueil"
2. **Desktop**: Chrome → Menu → "Installer MuslimHub"

## 🛠️ Développement

### Structure du Projet

```
MuslimHub/
├── 🎨 frontend/          # React 18 + TypeScript + Tailwind
│   ├── src/
│   │   ├── components/   # Composants réutilisables
│   │   ├── pages/        # Pages principales
│   │   ├── hooks/        # Hooks personnalisés
│   │   └── services/     # API et services
├── ⚡ backend/           # Node.js + Express + MongoDB
│   ├── src/
│   │   ├── routes/       # Endpoints API
│   │   ├── models/       # Modèles MongoDB
│   │   ├── controllers/  # Logique métier
│   │   └── middleware/   # Authentification, etc.
├── 🐳 Docker/           # Configuration déploiement
└── 📚 docs/             # Documentation complète
```

### Scripts de Développement

```bash
# Backend
cd backend
npm run dev          # Démarrage avec hot-reload
npm run build        # Build production
npm run test         # Tests unitaires
npm run type-check   # Vérification TypeScript

# Frontend
cd frontend
npm start            # Démarrage développement
npm run build        # Build optimisé
npm run test         # Tests React
npm run storybook    # Design system

# Global
npm run dev          # Backend + Frontend simultanément
npm run build        # Build complet
npm run test         # Tests complets
```

## 🔒 Sécurité & Vie Privée

MuslimHub respecte **strictement** la vie privée de la Ummah:

- 🔐 **Chiffrement E2E** pour toutes communications
- 🛡️ **GDPR Compliant** avec contrôle total des données
- 🚫 **Zero Tracking** - aucune donnée vendue
- 🔒 **2FA disponible** pour sécurité maximale
- 🕌 **Développé par des musulmans** pour des musulmans

## 🌐 API Documentation

L'API MuslimHub est **RESTful** et **publique** !

**Base URL**: `http://localhost:5000/api`

### Endpoints Principaux:

```bash
# Authentification
POST /auth/register     # Inscription
POST /auth/login        # Connexion
GET  /auth/me          # Profil utilisateur

# Prières
GET  /prayers/times     # Horaires de prières
GET  /prayers/qibla     # Direction Qibla
POST /prayers/track     # Suivi des prières

# Coran
GET  /quran/chapters    # Liste des sourates
GET  /quran/search      # Recherche dans le Coran
GET  /quran/random      # Verset aléatoire

# Zakat
POST /zakat/calculate   # Calcul Zakat
GET  /zakat/nisab      # Valeurs Nisab actuelles
GET  /zakat/crypto-rates # Taux cryptomonnaies

# Communauté
GET  /community/forums  # Forums
GET  /community/events  # Événements
GET  /community/nearby  # Mosquées à proximité
```

**Documentation complète**: http://localhost:5000/docs

## 🚀 Déploiement Production

### Option 1: Vercel + MongoDB Atlas (Recommandé)

```bash
# Installation Vercel CLI
npm i -g vercel

# Déploiement frontend
cd frontend && vercel --prod

# Configuration backend sur Vercel
cd backend && vercel --prod
```

### Option 2: AWS/DigitalOcean

```bash
# Build pour production
npm run build

# Docker deployment
docker build -t muslimhub .
docker run -p 80:3000 -p 5000:5000 muslimhub
```

### Option 3: Kubernetes

```bash
# Application des manifests K8s
kubectl apply -f k8s/

# Vérification du déploiement
kubectl get pods -l app=muslimhub
```

## 🤝 Contribution à la Révolution

Rejoignez notre mouvement ! Nous cherchons:

- 💻 **Développeurs** React/Node.js/Python
- 🎨 **Designers UI/UX** pour embellir l'interface
- 📚 **Traducteurs** pour internationalisation
- 🕌 **Érudits islamiques** pour validation du contenu
- 🧪 **Testeurs** pour assurer la qualité

### Comment Contribuer:

1. **Fork** le projet
2. **Create** une branche (`git checkout -b feature/revolutionary-feature`)
3. **Commit** (`git commit -m 'Add amazing feature'`)
4. **Push** (`git push origin feature/revolutionary-feature`)
5. **Open** une Pull Request

## 📞 Support & Communauté

- 📧 **Email**: support@muslimhub.com
- 💬 **Discord**: [Rejoindre](https://discord.gg/muslimhub)
- 📱 **Twitter**: [@MuslimHubApp](https://twitter.com/MuslimHubApp)
- 🌐 **Site**: [muslimhub.com](https://muslimhub.com)

## 🎯 Roadmap 2024

- ✅ **Q1**: Foundation complète
- 🚧 **Q2**: IA Assistant + AR Qibla
- 📅 **Q3**: Blockchain donations + ML personnalisation
- 🌟 **Q4**: API publique + Mobile apps natives

## 📄 Licence

**MIT License** - Utilisez, modifiez, et distribuez librement !

---

**"إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ"**  
*"Les actions ne valent que par les intentions"* - Hadith

Fait avec ❤️ pour la Ummah mondiale  
**Barakallahu feekum** 🤲

---

⭐ **N'oubliez pas de donner une étoile sur GitHub !** ⭐
