FROM node:20.14.0-alpine3.19

WORKDIR /app

RUN npm i -g serve

COPY dist ./dist

EXPOSE 3000

CMD ["serve", "-n", "-s", "dist", "-l", "3000"]