import { Box, Button, CardHeader, Collapse, Container, IconButton, Stack, TextField, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useState } from "react";
import { ArrowBackRounded, DeleteRounded, SearchRounded } from "@mui/icons-material";
import { StockListService } from "../service/stock-list.service";
import { StockPriceListService } from "../service/stock-price-list.service";
import CandleChart from "../components/candle-chart.component";
import { useNavigate, useParams } from "react-router-dom";
import { StockPrice } from "../infra/dbms.model";
import LineChart from "../components/line-chart.component";

const dbms = window.dbms

console.log("dbms", dbms)

function parseDataToCandleGraph(obj:StockPrice) {
  const { date, open, high, low, close, volume } = obj;
  const timestamp = new Date(date).getTime();
  return {
    x: new Date(timestamp),
    y: [open, high, low, close].map(n => parseFloat(n.toFixed(2)))
  };
}


export const StockDetailPage = () => {

  const {id} = useParams()
  const navigate = useNavigate();

  const search = StockPriceListService.useStore(e => e.search)
  const page = StockPriceListService.useStore(e => e.page)
  const pageSize = StockPriceListService.useStore(e => e.pageSize)
  const query = StockPriceListService.useStockPriceQuery(id)

  const candleData: ApexAxisChartSeries = [{
    data: query?.data?.length ? query?.data.map(parseDataToCandleGraph) : []
  }]

  const lineData = {
    series: [{
      name: "Volume",
      data: query?.data?.length ? query?.data.map(obj => obj.volume) : []
    }],
    categories: query?.data?.length ? query?.data.map(obj => obj.date) : []
}

  console.log(id, candleData, lineData)

  return (
    <Container sx={{ py: 4 }}>
      <CardHeader
        title={id}
        subheader="Welcome to the Stock Price Page"
        // remove left padding
        sx={{ pl: 0 }}
        action={
          <Button  
          onClick={()=> navigate(-1)} 
          startIcon={<ArrowBackRounded/>}
          >
            Back
          </Button>
        }
      />
      <CandleChart data={candleData}/>
      <LineChart data={lineData}/>
    </Container>
  )
}