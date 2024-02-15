import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { create } from "zustand"

interface Store {
  cancel: boolean;
  pageSize: number;
  stockCount: number;
  stockPriceCount: number;
  loading: boolean;
  isFinished?: boolean;
}

const useStore = create<Store>((set) => ({
  cancel: false,
  pageSize: 10,
  stockCount: 0,
  stockPriceCount: 0,
  loading: false,
  isFinished: false,
}))

const iterator = async () => {
  return new Promise<void>(resolve => {
    const pageSize = useStore.getState().pageSize
    const { stockCount, stockPriceCount, isFinished } = window.dbms?.state?.loadDb(useStore.getState().pageSize)
    useStore.setState({
      stockCount,
      stockPriceCount,
      isFinished
    })
    console.log("StockCount", stockCount)
    console.log("StockPriceCount", stockPriceCount)
    setTimeout(() => {
      resolve()
    }, 200)
  })
}

const useDatabaseState = () => {
  return useQuery({
    queryKey: ["dbState"],
    queryFn: () => {
      return new Promise(resolve => {
        const res = window.dbms?.state?.getDatabaseState();
        useStore.setState({
          stockCount: res.stockCount,
          stockPriceCount: res.stockPriceCount,
          isFinished: res.isFinished
        })
        resolve(res)
      })
    },
  })
}

const useLoadDbMutation = () => {
  return useMutation({
    mutationFn: () => {
      return new Promise(async resolve => {
        while (!useStore.getState().cancel && !useStore.getState().isFinished) {
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

const useResetDbMutation = () => {
  return useMutation({
    mutationFn: () => {
      return new Promise(resolve => {
        window.dbms?.state?.resetDatabase()
        useStore.setState({ stockCount: 0, stockPriceCount: 0, isFinished: false })
        resolve(true)
      })
    }
  })
}

export const DatabaseStateService = {
  useStore,
  useDatabaseState,
  useLoadDbMutation,
  useResetDbMutation,
}
