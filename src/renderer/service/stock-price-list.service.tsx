import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";

interface Store {
  stockId: string;
  page: number;
  pageSize: number;
  minDate: string;
    maxDate: string;
}

const useStore = create<Store>((set) => ({
    stockId: '',
  page: 0,
  pageSize: 10,
    minDate: '',
    maxDate: '',
}))

const useStockPriceQuery = () => {

  const stockId = useStore(e => e.stockId)
  const page = useStore(e => e.page)
  const pageSize = useStore(e => e.pageSize)
  const minDate = useStore(e => e.minDate)
    const maxDate = useStore(e => e.maxDate)

  return useQuery({
    queryKey: ['stock-price', stockId, pageSize, page],
    queryFn: async () => {
      const res = window.dbms?.linearSearch?.getStockPriceList(stockId, minDate, maxDate, "name_asc")
      return res
    },
  })
}

export const StockPriceListService = {
  useStore,
  useStockPriceQuery
}
