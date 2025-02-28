import express from "express";
import bcrypt from "bcrypt";
import db from "@/db";
import { type ObjectId } from "mongodb";

export type User = {
  username: string;
  hash: string;
  createdAt: Date;
};

export type Token = {
  _id?: ObjectId;
  username: User["username"];
  createdAt: Date;
};

const router = express.Router();

router.post("/in", async (req, res) => {
  const col = db.collection("users");
  const credential = req.body as {
    username: string;
    password: string;
  };
  const user = await col.findOne<User>({ username: credential.username });
  if (user === null) {
    res.status(403).send();
    return;
  }

  if (!(await bcrypt.compare(credential.password, user.hash))) {
    res.status(403).send();
    return;
  }

  const token: Token = {
    username: user.username,
    createdAt: new Date(),
  };
  const tokenCol = db.collection("tokens");
  const result = await tokenCol.insertOne(token);

  res.status(200).send({ ...token, _id: result.insertedId });
});

router.post("/up", async (req, res) => {
  const col = db.collection("users");
  const credential = req.body as {
    username: string;
    password: string;
  };
  const salt = await bcrypt.genSalt(10);
  const newUser: User = {
    username: credential.username,
    hash: await bcrypt.hash(credential.password, salt),
    createdAt: new Date(),
  };
  const result = await col.insertOne(newUser);
  res.status(200).send(result);
});

export default router;
