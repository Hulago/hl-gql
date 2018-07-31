import { ConnectionManager, Connection, createConnection, getConnection, EntityManager } from 'typeorm';
import { Post } from './models/post.model';
import { Category } from './models/category.model';
import { Location } from './models/location.model';
import { PostResolver } from './resolvers/post.resolver';
import { CategoriesResolver } from './resolvers/category.resolver';

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
    entities: [Location, Post, Category]
  });
};

const schemaModels = fileLoader(path.join(__dirname, '..', 'src', 'schema', 'models'));
const schemaControllers = fileLoader(path.join(__dirname, '..', 'src', 'schema', 'controllers'));

bootstrap()
  .then(async () => {
    const entityManager: EntityManager = await getConnection('test').manager;

    const postResolver = new PostResolver();
    const categoryResolver = new CategoriesResolver(entityManager);

    const resolvers = {
      Query: {
        posts: postResolver.posts.bind(postResolver)
      },
      Category: { location: categoryResolver.location.bind(categoryResolver) }
    };

    const server = new ApolloServer({
      typeDefs: mergeTypes([...schemaModels, ...schemaControllers]),
      resolvers,
      context: () => ({
        db: entityManager
      }),
      debug: true
    });

    server.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  })
  .catch(e => {
    console.log(`😭 Error 💣`, e);
  });
