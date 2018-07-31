import { ConnectionManager, Connection, createConnection, getConnection, EntityManager } from 'typeorm';
import { Category } from '../models/category.model';
import { Post } from '../models/post.model';
import { Location } from '../models/location.model';

const DataLoader = require('dataloader');

export class CategoriesResolver {
  locationLoader: any;
  db: EntityManager;

  constructor(db: EntityManager) {
    this.db = db;

    this.locationLoader = new DataLoader((ids: Number[]) => {
      console.log('Call this', ids);
      return this.db.getRepository(Location).findByIds(ids);
    });
  }

  location(parent: any, _: null, context: any) {
    console.log('get locations 👀', parent);
    return this.locationLoader.load(parent.locationId);
  }

  categories(parent: any, _: null, context: any) {
    context.db.getRepository(Category);
    // return context.db.find(Post);
    return [{ id: 1, name: 'test' }];
  }
}
