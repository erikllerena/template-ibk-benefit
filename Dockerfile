### STAGE 1: Build ###
FROM node:12.19.0-stretch AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
### STAGE 2: Run ###
FROM nginx:1.19.3-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/app-onboarding /usr/share/nginx/html
