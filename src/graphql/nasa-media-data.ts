import { RESTDataSource } from "apollo-datasource-rest";
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
  async searchMedia(query: String, media_type: String, limit: Number) {
    const data = await this.get(`search`, {
      q: query,
      media_type: media_type.toLowerCase(),
    });
    return data;
  }
  async getAssetByNasaId(nasa_id: String) {
    const data = await this.get(`asset/${nasa_id}`);
    return data;
  }
}
