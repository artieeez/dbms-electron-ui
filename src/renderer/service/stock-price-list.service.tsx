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

interface QueryParams {
  stockId?: string;
  page?: number;
  pageSize?: number;
}
const useStockPriceQuery = (params?: QueryParams) => {

  const search = useStore(e => e.search)
  const page = useStore(e => e.page)
  const pageSize = useStore(e => e.pageSize)
  const indexSearch = useStore(e => e.indexSearch)

  const searchStockId = params?.stockId || search
  const searchPage = params?.page || page
  const searchPageSize = params?.pageSize || pageSize

  return useQuery({
    queryKey: ['stock-price', indexSearch, searchStockId, searchPageSize, searchPage],
    queryFn: async () => {
      return indexSearch
        ? window.dbms?.trie?.getStockPriceList(searchStockId, searchPage, searchPageSize)
        : window.dbms?.linear?.getStockPriceList(searchStockId, searchPage, searchPageSize)
    },
  })
}

export const StockPriceListService = {
  useStore,
  useStockPriceQuery
}
