FROM node:20 AS build
ARG VITE_BACKEND_URL=https://blog-backend-8033512717.us-central1.run.app/api/v1
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build
FROM nginx AS final
WORKDIR /usr/share/nginx/html
COPY --from=build /build/dist .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]