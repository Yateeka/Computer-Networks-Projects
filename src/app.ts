import express from "express";
import notes from "@/notes";
import sign from "@/sign";

const app = express();
app.use(express.json());

app.use("/notes", notes);
app.use("/sign", sign);
app.use("/", express.static("public"));

const port = 8000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
