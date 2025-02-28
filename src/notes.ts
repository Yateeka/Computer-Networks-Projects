import express, { Request } from "express";
import db from "@/db";
import { Token, type User } from "@/sign";
import { BSON } from "mongodb";

export type Note = {
  username: User["username"];
  content: string;
  createdAt: Date;
};

const router = express.Router();

async function getToken(req: Request) {
  const tokenID = req.headers["Lemon-Melon"];
  if (!tokenID) {
    return;
  }
  if (typeof tokenID !== "string") {
    return;
  }

  const token = await db
    .collection("tokens")
    .findOne<Token>({ _id: new BSON.ObjectId(tokenID) });
  if (!token) {
    return;
  }

  return token;
}

router.get("/", async (req, res) => {
  const token = await getToken(req);
  if (!token) {
    res.status(403).send();
    return;
  }

  const noteCol = db.collection("notes");
  const notes: Note[] = (
    await noteCol.find({ username: token.username }).limit(10).toArray()
  ).map((doc) => ({
    username: doc.username,
    content: doc.content,
    createdAt: doc.createdAt,
  }));
  res.status(200).send(notes);
});

router.post("/", async (req, res) => {
  const token = await getToken(req);
  if (!token) {
    res.status(403).send();
    return;
  }

  const col = db.collection("notes");
  const newNote = req.body as Note;
  newNote.username = token.username;
  newNote.createdAt = new Date();
  const result = await col.insertOne(newNote);
  res.status(200).send(result);
});

export default router;
