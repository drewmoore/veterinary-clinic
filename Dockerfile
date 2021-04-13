FROM node:14.16.0-alpine3.13

ARG NODE_ENV

ENV NODE_ENV $NODE_ENV

WORKDIR /app

COPY . .

RUN npm ci --silent

ENTRYPOINT ["./entrypoint.sh"]
