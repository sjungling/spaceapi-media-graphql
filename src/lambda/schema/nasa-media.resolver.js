import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

const formatImage = (image) => {
  try {
    const { href: url } = image.links[0];
    const { nasa_id: id, title, description, date_created } = image.data[0];

    return {
      id,
      url,
      title,
      description,
      created_at: date_created,
    };
  } catch (e) {
    console.error(e, image);
    return null;
  }
};
export const NasaMediaResolvers = {
  Query: {
    image: async (_parent, { id }, { dataSources }) => {
      const response = await dataSources.nasa.getMediaAssetByNasaId(id);
      const result = formatImage(response.collection.items[0]);
      return result || null;
    },
    images: async (parent, { query }, { dataSources }) => {
      const response = await dataSources.nasa.searchMedia(query);
      const results = response.collection.items
        .map((image) => formatImage(image))
        .filter(Boolean);
      return results || [];
    },
  },
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      if (value instanceof Date) {
        return value.getTime();
      }
      return value;
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value);
      }
      return null;
    },
  }),
};
