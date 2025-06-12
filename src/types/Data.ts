export interface DataResultType {
  label: string;
  value: string | number;
}

export interface FilterDefaults {
  minPrice: number;
  maxPrice: number;
  minYear: number;
  maxYear: number;
  page: number;
  pageSize: number;
  pages: Pages;
}

export interface Pages {
  listings: number;
  pages: number;
  total: number;
}
