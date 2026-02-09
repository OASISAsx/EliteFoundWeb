FROM node:20-alpine

# ติดตั้ง dependency ที่จำเป็น
RUN apk add --no-cache git openssh

WORKDIR /app

# copy เฉพาะไฟล์ที่จำเป็นก่อน (cache ดี)
COPY package*.json ./

RUN npm install

# copy source ทั้งหมด
COPY . .

# build app (เช่น Next.js / Vite)
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
