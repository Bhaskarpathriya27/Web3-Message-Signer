/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/verify-signature", (req, res) => {
  const { message, signature } = req.body;

  if (typeof message !== "string" || typeof signature !== "string") {
    return res.status(400).json({ error: "Invalid message or signature" });
  }

  try {
    const signer = ethers.verifyMessage(message, signature);
    const isValid = !!signer;

    res.json({
      isValid,
      signer,
      originalMessage: message,
    });
  } catch (err) {
    res.status(400).json({ error: "Signature verification failed" });
  }
});

const PORT = 10000;
const server = app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});

module.exports = app;
