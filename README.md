# Kenneth's Portfolio

This is a web revamp project of my [Previous Portfolio](https://github.com/kwwong1022/kw-portfolio-web) created using ejs. This project was bootstrapped with [Vite](https://github.com/facebook/create-react-app).

Website available on: [https://www.kwwdev.com/](https://vite.dev/)


## Project Structure

```
src/
├── components/             # React components
│   ├── layout/             # App shell (Header, Footer, TerminalOverlay, Layout wrapper)
│   ├── sketches/           # p5.js sketches and generative art
│   └── ui/                 # Reusable UI primitives (Button, Card, Timeline, etc.)
├── config/                 # App configuration
├── constant/               # Constants and enums
├── data/                   # Static data (skills, work experience, contact, etc.)
├── hooks/                  # Custom React hooks
├── pages/                  # Route-level page components
├── services/               # External service integrations (GA4, API)
├── types/                  # TypeScript type definitions
└── utils/                  # Utilities
    ├── i18n/               # Internationalization setup
    │   ├── index.ts        # i18next config
    │   └── locales/        # Translation files (en, zh-TW, ja, ar)
    └── ...
```

## How to Setup

1. Make sure you have **node.js** and **nvm** installed on your machine, with **node version = `v22.21.1`**:<br>
   ```nvm use```

2. Clone this repository.
   
3. Copy `.env.example`, rename to `.env` and put into the root directory.

4. Install the required packages from **package.json**:<br>
   ```yarn```

5. After installing all required packages, run command below to host website locally:<br>
   ```yarn dev```


## Git Flow

1. Branch out feature branch from `main` branch.

2. Commit changes and create PR merge into `develop` branch.

3. Merge `develop` branch into `main` branch for production release.
