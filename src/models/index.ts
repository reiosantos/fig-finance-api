import ModelFactory from "@san/models/model.factory";
import { Model } from "mongoose";

class MongoWrapper extends Model {
  static getModel(name: string) {
    const model = ModelFactory.getModel(name);
    Object.assign(this, model);
    return this;
  }
}

export default MongoWrapper;
