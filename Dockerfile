FROM node:20.14.0-alpine3.19

WORKDIR /app

RUN npm i -g serve

COPY build ./build

EXPOSE 3000

CMD ["serve", "-n", "-s", "build", "-l", "3000"]