import { ConnectionManager, Connection, createConnection, getConnection, EntityManager } from 'typeorm';
import { Post } from '../models/post.model';

export class PostResolver {
  constructor(private entityManager: EntityManager) {}

  posts() {
    return this.entityManager.find(Post);
  }
}
