import { VolumeRepository } from "../domain/repository/VolumeRepository";
import { PagedListImpl } from "../domain/valueObject/PagedList";
import { VolumeDataSource } from "./VolumeDataSource";

export const VolumeRepositoryImpl: VolumeRepository = {
  fetchByName: (name: string, perPage: number = 10) => {
    return new PagedListImpl({ pageSize: perPage }, new VolumeDataSource(name));
  }
};
