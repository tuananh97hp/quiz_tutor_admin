FROM node:21-alpine3.18

WORKDIR /app

COPY .env.example .env

RUN yarn install

EXPOSE 3000
