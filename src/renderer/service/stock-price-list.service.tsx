import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";

interface Store {
  search: string;
  page: number;
  pageSize: number;
  minDate: string;
  maxDate: string;
}

const useStore = create<Store>((set) => ({
  search: '',
  page: 0,
  pageSize: 10,
  minDate: '',
  maxDate: '',
}))

const useStockPriceQuery = () => {

  const search = useStore(e => e.search)
  const page = useStore(e => e.page)
  const pageSize = useStore(e => e.pageSize)

  return useQuery({
    queryKey: ['stock-price', search, pageSize, page],
    queryFn: async () => {
      const res = window.dbms?.indexController?.getStockPriceList(search, page, pageSize)
      return res
    },
  })
}

export const StockPriceListService = {
  useStore,
  useStockPriceQuery
}
