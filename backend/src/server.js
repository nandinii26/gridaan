const { app, initializeApp } = require("./app");

const start = async () => {
  await initializeApp();

  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

start();
