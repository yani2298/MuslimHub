# Contributing Guidelines

Thank you for your interest in contributing! 🎉

## Code of Conduct

By participating, you agree to uphold our [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting Started

### Prerequisites
- Node.js ≥ 18.0.0
- npm ≥ 9.0.0
- Git

### Setup
```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/REPO_NAME.git
cd REPO_NAME

# 3. Install dependencies
npm install

# 4. Copy environment variables
cp .env.example .env.local

# 5. Start development server
npm run dev
```

## Development Workflow

### Branch Naming
```
feature/short-description    → New features
fix/short-description        → Bug fixes
docs/short-description       → Documentation
chore/short-description      → Maintenance tasks
refactor/short-description   → Code refactoring
```

### Commit Messages (Conventional Commits)
```
feat(scope): add new prayer time calculation
fix(ui): resolve mobile navigation overflow
docs: update API usage examples
chore(deps): upgrade React to 18.3.0
```

### Running Tests
```bash
npm test              # Unit tests
npm run test:e2e      # End-to-end tests
npm run test:coverage # Coverage report
```

## Pull Request Process

1. Ensure tests pass locally: `npm test`
2. Update documentation if needed
3. Fill out the PR template completely
4. Request review from a maintainer
5. Address review comments promptly

## Code Style

- Follow the existing code patterns
- ESLint config: `npm run lint`
- Prettier format: `npm run format`
- TypeScript strict mode must pass

## Questions?

Open a [Discussion](../../discussions) for questions or feature proposals.
