import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";

const typeDefs = readFileSync("./typeDefs.graphql", { encoding: "utf-8" });

let photos: any[] = [];
const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
  },
  Mutation: {
    // https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-arguments
    postPhoto: (parent: any, args: any) => {
      photos.push(args);
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
