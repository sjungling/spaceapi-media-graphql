import { ApolloServer, makeExecutableSchema } from "apollo-server-lambda";
import NasaMediaAPI from "./nasa-media-data";
import { NasaMediaResolvers } from "./nasa-media-resolver";
import NasaMediaSchema from "./nasa-media-schema.graphql";

const schemaWithResolvers = makeExecutableSchema({
  typeDefs: NasaMediaSchema,
  resolvers: NasaMediaResolvers,
});

const server = new ApolloServer({
  schema: schemaWithResolvers,
  dataSources: () => ({
    nasa: new NasaMediaAPI(),
  }),
  cacheControl: {
    defaultMaxAge: 60 * 60,
  },
});

export const handler = server.createHandler();
