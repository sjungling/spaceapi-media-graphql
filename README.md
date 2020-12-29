# SpaceAPI - Media Service

This is a GraphQL service that is apart of the [federated SpaceAPI](https://graph.spaceapi.dev) graph.

This focuses on providing media assets data about NASA's Apollo space program from the [NASA Image and Video Library](https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf)

## Requirements

- [Netlify](https://netlify.com) Account

## Running Locally

```shell
yarn install
yarn start
```

and then view GraphQL Playground at http://localhost:8888/graphql

## Deployments

This project is configured for deployment as a serverless function on [Netlify](https://netlify.com)

## Associated Projects

This project leverages a small constellation of federated GraphQL services that are made available through an Apollo Gateway (https://graph.spaceapi.dev).

- [space-api](https://github.com/sjungling/space-api)
- [spaceapi-gateway-graphql](https://github.com/sjungling/spaceapi-gateway-graphql)
- [spaceapi-missions-graphql](https://github.com/sjungling/spaceapi-missions-graphql)
