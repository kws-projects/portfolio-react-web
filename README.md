# Getting Started with Create React App

This is a web revamp project of my [Previous Portfolio](https://github.com/kwwong1022/kw-portfolio-web) created using ejs. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Website available on: [https://www.kwwdev.com/](https://www.kwwdev.com/)


## Project Setup

In case if you want to run this project on your local machine, follow the instructions below:

1. Make sure you have **node.js** installed on your machine, with **version >= 20.11.1**.

2. Clone this repository using git clone command:<br>
   ```git clone https://github.com/kwwong1022/portfolio-react-web.git```
   
4. Open the project repository using any code editor you like.
   From the project root directory, create environment variable files - **i) .env.development.local** **ii) .env.production.local**<br>
   ```touch .env.development.local && touch .env.production.local```
   
5. Add content below to the .env.development.local & touch .env.production.local files:
    ```
    # .env.development.local
    ENV="DEV"
    BUILD_VERSION_NO="x.x.x"                                  # for pulling docker image
    REACT_APP_GA_MEASUREMENT_ID="G-XXXXXXXXXX"                # for GA tracker, remove it if you don't have it
    REACT_APP_SENTRY_DSN="https://xxxxxxxxxx"                 # for sentry monitoring, remove it if you don't have it
    DOCKER_REACT_WEB_REGISTRY="My React Web Registry"         # replace with your own
    DOCKER_REACT_WEB_CONTAINER_NAME="my-react-web-container"  # replace with your own
    DOCKER_REACT_WEB_PORT_BINDING="80:3000"                   # replace with your own
    ```

    ```
    # .env.production.local
    ENV="PROD"
    BUILD_VERSION_NO="x.x.x"                                  # for pulling docker image
    REACT_APP_GA_MEASUREMENT_ID="G-XXXXXXXXXX"                # for GA tracker, remove it if you don't have it
    REACT_APP_SENTRY_DSN="https://xxxxxxxxxx"                 # for sentry monitoring, remove it if you don't have it
    DOCKER_REACT_WEB_REGISTRY="My React Web Registry"         # replace with your own
    DOCKER_REACT_WEB_CONTAINER_NAME="my-react-web-container"  # replace with your own
    DOCKER_REACT_WEB_PORT_BINDING="80:3000"                   # replace with your own
    ```

6. Create .env file from the existing **.env.development.local** or **.env.production.local**<br>
   ```cp .env.development.local .env```

7. Install the required packages from **package.json**:<br>
   ```npm install```

8. After installing all required packages, run command below to host website locally:<br>
   ```npm run start:dev```
   
   If you don't have **REACT_APP_GA_MEADUREMENT_ID** or **REACT_APP_SENTRY_DSN** included, you may encounter error while running this command.
   
   If this happened, open **src/index.tsx** then comment out both **ReactGA.initialize()** and **Sentry.init()** functions.
