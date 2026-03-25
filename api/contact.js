import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
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
            createdAt: new Date()
        });

        res.status(200).json({ message: "Message saved" });
    } catch (error) {
        res.status(500).json({ message: "Error saving message" });
    } finally {
        await client.close();
    }
          }
