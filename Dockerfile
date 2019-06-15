FROM mhart/alpine-node:11 AS builder
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json

RUN npm install
RUN npm audit fix

COPY . /app
RUN yarn run build
#RUN yarn run prodbuild 
#eğer dev olacaksa üstü yorum yap
FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "3001", "-s", "."]

