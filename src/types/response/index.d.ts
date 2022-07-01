export interface IListRes<T> {
  data: IGetListResData<T>;
  statusCode: number;
}

export interface IRes<T> {
  data: T;
  statusCode: number;
}

export interface IGetListResData<K> {
  curPage: number;
  perPage: number;
  total: number;
  lastPage: number;
  list: K[];
}
