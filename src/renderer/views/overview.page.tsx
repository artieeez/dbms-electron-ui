import { Button, Card, CardContent, CardHeader, Container, LinearProgress, Paper, Slider, Typography } from "@mui/material"
import { StockService } from "../service/stock.service"
import { CancelRounded, CloudDownloadRounded } from "@mui/icons-material"

export const Overview = () => {

  const loaderMutation = StockService.useLoadDbMutation()
  const _currPos = StockService.useStore(e => e.currPos)
  const currPos = _currPos < 0 ? 0 : _currPos
  const pageSize = StockService.useStore(e => e.pageSize)

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
            loaderMutation.isPending
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
            max={50}
            />
          <Typography>Database Status</Typography>
          <Typography align="center">{currPos} / 894777</Typography>
          <LinearProgress variant="determinate" value={currPos / 894777} />
        </CardContent>
      </Card>
    </Container >
  )
}