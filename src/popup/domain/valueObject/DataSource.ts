export interface LoadParams {
  key: number;
  size: number;
}

export interface DataSource<T> {
  loadAfter(params: LoadParams): Promise<Array<T>>;
  loadBefore(params: LoadParams): Promise<Array<T>>;
}
