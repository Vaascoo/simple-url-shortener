import Entry from "./Entry";
import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";

const entryMap: Map<string, Entry> = new Map<string, Entry>();
const DAY: number = 86400;

const port: number = 8080;
const app: Express = express();
const jsonParser = bodyParser.json();

app.post("/create", jsonParser, (req: Request, res: Response) => {
  const now: number = Math.floor(new Date().getTime() / 1000);
  const mapping: string | undefined = req.body.mapping;
  const url: string | undefined = req.body.url;

  if (mapping === undefined || url === undefined) {
    res.status(400).send("Invalid Request");
    return;
  }

  if (entryMap.has(mapping) && now - entryMap.get(mapping).timestamp <= DAY) {
    res.status(400).send("Mapping is currently occupied");
    return;
  }

  entryMap.set(mapping, new Entry(mapping, url));
  res.status(200).send();

  console.log(entryMap);
});

app.get("/url/:mapping", (req : Request, res : Response) => {
  const mapping: string = req.params.mapping;

  if (entryMap.has(mapping)) {
    res.status(301).redirect(entryMap.get(mapping).url);
    console.log(`Redirecting ${mapping} to ${entryMap.get(mapping).url}`)
    return;
  }

  res.status(400).send("Mapping is does not exist");
})

app.listen(port, () => {
  console.log(`App now running on port 8080`);
});
