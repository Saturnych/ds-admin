FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm i
COPY . .
RUN npm run build
RUN npm prune --production
#EXPOSE 8000
ENV NODE_ENV=production
CMD [ "node", "build" ]
