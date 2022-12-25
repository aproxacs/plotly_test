import { Divider, ListItemText, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import { IPlot } from "../../pages";

const PlotItem = ({ plot }: { plot: IPlot }) => {
  const {data, layout, frames} = plot;

  return (
    <Box>
      <ListItemText primary={plot.name} secondary={`${plot.createdAt}`} />
      {data && layout && (
        <Box>
          <Plot data={data} layout={layout}  frames={frames} />
        </Box>
      )}
      <Divider />
    </Box>
  );
};

export const PlotList = ({ plots }: { plots: IPlot[] }) => {
  return (
    <Box m={2}>
      <Box pb={1}>
        <Typography variant="h4">Plotly chart Test</Typography>

        <Divider />
        
        <Stack pt={1}>
          <Typography variant="body1">It is testing this scenario.</Typography>
          <Typography variant="caption">
            1. Create a chart with plotly on python notebook.
          </Typography>
          <Typography variant="caption">
            2. Export chart data as json, and server save it.
          </Typography>
          <Typography variant="caption">
            3. Render chart data with <a href="https://github.com/plotly/plotly.js" target="blank">plotly.js</a> on web page(This page)
          </Typography>
          <Typography variant="caption">
            => Check both charts are same
          </Typography>
        </Stack>
      </Box>

      <Divider />

      <Stack pl={2} spacing={1}>
        {plots.map((plot) => (
          <PlotItem key={plot.id} plot={plot} />
        ))}
      </Stack>
    </Box>
  );
};
