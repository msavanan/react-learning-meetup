import { MongoClient } from "mongodb";
// api/meett-up
// POST api/meet-up

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { title, image, address, description } = data;
    try {
      const mongodbUrl =
        "mongodb+srv://saravananrnd:GF5TaF1MY0xUK5WT@cluster0.l04bjmf.mongodb.net/meetups?retryWrites=true&w=majority";
      const client = await MongoClient.connect(mongodbUrl);
      const db = client.db();
      const meetupCollection = db.collection("meetups");
      const result = await meetupCollection.insertOne(data);
      console.log("inserted response");
      console.log(result);
      client.close();
     res.status(201).json({ message: "meetup inserted" });
    } catch (e) {
      console.log(e);
    }
  }
}

export default handler;
