import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Category } from './category.model';

@Entity()
export class Location {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;

  @Column() lat: number;

  @Column() long: number;

  @OneToMany(type => Category, category => category.location)
  categories: Category[];
}
