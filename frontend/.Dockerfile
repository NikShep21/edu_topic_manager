FROM node:22.22-slim
WORKIDR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm" "run" "start"]