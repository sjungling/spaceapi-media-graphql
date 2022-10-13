import { ApolloServer } from "apollo-server-lambda";
import { buildSubgraphSchema } from "@apollo/federation";
import NasaMediaAPI from "./nasa-media-data";
import { NasaMediaResolvers } from "./nasa-media-resolver";
import NasaMediaSchema from "./nasa-media-schema.graphql";

const schemaWithResolvers = buildSubgraphSchema({
  typeDefs: NasaMediaSchema,
  resolvers: NasaMediaResolvers,
});

const server = new ApolloServer({
  schema: schemaWithResolvers,
  dataSources: () => ({
    nasa: new NasaMediaAPI(),
  }),
});

export const handler = server.createHandler({
  expressGetMiddlewareOptions: {
    cors: {
      origin: "*",
      methods: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
      allowedHeaders: "*",
      credentials: true,
    },
  },
});
