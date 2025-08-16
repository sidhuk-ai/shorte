import mongoose, { Document } from "mongoose";

export interface IURL extends Document {
    shortId: string;
    redirectUrl: string;
    shortUrl: string;
    visitHistory: { timestamp: number }[];
}

const urlSchema = new mongoose.Schema<IURL>(
    {
        shortId: {
            required: true,
            type: 'string',
            unique: true
        },
        redirectUrl: {
            type: 'string',
            required: true
        },
        shortUrl: {
            type: 'string',
            required: true
        },
        visitHistory: [
            {
                timestamp: {
                    type: Number
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

const URL = mongoose.model<IURL>('url', urlSchema);

export default URL