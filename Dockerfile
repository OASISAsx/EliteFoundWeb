FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# ✅ แก้ permission ให้ next
RUN chmod +x node_modules/.bin/next

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
