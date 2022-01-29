const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { createServer } = require('http');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { typeDefs } = require('./Schema/typeDefs');
const { resolvers } = require('./Schema/resolvers');
const mongoose = require('mongoose');


(async function () {
  const app = express();

  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: '/graphql' }
  );

  const server = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });
  await server.start();

  server.applyMiddleware({ app });

  await mongoose.connect("mongodb://localhost:27017/cars_db", {
    useUnifiedTopology : true,
    useNewUrlParser : true
  })

  console.log("Mongoose Connected")
;
  httpServer.listen(3001, () => {
    console.log(`Server is now running on http://localhost:3001/graphql`);
  });
})();
