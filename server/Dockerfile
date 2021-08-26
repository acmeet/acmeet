FROM node:14.15.3

WORKDIR /app
COPY package.json ./

COPY . .
RUN yarn
RUN yarn build

EXPOSE 8080
CMD [ "node", "build/index.js" ]