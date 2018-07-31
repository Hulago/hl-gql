import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Category } from './category.model';

@Entity()
export class Post {
  @PrimaryGeneratedColumn() id: number;

  @Column() title: string;

  @Column() text: string;

  @ManyToMany(() => Category, (category: Category) => category.posts)
  @JoinTable()
  categories: Category[];
}
