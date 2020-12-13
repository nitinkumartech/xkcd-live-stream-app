# Stage 1
FROM node:10-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm i rxjs-compat --save npm i ng2-completer --save
RUN npm install
COPY . /app
RUN npm run build --configuration=production

# Stage 2
FROM nginx:latest
COPY nginx.conf /etc/nginx/
COPY --from=build-step /app/dist /usr/share/nginx/html
EXPOSE 9080
CMD ["nginx", "-g", "daemon off;"]