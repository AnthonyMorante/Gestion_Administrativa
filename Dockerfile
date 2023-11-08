
# FROM nginx:alpine
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY dist/ /usr/share/nginx/html 
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


# Stage 1
FROM nginx:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2
FROM nginx:1.13.12-alpine
COPY --from=node /usr/src/app/dist/gestion-administrativa /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf