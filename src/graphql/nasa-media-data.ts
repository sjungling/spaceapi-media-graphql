import { RESTDataSource } from "apollo-datasource-rest";
export default class NasaMediaAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `https://images-api.nasa.gov/`;
  }

  async getMediaAssetByNasaId(id) {
    const data = this.get(`search`, {
      nasa_id: id,
    });
    return data;
  }
  async searchMedia(query) {
    const data = this.get(`search`, {
      q: query,
      media_type: "image",
    });
    return data;
  }
}
