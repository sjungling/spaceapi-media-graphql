import { ApolloServer } from "apollo-server-lambda";
import { buildFederatedSchema } from "@apollo/federation";

import NasaMediaAPI from "./nasa-media-data";
import { NasaMediaResolvers } from "./nasa-media-resolver";
import NasaMediaSchema from "./nasa-media-schema.graphql";

const schemaWithResolvers = buildFederatedSchema({
  typeDefs: NasaMediaSchema,
  resolvers: NasaMediaResolvers,
});

const server = new ApolloServer({
  schema: schemaWithResolvers,
  dataSources: () => ({
    nasa: new NasaMediaAPI(),
  }),
  playground: true,
  introspection: true,
  cacheControl: {
    defaultMaxAge: 60 * 60,
  },
});

export const handler = server.createHandler();
