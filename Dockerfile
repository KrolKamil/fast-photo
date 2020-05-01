# FROM node:12.10.0
# WORKDIR /app
# COPY package.json /app
# RUN npm install
# COPY . /app
# EXPOSE 3000
# CMD ["npm", "build"]
# CMD ["npm", "start"]

FROM node:12.10.0
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
WORKDIR ./dist
EXPOSE 3000
CMD npm run start