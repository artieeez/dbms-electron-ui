import { useRoutes } from "react-router-dom"
import { StockPage } from "./views/stock.page"
import { Overview } from "./views/overview.page"
import { StockPricePage } from "./views/stock-price.page"

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
    {
      path: '/stock-price',
      element: <StockPricePage />
    },
  ])
}
