import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { create } from "zustand"

interface Store {
  cancel: boolean;
  pageSize: number;
  currPos: number;
}

const useStore = create<Store>((set) => ({
  cancel: false,
  pageSize: 10,
  currPos: -1,
}))

const iterator = async () => {
  return new Promise<void>(resolve => {
    const currPos = window.dbms?.indexController?.loadDb(useStore.getState().pageSize)
    useStore.setState({ currPos })
    setTimeout(() => {
      resolve()
    }, 200)
  })
}

const useLoadDbMutation = () => {
  return useMutation({
    mutationFn: () => {
      return new Promise(async resolve => {
        while (!useStore.getState().cancel && useStore.getState().currPos !== 0) {
          await iterator()
        }
        resolve(useStore.getState().currPos)
      })
    },
    onMutate: () => {
      toast.success("Database loading started")
    },
    onError: (error) => {
      toast.error(`Database loading failed at position ${useStore.getState().currPos} with error: ${error}`)
    },
    onSuccess: () => {
      if (useStore.getState().cancel) {
        toast.error(`Database loading cancelled at position ${useStore.getState().currPos}`)
        useStore.setState({ cancel: false })
      } else {
        toast.success(`Database loading completed at position ${useStore.getState().currPos}`)
      }
    },
  })
}

export const StockService = {
  useStore,
  useLoadDbMutation,
}
