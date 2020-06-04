## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
FROM us.icr.io/wit-hack/wit-hackathon-ui:dev
COPY /dist /app
COPY nginx.conf /usr/local/nginx/html
