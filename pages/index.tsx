import { PlotList } from "../components/plot/list";
import { getAllPlots, IPlotDB } from "../lib/api/plots";
import { GetServerSideProps, GetStaticProps } from "next";

export interface IPlot {
  id: string;
  name: string;
  data: any;
  layout: any;
  frames?: any;
  createdAt: string;
}

export default function Home({ plots }: { plots: IPlot[] }) {
  return <PlotList plots={plots} />;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const plots = (await getAllPlots()).map((plot) => {
    const json = JSON.parse(plot.data);
    return {
      id: plot._id?.toString(),
      name: plot.name,
      data: json.data,
      layout: json.layout,
      frames: json.frames || [],
      createdAt: plot.createdAt?.toString(),
    } as IPlot;
  });

  return {
    props: {
      plots,
    },
  };
};
