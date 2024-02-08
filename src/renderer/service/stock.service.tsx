import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { create } from "zustand"

interface Store {
  cancel: boolean;
  pageSize: number;
  stockCount: number;
  stockPriceCount: number;
  loading: boolean;
}

const useStore = create<Store>((set) => ({
  cancel: false,
  pageSize: 10,
  stockCount: 0,
  stockPriceCount: -1,
  loading: false,
}))

const iterator = async () => {
  return new Promise<void>(resolve => {
    const [stockPriceCount, stockCount] = window.dbms?.indexController?.loadDb(useStore.getState().pageSize)
    console.log("stockPriceCount", stockPriceCount)
    console.log("stockCount", stockCount)
    useStore.setState({ stockCount, stockPriceCount })
    setTimeout(() => {
      resolve()
    }, 200)
  })
}

const useLoadDbMutation = () => {
  return useMutation({
    mutationFn: () => {
      return new Promise(async resolve => {
        while (!useStore.getState().cancel && useStore.getState().stockPriceCount !== 0) {
          await iterator()
        }
        resolve(useStore.getState().stockPriceCount)
      })
    },
    onMutate: () => {
      useStore.setState({ loading: true })
      toast.success("Database loading started")
    },
    onError: (error) => {
      useStore.setState({ loading: false })
      toast.error(`Database loading failed at position ${useStore.getState().stockPriceCount} with error: ${error}`)
    },
    onSuccess: () => {
      useStore.setState({ loading: false })
      if (useStore.getState().cancel) {
        toast.error(`Database loading cancelled at position ${useStore.getState().stockPriceCount}`)
        useStore.setState({ cancel: false })
      } else {
        toast.success(`Database loading completed at position ${useStore.getState().stockPriceCount}`)
      }
    },
  })
}

export const StockService = {
  useStore,
  useLoadDbMutation,
}
