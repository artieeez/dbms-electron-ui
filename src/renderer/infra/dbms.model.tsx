export interface Stock {
  stockId: string;
  companyId: string;
  minDate: string;
  maxDate: string;
}

export interface StockPrice {
  stockId: string;
  stockPriceId: string;
  companyId: string;
  minDate: string;
  maxDate: string;
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
  getStockPriceList: (stockId:string, pageSize: number, pageNumber: number) => StockPrice[];
  loadDb: (pageSize: number) => [number, number];
}

export interface DBMS {
  linearSearch: ILinearSearch;
  indexController: IIndexController;
}
