import "dotenv/config";
import express, { Request, Response } from "express";
import connectDB from "./config/db";
import urlRouter from "./routes/url.route";
import URL from "./models/url";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.BASE_LINK_URL }));
const PORT = process.env.PORT || 5000;

app.get('/',(req,res) => {
    res.send("Url shortner running");
})
app.use('/url',urlRouter);
app.get('/:id', async (req:Request, res:Response) => {
    const id = req.params.id;

    const response = await URL.findOneAndUpdate({
        shortId: id
    },{ $push: {
        visitHistory: {
            timestamp: Date.now()
        }
    }});

    if(!response) return res.status(404).json({ error: "No Link found" });

    return res.json({ realUrl: response.redirectUrl });
});

connectDB().then(() => {
    app.listen(PORT,() => {
        console.log(`Server running on PORT: ${PORT}`);
    });
})