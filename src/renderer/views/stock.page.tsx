import { Button, Container, TextField, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react";
import { Stock } from "../infra/dbms.model";

const dbms = window.dbms

console.log("dbms", dbms)

export const StockPage = () => {

  const [search, setSearch] = useState('');
  const [rows, setRows] = useState<Stock[]>([]);

  useEffect(() => {
    const res = dbms?.indexController?.getStockList(search, 10, 0, "name_asc")

    if (res && typeof res === 'object' && res?.length) {
      setRows(res)
    } else {
      setRows([])
    }
  }, [search])

  // stock add form
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
      <Button
        variant="contained"
        onClick={addStock}
      >
        Add Stock
      </Button>

      <TextField
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />
      <DataGrid
        rows={rows}
        getRowId={(row) => row.stockId}
        columns={[
          { field: 'stockId', headerName: 'ID', width: 200 },
          { field: 'companyId', headerName: 'Company ID', width: 200 },
          { field: 'minDate', headerName: 'Min Date', width: 200 },
          { field: 'maxDate', headerName: 'Max Date', width: 200 },
        ]}
        sx={{ height: 500, width: '100%' }}
        // pagesize

        pageSizeOptions={[5, 10, 20, 50, 100]}
      />
    </Container>
  )
}