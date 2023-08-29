from node:18

workdir /app
copy package.json .
run npm i

copy . .

cmd npm run start:dev