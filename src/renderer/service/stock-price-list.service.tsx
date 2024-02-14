import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";

interface Store {
  search: string;
  page: number;
  pageSize: number;
  minDate: string;
  maxDate: string;
  indexSearch: boolean;
}

const useStore = create<Store>((set) => ({
  search: '',
  page: 0,
  pageSize: 10,
  minDate: '',
  maxDate: '',
  indexSearch: false,
}))

const useStockPriceQuery = () => {

  const search = useStore(e => e.search)
  const page = useStore(e => e.page)
  const pageSize = useStore(e => e.pageSize)
  const indexSearch = useStore(e => e.indexSearch)

  return useQuery({
    queryKey: ['stock-price', indexSearch, search, pageSize, page],
    queryFn: async () => {
      return indexSearch
        ? window.dbms?.trie?.getStockPriceList(search, page, pageSize)
        : window.dbms?.linear?.getStockPriceList(search, page, pageSize)
    },
  })
}

export const StockPriceListService = {
  useStore,
  useStockPriceQuery
}
