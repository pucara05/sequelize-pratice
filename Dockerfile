# Usar una imagen base de Node
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todos los archivos de la carpeta src
COPY . .

# Instala nodemon de forma global
RUN npm install -g nodemon

# Exponer el puerto si es necesario
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["nodemon", "src/server.js"]
