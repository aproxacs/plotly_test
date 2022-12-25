import clientPromise from "../mongodb";

export interface IPlotDB {
  _id?: string;
  id?: string;
  name: string;
  data: string; // JSON string of plotly data
  createdAt: Date;
}

const getCollection = async () => {
  const client = await clientPromise;
  return client.db("plotly_test").collection("plots");
};

export async function getAllPlots(): Promise<IPlotDB[]> {
  const collection = await getCollection();
  return await collection.find().sort({ createdAt: -1 }).limit(25).toArray();
}

export async function getPlotCount(): Promise<number> {
  const collection = await getCollection();
  return await collection.countDocuments();
}

export async function updatePlot(username: string, bio: string) {
  const collection = await getCollection();
  return await collection.updateOne({ username }, { $set: { bio } });
}

export async function createPlot(attrs: { name: string; data: string }) {
  const collection = await getCollection();
  const result = await collection.insertOne({
    ...attrs,
    createdAt: new Date(),
  });

  return result;
}
