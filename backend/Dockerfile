# Usa l'immagine base ufficiale di Node.js
FROM node:18

# Imposta la directory di lavoro all'interno del container
WORKDIR /usr/src/app

# Copia il package.json e il package-lock.json nella directory di lavoro
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia tutti i file della tua applicazione nella directory di lavoro del container
COPY . .

# Espone la porta su cui il server ascolterà
EXPOSE 3000

# Definisci il comando per avviare l'applicazione
CMD ["npm", "start"]