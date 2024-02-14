import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create } from "zustand";
import { Stock } from "../infra/dbms.model";

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

const useStockMutation = (create?: boolean) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: Stock) => {
      return create
        ? window.dbms?.trie?.addStock(payload)
        : window.dbms?.trie?.updateStock(payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stock'] })
    }
  })
}

const useStockDeleteMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (stockId: string) => {
      return window.dbms?.trie?.deleteStock(stockId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stock'] })
    }
  })
}

export const StockListService = {
  useStore,
  useStockQuery,
  useStockMutation,
  useStockDeleteMutation,
}
