import { Box, Button, Collapse, Container, Stack, TextField, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react";
import { Stock } from "../infra/dbms.model";
import { StockListService } from "../service/stock-list.service";
import { StockService } from "../service/stock.service";

const dbms = window.dbms

console.log("dbms", dbms)

export const StockPage = () => {

  const search = StockListService.useStore(e => e.search)
  const page = StockListService.useStore(e => e.page)
  const pageSize = StockListService.useStore(e => e.pageSize)
  const query = StockListService.useStockQuery()
  const rowCount = StockService.useStore(e => e.currPos)

  // stock add form
  const [openAdd, setOpenAdd] = useState(false)
  const [stockId, setStockId] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [minDate, setMinDate] = useState('')
  const [maxDate, setMaxDate] = useState('')
  const addStock = () => {
    dbms?.indexController?.addStock(stockId, companyId, minDate, maxDate)
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5">Stock Page</Typography>
      {/* Add stock */}

      <Button
        variant="contained"
        onClick={()=>setOpenAdd(!openAdd)}
        sx={{mt: 2}}
      >
        Add Stock
      </Button>
      <Collapse in={openAdd} sx={{py: 2}}>
      <Box display="flex" flexDirection="row" gap={2}>
        <TextField
          label="Stock ID"
          value={stockId}
          onChange={(e) => setStockId(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Company ID"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Min Date"
          value={minDate}
          onChange={(e) => setMinDate(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Max Date"
          value={maxDate}
          onChange={(e) => setMaxDate(e.target.value)}
          sx={{ mb: 2 }}
        />
        
      </Box>
        <Button
          variant="contained"
          onClick={addStock}
          >
            Confirm
        </Button>
      </Collapse>
      <TextField
        label="Search"
        value={search}
        onChange={(e) => StockListService.useStore.setState({ search: e.target.value })}
        sx={{ mb: 2 }}
      />
      <DataGrid
        rows={query?.data || []}
        getRowId={(row) => row.stockId}
        columns={[
          { sortable: false, field: 'stockId', headerName: 'ID', width: 200 },
          { sortable: false, field: 'companyId', headerName: 'Company ID', width: 200 },
          { sortable: false, field: 'minDate', headerName: 'Min Date', width: 200 },
          { sortable: false, field: 'maxDate', headerName: 'Max Date', width: 200 },
        ]}
        sx={{ height: 500, width: '100%' }}
        rowSelection={false}
        paginationModel={{
          page: page,
          pageSize: pageSize,
        }}
        rowCount={rowCount}
        onPaginationModelChange={(params: any) => {
          StockListService.useStore.setState({ page: params.page, pageSize: params.pageSize })
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
      />
    </Container>
  )
}