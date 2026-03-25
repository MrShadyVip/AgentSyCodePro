const { MongoClient } = require("mongodb");

module.exports = async function (req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db("agentsycode");
    const collection = db.collection("messages");

    const { name, email, message } = req.body;

    await collection.insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  } finally {
    await client.close();
  }
};
