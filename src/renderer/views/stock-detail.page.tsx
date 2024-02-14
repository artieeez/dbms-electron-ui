import { Box, Button, CardHeader, Collapse, Container, IconButton, Stack, TextField, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useState } from "react";
import { DeleteRounded, SearchRounded } from "@mui/icons-material";
import { StockListService } from "../service/stock-list.service";
import { StockPriceListService } from "../service/stock-price-list.service";
import CandleChart from "../components/candle-chart.component";

const dbms = window.dbms

console.log("dbms", dbms)

export const StockDetailPage = () => {

  const stockId = window.location.pathname.split('/').pop()

  const search = StockPriceListService.useStore(e => e.search)
  const page = StockPriceListService.useStore(e => e.page)
  const pageSize = StockPriceListService.useStore(e => e.pageSize)
  const query = StockPriceListService.useStockPriceQuery(stockId)

  return (
    <Container sx={{ py: 4 }}>
      <CardHeader
        title="Stock Price Page"
        subheader="Welcome to the Stock Price Page"
        // remove left padding
        sx={{ pl: 0 }}
      />
      <CandleChart/>
    </Container>
  )
}