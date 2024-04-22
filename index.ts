import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";

const typeDefs = readFileSync("./typeDefs.graphql", { encoding: "utf-8" });
const resolvers = {
  Query: {
    totalPhotos: () => 42,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
