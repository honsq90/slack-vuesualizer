FROM node:18-slim
ARG PORT=5000

WORKDIR /app

RUN rm -rf /var/cache/apk/*

COPY package*.json ./

RUN mkdir -p uploads/emojis
RUN mkdir -p uploads/attachments

RUN npm ci && npm cache clean --force

COPY . .

ENV NODE_ENV=${MODE}

EXPOSE ${PORT}

CMD ["node", "file-server.js"]
