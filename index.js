const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { typeDefs } = require('./Schema/typeDefs');
const { resolvers } = require('./Schema/resolvers');

(async function () {
  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: 3001 }, () => {
    console.log(`Server is now running on http://localhost:3001`);
  });
})();
