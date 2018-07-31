import { ConnectionManager, Connection, createConnection, getConnection, EntityManager } from 'typeorm';
import { Post } from './models/post.model';
import { PostResolver } from './resolvers/post.resolver';

import { ApolloServer, gql } from 'apollo-server';

const path = require('path');
const { mergeTypes, fileLoader } = require('merge-graphql-schemas');

const bootstrap = async () => {
  await createConnection({
    name: 'test',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'mysecretpassword',
    database: 'postgres',
    synchronize: true,
    logging: true,
    entities: [Post]
  });
};

const schemaModels = fileLoader(path.join(__dirname, '..', 'src', 'schema', 'models'));
const schemaControllers = fileLoader(path.join(__dirname, '..', 'src', 'schema', 'controllers'));

bootstrap().then(async () => {
  const entityManager: EntityManager = await getConnection('test').manager;

  const postResolver = new PostResolver(entityManager);

  const resolvers = {
    Query: {
      posts: postResolver.posts.bind(postResolver)
    }
  };

  const server = new ApolloServer({
    typeDefs: mergeTypes([...schemaModels, ...schemaControllers]),
    resolvers
  });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});
