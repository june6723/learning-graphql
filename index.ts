import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";
import type { Photo, PhotoInput, User } from "./@types";

const typeDefs = readFileSync("./typeDefs.graphql", { encoding: "utf-8" });

let _id = 0;

let users: User[] = [
  { githubLogin: "mHattrup", name: "Mike Hattrup" },
  { githubLogin: "gPlake", name: "Glen Plake" },
  { githubLogin: "sSchmidt", name: "Scot Schmidt" },
];
let photos: any[] = [
  {
    id: "1",
    name: "Dropping the Heart Chute",
    description: "The heart chute is one of my favorite chutes",
    category: "ACTION",
    githubUser: users[0].githubLogin,
  },
  {
    id: "2",
    name: "Enjoying the sunshine",
    description: "Sunsets are my favorite",
    category: "SELFIE",
    githubUser: users[1].githubLogin,
  },
  {
    id: "3",
    name: "Gunbarrel 25",
    description: "25 laps on gunbarrel today",
    category: "LANDSCAPE",
    githubUser: users[2].githubLogin,
  },
];

/**
 * tag 배열을 코드에서 사용했지만 tag라는 Graphql 타입을 만들지는 않았다.
 * GraphQL은 데이터 모델이 스키마 타입과 반드시 매칭하도록 강제하지 않는다.
 */
let tags = [
  { photoID: "1", userID: "gPlake" },
  { photoID: "2", userID: "sSchmidt" },
  { photoID: "2", userID: "mHattrup" },
  { photoID: "2", userID: "gPlake" },
];

const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos,
  },
  Mutation: {
    postPhoto: (parent: any, args: { input: PhotoInput }) => {
      const newPhoto = { ...args.input, id: `${++_id}` };
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
    postedBy: (parent: any) =>
      users.find((u) => u.githubLogin === parent.githubUser),
    taggedUsers: (parent: any) =>
      tags
        .filter((t) => t.photoID === parent.id)
        .map((t) => t.userID)
        .map((userID) => users.find((u) => u.githubLogin === userID)),
  },
  User: {
    postedPhotos: (parent: any) =>
      photos.filter((p) => p.githubUser === parent.githubLogin),
    inPhotos: (parent: any) =>
      tags
        .filter((t) => t.userID === parent.id)
        .map((t) => t.photoID)
        .map((photoID) => photos.find((p) => p.id === photoID)),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
