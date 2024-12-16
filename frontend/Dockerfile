# Build Stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

























#
#FROM node:alpine AS builder
#
#
#ENV NODE_ENV production
#
#
#WORKDIR /app
#
#
#COPY ./package.json ./
#RUN npm install
#
#
#COPY . .
#
#
#RUN npm run build
#
#
#FROM nginx
#
#
#COPY --from=builder /app/build /usr/share/nginx/html
#
#
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#
#
#CMD ["npm","start"]