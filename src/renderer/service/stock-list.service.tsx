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

const useStockQuery = () => {

  const search = useStore(e => e.search)
  const page = useStore(e => e.page)
  const pageSize = useStore(e => e.pageSize)
  const indexSearch = useStore(e => e.indexSearch)

  return useQuery({
    queryKey: ['stock', indexSearch, search, pageSize, page],
    queryFn: async () => {
      return indexSearch
        ? window.dbms?.trie?.getStockList(search, page, pageSize)
        : window.dbms?.linear?.getStockList(search, page, pageSize)
    },
  })
}

export const StockListService = {
  useStore,
  useStockQuery
}
