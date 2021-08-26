import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { Meet } from './Meet';
import { Availability } from './Availability';

import { validateUser } from '../models/user/user.validator';


@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;
  
  @Field()
  @CreateDateColumn()
  readonly createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt!: Date;

  @Field()
  @Column({ unique: true })
  readonly email!: string;

  @Column()
  password!: string;

  @Field()
  @Column()
  name!: string;

  @Field(() => [Meet])
  @OneToMany(() => Meet, (meet) => meet.owner)
  meets!: Meet[];

  @Field(() => [Availability])
  @OneToMany(() => Availability, (availability) => availability.user)
  availabilities!: Availability[];

  static validate = validateUser;
}