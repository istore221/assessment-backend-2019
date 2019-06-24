FROM keymetrics/pm2:8

MAINTAINER A.L.K Thejitha "istore221@gmail.com"

WORKDIR /app

COPY . .

RUN npm install \
    && npm run release

WORKDIR /app/dist


CMD [ "pm2-runtime", "start", "pm2.cluster.config.js", "--env", "development" ]

EXPOSE 3000
