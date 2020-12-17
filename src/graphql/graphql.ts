import { ApolloServer } from "apollo-server-lambda";
import { buildFederatedSchema } from "@apollo/federation";
import { ApolloServerPluginInlineTrace } from "apollo-server-core";
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
  plugins: [ApolloServerPluginInlineTrace()],
});

export const handler = server.createHandler({
  cors: {
    origin: "*",
    methods: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    allowedHeaders: "*",
    credentials: true,
  },
});
