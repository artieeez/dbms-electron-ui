import { useRoutes } from "react-router-dom"
import { StockPage } from "./views/stock.page"

export const AppRoute = () => {

  return useRoutes([
    {
      path: '/',
      element: <StockPage />
    }
  ])
}