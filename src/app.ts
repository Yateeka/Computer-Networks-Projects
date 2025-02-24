import express from "express";
import notes from "@/notes";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Hello World! Your ip is: ${req.ip}`);
});

app.use("/notes", notes);

const port = 8000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
