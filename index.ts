import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";
import type { Photo } from "./@types";

const typeDefs = readFileSync("./typeDefs.graphql", { encoding: "utf-8" });

let _id = 0;
let photos: Photo[] = [];

const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos,
  },
  Mutation: {
    // https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-arguments
    postPhoto: (parent: any, args: any) => {
      const newPhoto: Photo = { ...args, id: ++_id };
      photos.push(newPhoto);
      return newPhoto;
    },
  },
  // trivial resolver
  // 함수에 전달되는 첫 번째 인자는 언제나 parent 객체이다.
  // 이 경우, 현재 resolving 대상인 Photo 객체가 parent가 된다.
  // GraphQL 스키마는 정의는 곧 애플리케이션 요구 사항 정의와 같습니다.
  // GraphQL 스키마의 각 필드는 모두 짝이 되는 리졸버가 있다.
  Photo: {
    url: (parent: any) => `http://yoursite.com/img/${parent.id}.jpg`,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
