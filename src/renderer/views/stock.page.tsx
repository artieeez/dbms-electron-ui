import { Box, Button, CardHeader, Collapse, Container, FormControlLabel, IconButton, Stack, Switch, TextField, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useState } from "react";
import { Stock } from "../infra/dbms.model";
import { DeleteRounded, RemoveRounded } from "@mui/icons-material";
import { StockListService } from "../service/stock-list.service";
import { DatabaseStateService } from "../service/db-state.service";
import { SearchRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const dbms = window.dbms

export const StockPage = () => {

  const search = StockListService.useStore(e => e.search)
  const page = StockListService.useStore(e => e.page)
  const pageSize = StockListService.useStore(e => e.pageSize)
  const query = StockListService.useStockQuery()
  const indexSearch = StockListService.useStore(e => e.indexSearch)
  const stockCount = DatabaseStateService.useStore(e => e.stockCount)
  const navigate = useNavigate();

  // stock add form
  const [openAdd, setOpenAdd] = useState(false)
  const [stockId, setStockId] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [minDate, setMinDate] = useState('')
  const [maxDate, setMaxDate] = useState('')
  const addStock = () => {

    const payload: Stock = {
      stockId,
      companyId,
      minDate,
      maxDate
    }

    dbms?.trie?.addStock(payload)
  }

  return (
    <Container sx={{ py: 4 }}>
      <CardHeader
        title="Stock Page"
        subheader="Welcome to the Stock Page"
        action={
          <Button
            variant="contained"
            onClick={() => setOpenAdd(!openAdd)}
            sx={{ mt: 2 }}
          >
            Add Stock
          </Button>
        }
        // remove left padding
        sx={{ pl: 0 }}
      />
      <Collapse in={openAdd} sx={{ py: 2 }}>
        <Box display="flex" flexDirection="row" gap={2}>
          <TextField
            label="Stock ID"
            value={stockId}
            onChange={(e) => setStockId(e.target.value)}
          />
          <TextField
            label="Company ID"
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
          />
          <TextField
            label="Min Date"
            value={minDate}
            onChange={(e) => setMinDate(e.target.value)}
          />
          <TextField
            label="Max Date"
            value={maxDate}
            onChange={(e) => setMaxDate(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={addStock}
            sx={{ flex: 1 }}
          >
            Confirm
          </Button>
        </Box>
      </Collapse>
      <TextField
        fullWidth
        value={search}
        onChange={(e) => StockListService.useStore.setState({ search: e.target.value })}
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
            onChange={(e) => StockListService.useStore.setState({ indexSearch: e.target.checked })}
          />
        }
        label="Busca indexada"
      />
      <DataGrid
        rows={query?.data || []}
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
                    console.log(params.row.stockId)
                   //dbms?.indexController?.deleteStock(params.row.stockId as string)
                   navigate(`/stock/${params.row.stockId}`)
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
        rowCount={stockCount}
        paginationMode="server"
        onPaginationModelChange={(params: any) => {
          StockListService.useStore.setState({ page: params.page, pageSize: params.pageSize })
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
      />
    </Container>
  )
}