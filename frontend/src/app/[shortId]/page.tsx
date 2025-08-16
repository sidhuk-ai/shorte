import axios from "axios";
import { redirect } from "next/navigation";


export default async function Page({ params }: {
    params: Promise<{ shortId: string }>
}) {
    const { shortId } = await params;
    const resp = await axios.get(`http://localhost:5000/${shortId}`);

    if(resp.status === 400) {
        return (
            <section className="min-h-screen flex w-full items-center justify-center">
                <h1 className="text-4xl font-medium">No link found with the specified short URL</h1>
            </section>
        )
    }
    redirect(resp.data.realUrl);
}