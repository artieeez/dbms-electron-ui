import { useRoutes } from "react-router-dom"
import { StockPage } from "./views/stock.page"
import { Overview } from "./views/overview.page"

export const AppRoute = () => {

  return useRoutes([
    {
      path: '/',
      element: <Overview />
    },
    {
      path: '/stock',
      element: <StockPage />
    },
  ])
}
