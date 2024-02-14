export interface Stock {
  stockId: string;
  companyId: string;
  minDate: string;
  maxDate: string;
}
export interface StockPrice {
  stockPriceId: string;
  stockId: string;
  date: string;
  adj: number;
  close: number;
  high: number;
  low: number;
  open: number;
  volume: number;
}
export interface ILinearSearch {
  getStock: (stockId: string) => Stock;
  getStockList: (stockId: string, pageNumber: number, pageSize: number) => Stock[];
  getStockPriceList: (stockId: string, pageNumber: number, pageSize: number) => StockPrice[];
}

export interface IIndexController {
  getStock: (stockId: string) => Stock;
  getStockList: (stockId: string, pageNumber: number, pageSize: number) => Stock[];
  getStockPriceList: (stockId: string, pageNumber: number, pageSize: number) => StockPrice[];
  addStock: (stock: Stock) => void;
  deleteStock: (stockId: string) => void;
  updateStock: (stock: Stock) => void;
  addStockPrice: (stockPrice: StockPrice) => void;
  deleteStockPrice: (stockPriceId: string) => void;
}

export interface DatabaseState {
  loaderPosition: number;
  stockCount: number;
  stockPriceCount: number;
  isFinished: boolean;
}

export interface IDatabaseState {
  getDatabaseState: () => DatabaseState;
  resetDatabase: () => void;
  loadDb: (pageSize: number) => DatabaseState;
}

export interface DBMS {
  linear: ILinearSearch;
  trie: IIndexController;
  state: IDatabaseState,
}
