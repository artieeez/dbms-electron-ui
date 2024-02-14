import { Box, Button, CardHeader, Collapse, Container, FormControlLabel, IconButton, Stack, Switch, TextField, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useState } from "react";
import { DeleteRounded, SearchRounded } from "@mui/icons-material";
import { StockPriceListService } from "../service/stock-price-list.service";
import { DatabaseStateService } from "../service/db-state.service";

const dbms = window.dbms

export const StockPricePage = () => {

  const search = StockPriceListService.useStore(e => e.search)
  const page = StockPriceListService.useStore(e => e.page)
  const pageSize = StockPriceListService.useStore(e => e.pageSize)
  const query = StockPriceListService.useStockPriceQuery()
  const indexSearch = StockPriceListService.useStore(e => e.indexSearch)
  const stockPriceCount = DatabaseStateService.useStore(e => e.stockPriceCount)

  // stock add form
  const [openAdd, setOpenAdd] = useState(false)
  const [stockId, setStockId] = useState('')
  const [date, setDate] = useState('')
  const [adj, setAdj] = useState(0)
  const [close, setClose] = useState(0)
  const [high, setHigh] = useState(0)
  const [low, setLow] = useState(0)
  const [open, setOpen] = useState(0)
  const [volume, setVolume] = useState(0)
  const addStock = () => {
    dbms?.trie?.addStockPrice({ stockId, stockPriceId: stockId + date, date, adj, close, high, low, open, volume })
  }

  return (
    <Container sx={{ py: 4 }}>
      <CardHeader
        title="Stock Price Page"
        subheader="Welcome to the Stock Price Page"
        action={
          <Button
            variant="contained"
            onClick={() => setOpenAdd(!openAdd)}
            sx={{ mt: 2 }}
          >
            Add Stock Price
          </Button>
        }
        // remove left padding
        sx={{ pl: 0 }}
      />
      <Collapse in={openAdd} sx={{ py: 2, width: 1 }}>
        <Box display="flex" flexDirection="row" gap={2}>
          <TextField
            label="Stock Price ID"
            value={stockId}
            onChange={(e) => setStockId(e.target.value)}
            sx={{ mb: 2 }}
            fullWidth
          />
          <TextField
            label="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            sx={{ mb: 2 }}
            fullWidth
          />
          <TextField
            label="Adj"
            value={adj}
            onChange={(e) => setAdj(Number(e.target.value))}
            sx={{ mb: 2 }}
            fullWidth
          />
          <TextField
            label="Close"
            value={close}
            onChange={(e) => setClose(Number(e.target.value))}
            sx={{ mb: 2 }}
            fullWidth
          />
          <TextField
            label="High"
            value={high}
            onChange={(e) => setHigh(Number(e.target.value))}
            sx={{ mb: 2 }}
            fullWidth
          />
          <TextField
            label="Low"
            value={low}
            onChange={(e) => setLow(Number(e.target.value))}
            sx={{ mb: 2 }}
            fullWidth
          />
          <TextField
            label="Open"
            value={open}
            onChange={(e) => setOpen(Number(e.target.value))}
            sx={{ mb: 2 }}
            fullWidth
          />
          <TextField
            label="Volume"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            sx={{ mb: 2 }}
            fullWidth
          />

        </Box>
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="contained"
            onClick={addStock}
          >
            Confirm
          </Button>
        </Box>
      </Collapse>
      <TextField
        fullWidth
        value={search}
        onChange={(e) => StockPriceListService.useStore.setState({ search: e.target.value })}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <Box sx={{ mr: 1 }}>
              <SearchRounded />
            </Box>
          ),
        }}
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
      <DataGrid
        rows={query?.data || []}
        getRowId={(row) => row.stockPriceId}
        columns={[
          { sortable: false, field: 'stockId', headerName: 'ID', width: 200 },
          { sortable: false, field: 'stockPriceId', headerName: 'Company ID', width: 200 },
          { sortable: false, field: 'date', headerName: 'Date', width: 200 },
          { sortable: false, field: 'adj', headerName: 'Adj', width: 200 },
          { sortable: false, field: 'close', headerName: 'Close', width: 200 },
          { sortable: false, field: 'high', headerName: 'High', width: 200 },
          { sortable: false, field: 'low', headerName: 'Low', width: 200 },
          { sortable: false, field: 'open', headerName: 'Open', width: 200 },
          { sortable: false, field: 'volume', headerName: 'Volume', width: 200 },
          {
            sortable: false, field: 'actions', headerName: '', width: 10, renderCell: (params) => {
              return (
                <Stack direction="row" justifyContent="end" spacing={2}>
                  <IconButton
                    onClick={() => {
                      dbms?.trie?.deleteStock(params.row.stockId as string)
                    }}
                    color="error"
                  >
                    <DeleteRounded />
                  </IconButton>
                </Stack>
              )
            }
          }
        ]}
        sx={{ height: 500, width: '100%' }}
        rowSelection={false}
        paginationModel={{
          page: page,
          pageSize: pageSize,
        }}
        rowCount={stockPriceCount}
        onPaginationModelChange={(params: any) => {
          StockPriceListService.useStore.setState({ page: params.page, pageSize: params.pageSize })
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
      />
    </Container>
  )
}