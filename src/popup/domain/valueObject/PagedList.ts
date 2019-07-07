import { Observer } from "./Observer";
import { DataSource } from "./DataSource";

export interface PagedListConfig {
  readonly pageSize: number;
}

export interface ReadonlyPagedList<T> {
  asArray(): Readonly<Array<T>>;
}

export interface ObservablePagedList<T> {
  addObserver(observer: Observer<PagedList<T>>): void;
  removeObserver(observer: Observer<PagedList<T>>): void;

  loadAround(index: number): void;
}

export declare type PagedList<T> = ReadonlyPagedList<T> &
  ObservablePagedList<T>;

export class PagedListImpl<T> implements PagedList<T> {
  private cache: T[] = [];
  private config: Readonly<PagedListConfig>;
  private dataSource: DataSource<T>;
  // TODO:
  private observers: Array<Observer<PagedList<T>>> = [];

  constructor(config: PagedListConfig, dataSource: DataSource<T>) {
    this.config = config;
    this.dataSource = dataSource;
  }

  addObserver(observer: Observer<PagedList<T>>) {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer<PagedList<T>>) {
    const i = this.observers.indexOf(observer);
    this.observers.splice(i, 1);
  }

  asArray() {
    return this.cache;
  }

  loadAround(index: number) {
    this.dataSource
      .loadAfter({ key: index, size: this.config.pageSize })
      .then(results => {
        this.cache.splice(index, this.config.pageSize, ...results);
        this.observers.map(observer => observer.onChanged(this));
      });
  }
}
