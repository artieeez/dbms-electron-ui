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

export interface stockPricePayload {
  stockId: string;
  stockPriceId: string;
   date: string;
   adj: number;
   close: number;
   high: number;
   low: number;
   open: number;
  volume: number;
}
export interface ILinearSearch {
  addStock: (stockId: string, companyId: string, minDate: string, maxDate: string) => void;
  addStockPrice: (stockPrice: stockPricePayload)=> void;
  updateStock: (stockId: string, companyId: string, minDate: string, maxDate: string) => void;
  getStock: (stockId: string) => Stock;
  deleteStock: (stockId: string) => void;
  getStockList: (search: string, pageNumber: number, pageSize: number, orderBy: string) => Stock[];
  getStockPriceList: (stockId:string, minDate:string, maxDate:string, orderBy: string) => StockPrice[];
}

export interface IIndexController {
  addStock: (stockId: string, companyId: string, minDate: string, maxDate: string) => void;
  addStockPrice: (stockPrice: stockPricePayload)=> void;
  updateStock: (stockId: string, companyId: string, minDate: string, maxDate: string) => void;
  getStock: (stockId: string) => Stock;
  deleteStock: (stockId: string) => void;
  getStockList: (search: string, pageNumber: number, pageSize: number, orderBy: string) => Stock[];
  getStockPriceList: (stockId:string, page: number, pageSize: number) => StockPrice[];
}

export interface DatabaseState {
  stockCount: number;
  stockPriceCount: number;
  isFinished: boolean;
}

export interface IDatabaseState {
  loadDb: (pageSize: number) => DatabaseState;
  resetDatabase: () => void;
  getDatabaseState: () => DatabaseState;
}

export interface DBMS {
  linearSearch: ILinearSearch;
  indexController: IIndexController;
  stateController: IDatabaseState,
}
