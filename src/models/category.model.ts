import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Post } from './post.model';
import { Location } from './location.model';

@Entity()
export class Category {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;

  @ManyToMany(() => Post, post => post.categories)
  posts: Post[];

  @Column() locationId: number;

  @ManyToOne(type => Location, location => location.categories)
  location: Location;
}
