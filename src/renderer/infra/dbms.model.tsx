export interface Stock {
  stockId: string;
  companyId: string;
  minDate: string;
  maxDate: string;
}

export interface ILinearSearch {
  addStock: (stockId: string, companyId: string, minDate: string, maxDate: string) => void;
  updateStock: (stockId: string, companyId: string, minDate: string, maxDate: string) => void;
  getStock: (stockId: string) => Stock;
  deleteStock: (stockId: string) => void;
  getStockList: (search: string, pageNumber: number, pageSize: number, orderBy: string) => Stock[];
}

export interface DBMS {
  linearSearch: ILinearSearch;
}