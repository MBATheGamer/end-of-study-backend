export interface PaginateResult<T> {
  data: any[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  }
}