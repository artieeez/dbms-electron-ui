import { Button, Card, CardContent, CardHeader, Container, LinearProgress, Paper, Slider, Typography } from "@mui/material"
import { StockService } from "../service/stock.service"
import { CancelRounded, CloudDownloadRounded } from "@mui/icons-material"

export const Overview = () => {

  const loaderMutation = StockService.useLoadDbMutation()
  const stockPriceCount = StockService.useStore(e => e.stockPriceCount)
  const currPos = stockPriceCount < 0 ? 0 : stockPriceCount
  const pageSize = StockService.useStore(e => e.pageSize)
  const loading = StockService.useStore(e => e.loading)
  // const isFinished = StockService.useStore(e => e.isFinished)

  return (
    <Container>
      <CardHeader
        title="Overview"
        subheader="Welcome to the Stock Dashboard"
      />
      <Card variant="outlined">
        <CardHeader
          title="Records Overview"
          action={
            loading
              ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => StockService.useStore.setState({ cancel: true })}
                  startIcon={<CancelRounded />}
                >
                  Cancel
                </Button>
              )
              : (
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => loaderMutation.mutateAsync()}
                  startIcon={<CloudDownloadRounded />}
                >
                  Load Database
                </Button>
              )
          }
        />
        <CardContent>
          <Typography>Block Size</Typography>
          <Slider
            value={pageSize}
            onChange={(_, value) => StockService.useStore.setState({ pageSize: value as number })}
            min={1}
            max={20}
            valueLabelDisplay="auto"
            marks
            />
          <Typography>Database Status</Typography>
          <Typography align="center">{currPos} / 894777</Typography>
          <LinearProgress variant="determinate" value={currPos / 894777} />
        </CardContent>
      </Card>
    </Container >
  )
}