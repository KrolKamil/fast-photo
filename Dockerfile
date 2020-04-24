FROM node:12.10.0
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 3000
CMD ["npm", "build"]
CMD ["npm", "start"]