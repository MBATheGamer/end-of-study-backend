export interface PaginateResult {
  data: any[];
  meta: {
    total: number;
    page: number;
    lastPage: number;
  }
}