import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";

interface Store {
  search: string;
  page: number;
  pageSize: number;
}

const useStore = create<Store>((set) => ({
  search: '',
  page: 0,
  pageSize: 10,
}))

const useStockQuery = () => {

  const search = useStore(e => e.search)
  const page = useStore(e => e.page)
  const pageSize = useStore(e => e.pageSize)

  return useQuery({
    queryKey: ['stock', search, pageSize, page],
    queryFn: async () => {
      const res = window.dbms?.linearSearch?.getStockList(search, page, pageSize, "name_asc")
      return res
    },
  })
}

export const StockListService = {
  useStore,
  useStockQuery
}
