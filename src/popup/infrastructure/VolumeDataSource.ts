import axios from "axios";
import { DataSource, LoadParams } from "../domain/valueObject/DataSource";
import { Volume, VolumeProps } from "../domain/entity/Volume";

export class VolumeDataSource implements DataSource<Volume> {
  private query: string;

  constructor(query: string) {
    this.query = query;
  }

  loadAfter(params: LoadParams) {
    return fetchVolumes(this.query, params.key, params.size).then(response =>
      response.data.items.map(composeVolume)
    );
  }

  loadBefore(params: LoadParams) {
    return fetchVolumes(this.query, params.key, params.size).then(response =>
      response.data.items.map(composeVolume)
    );
  }
}

const fetchVolumes = (query: string, index: number, size: number) => {
  if (size > 40) {
    // TODO:
    throw new Error();
  }

  return axios({
    method: "GET",
    url: "https://www.googleapis.com/books/v1/volumes",
    params: {
      q: query,
      startIndex: index,
      maxResults: size
    }
  });
};

// @see https://developers.google.com/books/docs/v1/reference/volumes/list
const composeVolume = (obj: any): Volume => {
  const props: VolumeProps = {
    title: notEmpty(obj.volumeInfo.title) ? obj.volumeInfo.title : null,
    subtitle: notEmpty(obj.volumeInfo.subtitle)
      ? obj.volumeInfo.subtitle
      : null,
    authors: notEmpty(obj.volumeInfo.authors) ? obj.volumeInfo.authors : null,
    description: notEmpty(obj.volumeInfo.description)
      ? obj.volumeInfo.description
      : null,
    publisher: notEmpty(obj.volumeInfo.publisher)
      ? obj.volumeInfo.publisher
      : null,
    publishedDate: notEmpty(obj.volumeInfo.publishedDate)
      ? obj.volumeInfo.publishedDate
      : null,
    pageCount: notEmpty(obj.volumeInfo.pageCount)
      ? obj.volumeInfo.pageCount
      : null
  };
  return new Volume(props);
};

/**
 * 値が null もしくは undefined でないことを判定する
 *
 * @param value 判定対象の値
 * @return value が null もしくは undefined であれば false, どちらでもなければ true
 */
export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && typeof value !== "undefined";
}
