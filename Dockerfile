FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm i
RUN npm prune --production
#EXPOSE 3000
ENV NODE_ENV=production
CMD [ "npm", "run", "start" ]
