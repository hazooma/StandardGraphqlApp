import express from "express";
import { ApolloServer } from "apollo-server-express";
import { config } from "dotenv";
config();

import typeDefs from "./Graphql/schema";
import { getMe } from "./Graphql/context";
import resolvers from "./Graphql/resolvers";
import models, { connectDb } from "./DB";

connectDb()
  .then(() => {
    console.log("Connected to the database");
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
        return { me: getMe(req), models };
      }
    });

    const app = express();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      )
    );
  })
  .catch(() => {
    console.log("Failed to Connect to the database");
  });
