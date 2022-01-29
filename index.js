const express = require('express');

(async function () {
  const app = express();
  app.listen({ port: 3001 }, () => {
    console.log(`Server is now running on http://localhost:3001`);
  });
})();
