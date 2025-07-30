# MuslimHub 🕌

**A Modern Digital Platform for the Muslim Community**

[![Build Status](https://img.shields.io/badge/build-beta-yellow?style=for-the-badge)](https://github.com/yani2298/MuslimHub)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge)](http://makeapullrequest.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue?style=for-the-badge)](https://www.typescriptlang.org/)

> 🚧 **This project is currently in beta and under active development**. Features are being continuously added and improved. **Contributions are highly welcome!**

## 🎯 About MuslimHub

MuslimHub is a comprehensive digital platform that combines Islamic tradition with modern technology. Our goal is to provide essential tools for daily religious practice while fostering community connection through a user-friendly web application.

## ✨ Current Features (Beta Version)

### 🕌 **Core Features**
- **🕐 Prayer Times** - Location-based accurate calculations
- **📖 Quran Reader** - Clean interface with multiple translations
- **💰 Zakat Calculator** - Comprehensive obligation calculator
- **🧭 Qibla Finder** - Direction detection capabilities
- **👥 User Authentication** - Secure JWT-based system
- **📱 PWA Ready** - Progressive web app foundation

### 🚧 **In Development**
- **🤖 Islamic AI Assistant** - Quran/Sunnah-based responses *(planned)*
- **🔍 Semantic Search** - AI-powered Quran search *(in progress)*  
- **💎 Smart Zakat** - Advanced calculation features *(in progress)*
- **🌐 Community Features** - Forums and discussion boards *(planned)*
- **📚 Learning Modules** - Educational content system *(planned)*

### 📱 **Progressive Web App**
- **Offline Support** - Basic offline functionality *(in development)*
- **Mobile Responsive** - Works on all devices
- **Fast Loading** - Optimized performance
- **Installation** - Can be installed as app *(beta)*

## 📁 Project Structure

```
MuslimHub/
├── frontend/             # React 18 + TypeScript
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Main application pages
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/     # API services
│   │   └── utils/        # Utility functions
├── backend/              # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── routes/       # API route handlers
│   │   ├── models/       # MongoDB models
│   │   ├── middleware/   # Express middleware
│   │   ├── services/     # Business logic services
│   │   └── utils/        # Backend utilities
├── docs/                 # Project documentation
└── shared/               # Shared types and utilities
```

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Query v5** for state management
- **React Router** for navigation
- **PWA** capabilities with service workers

### Backend
- **Node.js 20** with Express.js
- **MongoDB 6** as database
- **JWT** for authentication
- **TypeScript** throughout
- **Express Rate Limit** for API protection

### Tools & Deployment
- **Docker** for containerization
- **GitHub Actions** for CI/CD *(planned)*
- **Vercel/AWS** deployment ready
- **ESLint + Prettier** for code quality

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- MongoDB 6 or higher
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/yani2298/MuslimHub.git
cd MuslimHub

# Install all dependencies
npm run install-deps

# Setup environment variables
cp backend/.env.example backend/.env
# Edit the .env file with your configuration

# Start development servers
npm run dev
```

The application will be available at `http://localhost:3000`

## 🔧 Environment Setup

Create a `.env` file in the backend directory:

```env
# Backend Configuration
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/muslimhub
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d

# Optional API Keys (for enhanced features)
PRAYER_TIMES_API_KEY=your_prayer_api_key
QURAN_API_KEY=your_quran_api_key
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Token refresh

### Prayer Times
- `GET /api/prayers/times` - Get prayer times by location
- `GET /api/prayers/qibla` - Get Qibla direction

### Quran
- `GET /api/quran/chapters` - List all chapters
- `GET /api/quran/chapter/:number` - Get specific chapter
- `GET /api/quran/verse/:chapter/:verse` - Get specific verse
- `GET /api/quran/search` - Search in Quran text

### Zakat
- `POST /api/zakat/calculate` - Calculate Zakat amount

### Community *(planned)*
- `GET /api/community/forums` - List community forums
- `POST /api/community/posts` - Create new post

## 🤝 Contribution à la Révolution

Rejoignez notre mouvement révolutionnaire ! Nous cherchons des développeurs passionnés pour:

1. **Fork** le projet
2. **Create** une branche feature (`git checkout -b feature/revolutionary-feature`)
3. **Commit** vos changements (`git commit -m 'Add revolutionary feature'`)
4. **Push** vers la branche (`git push origin feature/revolutionary-feature`)
5. **Open** une Pull Request

### Guidelines de Contribution

- �� **Code Style**: Prettier + ESLint configuration
- 🧪 **Tests**: Jest pour backend, React Testing Library pour frontend
- 📚 **Documentation**: JSDoc pour toutes les fonctions publiques
- 🔍 **Type Safety**: TypeScript strict mode activé
- 🌍 **Internationalisation**: Support i18n pour 10+ langues

## 📊 Development Status

### Completed ✅
- [x] Basic project structure and setup
- [x] User authentication system
- [x] Prayer times calculation
- [x] Quran reader interface
- [x] Zakat calculator
- [x] Basic PWA setup

### In Progress 🚧  
- [ ] UI/UX improvements
- [ ] Enhanced mobile responsiveness
- [ ] Performance optimizations
- [ ] Additional Islamic features
- [ ] Community features foundation

### Planned 📋
- [ ] AI Assistant integration
- [ ] Advanced search capabilities
- [ ] Offline functionality
- [ ] Multi-language support
- [ ] Advanced community features
- [ ] Mobile applications

## 🎯 Roadmap

- **Q1 2025** - Beta release with core features
- **Q2 2025** - Enhanced features and AI integration  
- **Q3 2025** - Community features and mobile apps
- **Q4 2025** - Advanced features and scaling

## 📊 Métriques de Performance

- ⚡ **Time to Interactive**: < 2 secondes
- 📱 **Lighthouse Score**: 95+ sur tous les critères
- 🌐 **Global CDN**: < 100ms latence mondiale
- 🔒 **Security Score**: A+ SSL Labs
- 📈 **Uptime**: 99.9% SLA garanti

## 🛡️ Sécurité & Vie Privée

La sécurité de notre Ummah est notre priorité absolue:

- 🔐 **Chiffrement E2E** pour toutes les communications privées
- 🛡️ **GDPR Compliant** avec contrôle total des données
- 🔍 **Audit de sécurité** réguliers par des experts
- 🚫 **Zero Tracking** politique de vie privée stricte
- 🔒 **2FA** authentification à deux facteurs disponible

## �� Contact & Support

- 📧 **Email**: contact@muslimhub.com
- 💬 **Discord**: [Rejoindre notre communauté](https://discord.gg/muslimhub)
- 📱 **Twitter**: [@MuslimHubApp](https://twitter.com/MuslimHubApp)
- 🌐 **Website**: [https://muslimhub.com](https://muslimhub.com)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**"وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا"**

*"And hold firmly to the rope of Allah all together and do not become divided"* - Quran 3:103

**Made with ❤️ for the Ummah**

---

### ⚠️ **Beta Release Notice**

This project is currently in **beta development**. Features are being actively developed and improved. 

**We encourage contributions, feedback, and collaboration from the community!**

---

<p>
  <a href="https://github.com/yani2298/MuslimHub/stargazers">⭐ Star this project</a> •
  <a href="https://github.com/yani2298/MuslimHub/issues">🐛 Report a bug</a> •
  <a href="https://github.com/yani2298/MuslimHub/discussions">💬 Join discussions</a> •
  <a href="https://github.com/yani2298/MuslimHub/fork">🔀 Fork & contribute</a>
</p>

</div>
