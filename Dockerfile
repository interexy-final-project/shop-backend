FROM node:18.16.1

WORKDIR /app/nodejs

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .
EXPOSE 5000

CMD [ "npm", "start" ]