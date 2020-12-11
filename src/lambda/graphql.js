import { ApolloServer } from "apollo-server-lambda";
import NasaMediaAPI from "./sources/nasa-media";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import { join } from "path";
import { NasaMediaResolvers } from "./schema/nasa-media.resolver";

// Add resolvers to the schema
const schemaWithResolvers = addResolversToSchema({
  schema: loadSchemaSync(
    join("src", "lambda", "schema", "./nasa-media.graphql"),
    {
      loaders: [new GraphQLFileLoader()],
    }
  ),
  resolvers: NasaMediaResolvers,
});
const server = new ApolloServer({
  schema: schemaWithResolvers,
  dataSources: () => ({
    nasa: new NasaMediaAPI(),
  }),
});

export const handler = server.createHandler();
