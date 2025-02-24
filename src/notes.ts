import express from "express";
import db from "@/db";

export type Note = {
  content: string;
  createdAt: Date;
};

const router = express.Router();

router.get("/", async (req, res) => {
  const col = db.collection("notes");
  const notes: Note[] = (await col.find({}).limit(10).toArray()).map((doc) => ({
    content: doc.content,
    createdAt: doc.createdAt,
  }));
  res.status(200).send(notes);
});

router.post("/", async (req, res) => {
  const col = db.collection("notes");
  const newNote = req.body as Note;
  newNote.createdAt = new Date();
  const result = await col.insertOne(newNote);
  res.status(200).send(result);
});

export default router;
