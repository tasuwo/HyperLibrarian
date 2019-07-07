export interface Observer<T> {
  onChanged(value: T): void;
}
