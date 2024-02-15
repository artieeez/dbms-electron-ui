import { Button, Card, CardContent, CardHeader, Container, LinearProgress, Paper, Slider, Typography } from "@mui/material"
import { DatabaseStateService } from "../service/db-state.service"
import { CancelRounded, CloudDownloadRounded } from "@mui/icons-material"

export const Overview = () => {

  const loaderMutation = DatabaseStateService.useLoadDbMutation()
  const stockPriceCount = DatabaseStateService.useStore(e => e.stockPriceCount)
  const currPos = stockPriceCount < 0 ? 0 : stockPriceCount
  const pageSize = DatabaseStateService.useStore(e => e.pageSize)
  const loading = DatabaseStateService.useStore(e => e.loading)
  const databaseMutation = DatabaseStateService.useResetDbMutation()
  // const isFinished = DatabaseStateService.useStore(e => e.isFinished)

  DatabaseStateService.useDatabaseState();

  return (
    <Container>
      <CardHeader
        title="Overview"
        subheader="Welcome to the Stock Dashboard"
        sx={{ pl: 0 }}
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
                  onClick={() => DatabaseStateService.useStore.setState({ cancel: true })}
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
            onChange={(_, value) => DatabaseStateService.useStore.setState({ pageSize: value as number })}
            min={1}
            max={20}
            valueLabelDisplay="auto"
            marks
          />
          <Typography>Database Status</Typography>
          <Typography align="center">{currPos} / 894777</Typography>
          <LinearProgress variant="determinate" value={(currPos / 894777) * 100} />
        </CardContent>
      </Card>
      <Card variant="outlined" sx={{ mt: 2 }}>
        <CardHeader
          title="Database Actions"
        />
        <CardContent>
          <Button
            variant="contained"
            color="error"
            onClick={() => databaseMutation.mutateAsync()}
          >
            Reset Database
          </Button>
        </CardContent>
      </Card>
    </Container >
  )
}