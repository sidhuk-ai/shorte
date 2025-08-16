import { Request, Response } from "express";
import { nanoid } from "nanoid";
import URL from "../models/url";
import "dotenv/config";

export async function createUrl(req:Request, res:Response) {
    const body: { realUrl: string } = req.body;
    
    if(!body.realUrl) return res.status(400).json({ error: 'Bad Request/No URL found' });
    const regex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-._~:/?#\[\]@!$&'()*+,;=]*)?$/
    if(!regex.test(body.realUrl)) {
        return res.status(400).json({
            error: 'Enter links only'
        })
    }

    const id = nanoid(8);
    const urlData = await URL.create({
        shortId: id,
        redirectUrl: body.realUrl,
        shortUrl: process.env.BASE_LINK_URL + `/${id}`,
        visitHistory: []
    });

    return res.status(200).json({
        id: id,
        shortUrl: urlData.shortUrl
    });
}

export async function getUrlAnalytics(req:Request, res:Response) {
    const shortId = req.params.shortId;

    const urlDetails = await URL.findOne({
        shortId: shortId
    });
    if(!urlDetails) return res.status(404).json({ error: "Not an valid shortify link" });

    return res.status(200).json({ len: urlDetails.visitHistory.length, timelogs: urlDetails.visitHistory });
}