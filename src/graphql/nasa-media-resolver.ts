import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import { Image, Resolvers } from "../@types/resolvers";
import { NasaResponse, NasaResponseItem } from "./nasa-media-data";

const formatImage = (image: NasaResponseItem): Partial<Image> => {
  try {
    const { href } = image.links[0];
    const { nasa_id: id, title, description, date_created } = image.data[0];
    return {
      id,
      href,
      title,
      description,
      created_at: date_created,
    };
  } catch (e) {
    console.error(e, image);
    return null;
  }
};
export const NasaMediaResolvers: Resolvers = {
  Query: {
    image: async (_parent, { id }, { dataSources }) => {
      const response: NasaResponse = await dataSources.nasa.getMediaAssetByNasaId(
        id
      );
      const result = formatImage(response.collection.items[0]);
      return result || null;
    },
    images: async (_parent, { query, type, limit }, { dataSources }) => {
      if (type === "AUDIO")
        throw new Error("Audio results are not yet supported");
      const response = await dataSources.nasa.searchMedia(query, type, limit);
      const results = response.collection.items
        .slice(0, limit ?? -1)
        .map((image) => formatImage(image))
        .filter(Boolean);
      return results || [];
    },
  },
  Image: {
    variations: async (parent, { variant }, { dataSources }) => {
      const response = await dataSources.nasa.getAssetByNasaId(parent.id);
      const { href } = response.collection.items
        .filter(({ href }) => href.indexOf(variant.toLowerCase()) > 0)
        .pop();
      return {
        id: [parent.id, variant].join("-"),
        href,
        variation: variant,
      };
    },
    __resolveReference: async (image, { dataSources }) => {
      const response = await dataSources.nasa.getAssetByNasaId(image.id);
      return response;
    },
  },
  Mission: {
    images: async ({ mission }, { media_type, limit }, { dataSources }) => {
      const response = await dataSources.nasa.searchMedia(mission, media_type);
      const results = response.collection.items
        .slice(0, limit ?? -1)
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
