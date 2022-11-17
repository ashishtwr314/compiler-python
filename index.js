const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PythonShell } = require("python-shell");

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("HIII WELCOME TO APP");
});

app.post("/compile", (req, res) => {
  try {
    let _code = req.body.code;
    const code = _code.trim();

    PythonShell.runString(code, null, function (err, results) {
      if (err) {
        return res.status(200).send({ err: true, output: err.message });
      }

      res.status(200).send({ err: false, output: results });
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
