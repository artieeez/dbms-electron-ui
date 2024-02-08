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

const useLoadDbMutation = () => {
  return useMutation({
    mutationFn: () => {
      while (!useStore.getState().cancel && useStore.getState().currPos !== 0 && useStore.getState().currPos < 99999) {
        const currPos = window.dbms?.indexController?.loadDb(useStore.getState().pageSize)
        useStore.setState({ currPos })
      }
      return new Promise(resolve => resolve(useStore.getState().currPos))
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
