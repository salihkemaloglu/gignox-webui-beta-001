FROM mhart/alpine-node:11 AS builder
WORKDIR /app
COPY . .
RUN yarn run build
RUN yarn run prodbuild

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "80", "-s", "."]


