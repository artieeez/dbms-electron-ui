import { Button, CardHeader, Container, FormControlLabel, Slider, Switch } from "@mui/material"
import { ArrowBackRounded } from "@mui/icons-material";
import { StockPriceListService } from "../service/stock-price-list.service";
import CandleChart from "../components/candle-chart.component";
import { useNavigate, useParams } from "react-router-dom";
import { StockPrice } from "../infra/dbms.model";
import LineChart from "../components/line-chart.component";
import { useMemo, useState } from "react";

const dbms = window.dbms


function parseDataToCandleGraph(obj: StockPrice) {
  const { date, open, high, low, close, volume } = obj;
  const timestamp = new Date(date).getTime();
  return {
    x: new Date(date).toLocaleDateString(),
    y: [open, high, low, close].map(n => parseFloat(n.toFixed(2)))
  };
}


export const StockDetailPage = () => {

  const { id } = useParams()
  const navigate = useNavigate();

  const indexSearch = StockPriceListService.useStore(e => e.indexSearch)

  const [range, setRange] = useState([0, 7]);

  const query = StockPriceListService.useStockPriceQuery({
    stockId: id as string,
    page: range[0],
    pageSize: range[1]
  })

  const candleData = {
    series: [{
      data: query?.data?.length ? query?.data.map(parseDataToCandleGraph) : []
    }],
    categories: query?.data?.length ? query?.data.map(obj => obj.date) : []
  }

  const lineData = {
    series: [{
      name: "Volume",
      data: query?.data?.length ? query?.data.map(obj => obj.volume) : []
    }],
    categories: query?.data?.length ? query?.data.map(obj => new Date(obj.date).toLocaleDateString()) : []
  }

  return (
    <Container sx={{ py: 4 }}>
      <CardHeader
        title={id}
        subheader="Welcome to the Stock Price Page"
        // remove left padding
        sx={{ pl: 0 }}
        action={
          <Button
            onClick={() => navigate(-1)}
            startIcon={<ArrowBackRounded />}
          >
            Back
          </Button>
        }
      />
      <FormControlLabel
        sx={{ mb: 1 }}
        control={
          <Switch
            checked={indexSearch}
            onChange={(e) => StockPriceListService.useStore.setState({ indexSearch: e.target.checked })}
          />
        }
        label="Busca indexada"
      />
      <Slider
        value={range}
        onChange={(_, value) => setRange(value as number[])}
        min={0}
        max={100}
        valueLabelDisplay="auto"
        marks
      />
      <CandleChart data={candleData} />
      <LineChart data={lineData} id={id as string} />
    </Container>
  )
}