const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const configuration = new Configuration({
  organization: "org-id",
  apiKey: "API-key",
});
let open_ai = new OpenAIApi(configuration);

// add body parser and corrs to express

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3080;

app.post("/", async (req, res) => {
  const { message, currentModel } = req.body;
  try {
    const response = await open_ai.createCompletion({
      model: currentModel, //"text-davinci-003",
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0.5,
    });

    res.json({
      message: response.data.choices[0].text,
    });
  } catch (error) {
    console.log("error", error.message);
  }
});

app.get("/models", async (req, res) => {
  try {
    const response = await open_ai.listModels();
    res.json({
      models: response.data.data,
    });
  } catch (error) {
    console.log("error", error.message);
  }
});

app.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`);
});
