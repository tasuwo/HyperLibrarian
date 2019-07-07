import { Volume } from "../entity/Volume";
import { PagedList } from "../valueObject/PagedList";

export interface VolumeRepository {
  fetchByName(name: string): PagedList<Volume>;
}
