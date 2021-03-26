# pull official base image
FROM node

# add `/app/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

# install app dependencies
WORKDIR ./frontend
RUN npm install -g increase-memory-limit
RUN npm install expo-cli -g --silent
COPY package.json ./
COPY package-lock.json ./
RUN npm install

ENV REACT_NATIVE_PACKAGER_HOSTNAME="10.0.0.2"

# start app
CMD ["expo", "start"]

