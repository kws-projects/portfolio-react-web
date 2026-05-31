FROM node:22.22.3-alpine3.22

WORKDIR /app

RUN npm i -g serve

COPY dist ./dist

EXPOSE 3000

CMD ["serve", "-n", "-s", "dist", "-l", "3000"]