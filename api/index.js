const { app, initializeApp } = require("../backend/src/app");

module.exports = async (req, res) => {
  try {
    await initializeApp();
    return app(req, res);
  } catch (error) {
    console.error("Initialization failed:", error.message);
    return res.status(500).json({ message: "Server initialization failed" });
  }
};
