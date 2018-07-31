import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { Category } from './category.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn() id: number;

  @Column() title: string;

  @Column() text: string;

  // @ManyToMany(() => Category, category => category.posts)
  // @JoinTable()
  // categories: Category[];
}
