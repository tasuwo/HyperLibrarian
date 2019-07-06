import { Volume } from "../entity/Volume";

export interface VolumeRepository {
  fetchByName(name: string): Promise<Volume[]>;
}
