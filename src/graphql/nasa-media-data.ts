import { RESTDataSource } from "apollo-datasource-rest";
import { Media_Type_Enum } from "../@types/resolvers";

export type NasaResponse = {
  collection: {
    items: [NasaResponseItem];
  };
};
export type NasaResponseItem = {
  links: [
    {
      href: string;
    }
  ];
  data: [
    {
      nasa_id: string;
      title: string;
      description: string;
      date_created: string;
    }
  ];
};

export default class NasaMediaAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `https://images-api.nasa.gov/`;
  }

  async getMediaAssetByNasaId(nasa_id: String) {
    const data = await this.get(`search`, {
      nasa_id,
    });
    return data;
  }
  async searchMedia(
    query: string,
    media_type: Media_Type_Enum,
    date_range?: { start: string; end: string }
  ) {
    let queryParameters = {
      q: query,
      media_type: media_type.toLowerCase(),
    };
    if (date_range) {
      queryParameters = Object.assign(queryParameters, {
        year_start: new Date(date_range.start).getFullYear(),
        year_end: new Date(date_range.end).getFullYear(),
      });
    }
    const data = await this.get(`search`, queryParameters);
    return data;
  }
  async getAssetByNasaId(nasa_id: String) {
    const data = await this.get(`asset/${nasa_id}`);
    return data;
  }
}
