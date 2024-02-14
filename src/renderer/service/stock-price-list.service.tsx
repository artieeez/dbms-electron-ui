import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";

interface Store {
  search: string;
  page: number;
  pageSize: number;
  indexSearch: boolean;
}

const useStore = create<Store>((set) => ({
  search: '',
  page: 0,
  pageSize: 10,
  indexSearch: false,
}))

const useStockPriceQuery = (stockId?:string) => {

  const search = useStore(e => e.search)
  const page = useStore(e => e.page)
  const pageSize = useStore(e => e.pageSize)
  const indexSearch = useStore(e => e.indexSearch)

  const searchStockId = stockId || search

  return useQuery({
    queryKey: ['stock-price', indexSearch, searchStockId, pageSize, page],
    queryFn: async () => {
      return indexSearch
        ? window.dbms?.trie?.getStockPriceList(searchStockId, page, pageSize)
        : window.dbms?.linear?.getStockPriceList(searchStockId, page, pageSize)
    },
  })
}

export const StockPriceListService = {
  useStore,
  useStockPriceQuery
}
