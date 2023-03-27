FROM alpine:latest
# INSTALL NODE in alpine
RUN apk add --update nodejs npm
# Copy package dependencies
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
# Install dependencies
WORKDIR /app
RUN npm install

# Copy app
COPY . /app
# Run app
ENTRYPOINT ["npm","run","start"]
