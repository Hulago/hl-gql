import { ConnectionManager, Connection, createConnection, getConnection, EntityManager } from 'typeorm';
import { Post } from '../models/post.model';
import { GraphQLResolveInfo } from 'graphql';

export class PostResolver {
  constructor() {}

  async posts(parent: any, _: null, context: any, info: GraphQLResolveInfo) {
    // use info to determine the query
    // console.log(JSON.stringify(info, null, 4));

    const response = await context.db.find(Post, { relations: ['categories'] });
    // console.log('Response😱', JSON.stringify(response, null, 4));
    return response;
  }

  // async categories(parent: any, _: null, context: any) {
  //   const response = await context.db.findOne(Post, parent.id, { relations: ['categories'] });
  //   console.log('Response📛', response);
  //   return response.categories;
  // }
}
