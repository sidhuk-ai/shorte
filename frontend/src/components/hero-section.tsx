"use client";
import {
  BarChart3,
  CalendarDays,
  Link as Lnk,
  Link2,
  MousePointerClick,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardDescription } from "./ui/card";
import { Input } from "./ui/input";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useQRCode } from "next-qrcode";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface TimeLogs {
  timestamp: number;
  _id: string;
}

export default function Hero() {
  const [url, setUrl] = useState("");
  const [shortId, setShortId] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [shortUrlInput, setShortUrlInput] = useState("");
  const [creationDate, setCreationDate] = useState<number | undefined>();
  const [analyticsData, setAnalyticsData] = useState<number>();
  const [timeLog, setTimeLog] = useState<TimeLogs[]>();
  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  } as const;

  const { SVG } = useQRCode();

  const handleClick = async () => {
    const resp = await axios.post(
      `http://localhost:5000/url`,
      {
        realUrl: url,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setShortId(resp.data.id);
    setShortUrl(resp.data.shortUrl);
    setCreationDate(Date.now());
  };

  const handleAnalyticsClick = async () => {
    const sId = shortUrlInput.split("/")[3];
    console.log(sId);
    const resp = await axios.get(`http://localhost:5000/url/analytics/${sId}`);
    setAnalyticsData(resp.data.len);
    setTimeLog(resp.data.timelogs);
  }
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-blue-50 text-blue-600 border-blue-200 px-3.5 py-2.5 rounded-full">
              Let's make with simply one click ✨
            </Badge>

            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              BIO LINK & LINK SHORTENER{" "}
              <span className="inline-flex bg-blue-600 rounded-md p-2 items-center">
                <Lnk className="size-10 text-white" />
              </span>{" "}
              FOR BUSINESS NEEDS
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Go to single platform, you'll find all the tools you need to
              connect audiences worldwide. Shorten links and QR Code, and create
              brand experiences.
            </p>
          </div>

          <div className="space-y-6">
            {/* QR Code Section */}
            <Card className="p-6 md:h-72 bg-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">QR CODE</h3>
                {/* <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Download PNG
                </Button> */}
              </div>
              {shortId === "" ? (
                <div className="flex items-center justify-center h-full">
                  <p className="font-bold text-xl">Create your short URL</p>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex items-center justify-between w-4/5">
                    <div className="size-40 rounded-lg flex items-center justify-center">
                      <SVG
                        text={shortUrl}
                        options={{
                          margin: 2,
                          width: 200,
                          color: {
                            dark: "#010599FF",
                            light: "#FFF",
                          },
                        }}
                      />
                    </div>
                    <div>
                      <p className="text-sm flex items-center gap-2 text-gray-600">
                        <Link2 className="text-blue-600 size-4 mt-0.5" />
                        {shortUrl}
                      </p>
                      <p className="text-xs flex items-center gap-2 text-gray-500">
                        <CalendarDays className="text-blue-600 size-4 mt-0.5" />
                        {new Intl.DateTimeFormat("en-US", options).format(
                          creationDate
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Custom Link Section */}
            <Card className="p-6 bg-white shadow-lg">
              <h3 className="font-semibold text-gray-900 mb-4">
                CUSTOM YOUR LINK
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="https://example.com/very-long-url"
                    className="flex-1"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <Button
                    onClick={handleClick}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Shorten
                  </Button>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">
                    Link will be shortened to:{" "}
                    {/* <span className="font-medium">{shortUrl}</span> */}
                    <Link
                      target="_blank"
                      href={shortUrl}
                      className="font-medium"
                    >
                      {shortUrl}
                    </Link>
                  </p>
                </div>
              </div>
            </Card>

            {/* Analytics Preview */}
            <Card className="p-4 bg-white shadow-lg">
              <div className="flex flex-col justify-center mb-2">
                <div className="flex justify-between">
                  <h4 className="text-sm font-medium text-gray-700">
                    Link Performance
                  </h4>
                  <BarChart3 className="w-4 h-4 text-gray-400" />
                </div>
                <CardDescription>
                  <p>Enter the shortened link to get the number of clicks</p>
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="https://shorte.com/abcdefgh"
                  className="flex-1"
                  value={shortUrlInput}
                  onChange={(e) => setShortUrlInput(e.target.value)}
                />
                <Button
                  onClick={handleAnalyticsClick}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Analytics
                </Button>
              </div>
              {
                analyticsData &&
                <div className="flex items-center gap-2 bg-green-200 rounded-md p-2">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <div className="flex gap-2 items-center">
                          <MousePointerClick className="size-5" />
                          <span className="text-base">No. of clicks: {analyticsData}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-4">
                        <p className="text-muted-foreground text-base">The time logs of the clicks</p>
                        {timeLog?.map((tlg,i) => (
                          <div className="flex flex-col gap-4" key={tlg._id}>
                            <span className="flex gap-2">
                              <span>{i+1}) </span>{new Date(tlg.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              }
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
