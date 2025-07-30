# 🚀 **MuslimHub - Quick Start Guide**

Welcome to **MuslimHub**, the revolutionary platform transforming the digital Muslim experience! 🕌

**Ready in 5 minutes** - Professional Islamic platform with modern technology.

---

# Clone the revolutionary project
```bash
git clone https://github.com/yani2298/MuslimHub.git
cd MuslimHub
```

# Ultra-fast installation
```bash
npm run install-deps
```

# Launch development environment
```bash
npm run dev
```

🎉 **That's it!** Your platform is available at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

---

## 📋 **Prerequisites**

- **Node.js 18+** (Download: https://nodejs.org)
- **MongoDB 6+** (Local or MongoDB Atlas)
- **Git** (Download: https://git-scm.com)

---

## 🔧 **Environment Configuration**

Create `.env` files:

```bash
# Backend environment
cp backend/.env.example backend/.env

# Configure your variables
echo "MONGODB_URI=mongodb://localhost:27017/muslimhub" >> backend/.env
echo "JWT_SECRET=your-super-secret-key" >> backend/.env
```

---

## 🌟 **Revolutionary Features**

✅ **Prayer Times** - Accurate calculations by location  
✅ **Quran Reader** - Complete with audio recitation  
✅ **Zakat Calculator** - Automated Islamic finance  
✅ **Qibla Finder** - AR direction to Mecca  
✅ **Community Forum** - Connect with Muslims worldwide  
✅ **Islamic AI** - Smart Islamic assistant  

---

## 🛠️ **Available Commands**

```bash
# Development
npm run dev              # Launch frontend + backend
npm run dev:frontend     # Frontend only (React)
npm run dev:backend      # Backend only (Node.js)

# Production
npm run build           # Build for production
npm run start           # Start production server

# Tests
npm run test            # Run all tests
```

---

### 💰 **Revolutionary Zakat Calculator**

Advanced calculator with:
- **Automatic rates** according to Islamic law
- **Multi-currency** support  
- **Instant calculations**
- **Scholar validation**

---

## 🚀 **Deployment**

### Docker (Recommended)
```bash
docker-compose up -d
```

### Manual Deployment
```bash
npm run build
npm run start
```

---

## 🤝 **Support & Community**

- 📖 **Documentation**: [GitHub Wiki](https://github.com/yani2298/MuslimHub/wiki)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/yani2298/MuslimHub/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yani2298/MuslimHub/discussions)

---

**🌟 Ready to transform the digital Islamic experience? Let's build together!**
