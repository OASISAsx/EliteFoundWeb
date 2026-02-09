FROM node:20-alpine

RUN apk add --no-cache git openssh

WORKDIR /app

# install deps
COPY package*.json ./
RUN npm install

# copy source
COPY . .

# build for production
RUN npm run build

# Next.js default port
EXPOSE 3000

# start production server
CMD ["npm", "run", "start"]
