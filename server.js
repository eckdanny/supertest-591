const express = require("express");
const PORT = process.env.PORT || 3000;
const store = require("./store");

const app = express();
const router = express.Router();

router.get("/people/:id", (req, res) => {
  const person = store["people"][parseInt(req.params.id, 10) - 1];
  if (!person) {
    return res.status(404).json({ detail: "Not found" });
  }
  res.status(200).json(person);
});

app.use("/api", router);

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}...`);
  });
}
