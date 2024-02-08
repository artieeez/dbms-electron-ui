import { Box, Button, Collapse, Container, IconButton, Stack, TextField, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react";
import { Stock, stockPricePayload } from "../infra/dbms.model";
import { DeleteRounded, RemoveRounded } from "@mui/icons-material";
import { StockListService } from "../service/stock-list.service";
import { StockService } from "../service/stock.service";

const dbms = window.dbms

console.log("dbms", dbms)

export const StockPricePage = () => {

  const search = StockListService.useStore(e => e.search)
  const page = StockListService.useStore(e => e.page)
  const pageSize = StockListService.useStore(e => e.pageSize)
  const query = StockListService.useStockQuery()


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
    dbms?.indexController?.addStockPrice({stockId, stockPriceId: stockId+date, date, adj, close, high, low, open, volume})
  }

  console.log(dbms?.indexController)

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5">Stock Price Page</Typography>
      {/* Add stock */}

      <Button
        variant="contained"
        onClick={()=>setOpenAdd(!openAdd)}
        sx={{mt: 2}}
      >
        Add Stock
      </Button>
      <Collapse in={openAdd} sx={{py: 2, width: 1}}>
      <Box display="flex" flexDirection="row" gap={2}>
        <TextField
          label="Stock Price ID"
          value={stockId}
          onChange={(e) => setStockPriceId(e.target.value)}
          sx={{ mb: 2 }}
          fullWidth
        />
        <TextField
          label="Min Date"
          value={minDate}
          onChange={(e) => setMinDate(e.target.value)}
          sx={{ mb: 2 }}
          fullWidth
        />
        <TextField
          label="Max Date"
          value={maxDate}
          onChange={(e) => setMaxDate(e.target.value)}
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
          label="Search"
          value={search}
          onChange={(e) => StockListService.useStore.setState({ search: e.target.value })}
          sx={{ mb: 2 }}
        />
      <DataGrid
        rows={[{ stockId: '1', companyId: '1', minDate: '2021-01-01', maxDate: '2021-01-01' }]}
        getRowId={(row) => row.stockId}
        columns={[
          { sortable: false, field: 'stockId', headerName: 'ID', width: 200 },
          { sortable: false, field: 'companyId', headerName: 'Company ID', width: 200 },
          { sortable: false, field: 'minDate', headerName: 'Min Date', width: 200 },
          { sortable: false, field: 'maxDate', headerName: 'Max Date', width: 200 },
          { sortable: false, field: 'actions', headerName: '', width: 10, renderCell: (params) => {
            return (
              <Stack direction="row" justifyContent="end" spacing={2}>
                <IconButton
                  onClick={() => {
                   dbms?.indexController?.deleteStock(params.row.stockId as string)
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
        onPaginationModelChange={(params: any) => {
          StockListService.useStore.setState({ page: params.page, pageSize: params.pageSize })
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
      />
    </Container>
  )
}