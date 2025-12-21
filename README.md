# Kenneth's Portfolio

This is a web revamp project of my [Previous Portfolio](https://github.com/kwwong1022/kw-portfolio-web) created using ejs. This project was bootstrapped with [Vite](https://github.com/facebook/create-react-app).

Website available on: [https://www.kwwdev.com/](https://vite.dev/)


## How to setup

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
