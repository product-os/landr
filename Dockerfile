FROM balena/open-balena-base:no-systemd-master

# Install dependencies required to run puppeteer
RUN install_packages \
gconf-service \
libasound2 \
libatk1.0-0 \
libc6 \
libcairo2 \
libcups2 \
libdbus-1-3 \
libexpat1 \
libfontconfig1 \
libgcc1 \
libgconf-2-4 \
libgdk-pixbuf2.0-0 \
libglib2.0-0 \
libgtk-3-0 \
libnspr4 \
libpango-1.0-0 \
libpangocairo-1.0-0 \
libstdc++6 \
libx11-6 \
libx11-xcb1 \
libxcb1 \
libxcomposite1 \
libxcursor1 \
libxdamage1 \
libxext6 \
libxfixes3 \
libxi6 \
libxrandr2 \
libxrender1 \
libxss1 \
libxtst6 \
ca-certificates \
fonts-liberation \
libappindicator1 \
libnss3 \
lsb-release \
xdg-utils \
wget

# Defines our working directory in container
WORKDIR /usr/src/app

# Copies the package.json and package-lock.json first for better cache on later pushes
COPY package*.json ./

# Install NPM dependecies.
RUN JOBS=MAX npm ci --unsafe-perm && npm cache verify && rm -rf /tmp/*

# This will copy all files in our root to the working  directory in the container
COPY . ./

# Start the bot
EXPOSE 3000
CMD ["npm", "run", "bot:start"]
