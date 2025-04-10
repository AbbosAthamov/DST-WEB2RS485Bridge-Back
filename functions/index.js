const { onRequest } = require("firebase-functions/v2/https");

exports.response = onRequest((req, res) => {
  console.log("Запрос получен:", req.method, req.headers, req.body);

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  if (req.method !== "POST") {
    return res.status(405).send("Метод не поддерживается!!!");
  }

  const { message } = req.body;
  console.log("Принятое сообщение:", message);

  res.json({ receivedMessage: message, status: "97985" });
});
