import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { ObjectType, Field, ID, GraphQLISODateTime } from "type-graphql";

import { User } from './User';
import { Meet } from './Meet';
import { Timeslot } from './Timeslot';

import { validateAvailability } from '@/models/availability/validator';
import { updateById } from '@/utils/updateAndReturnEntity';

@ObjectType()
@Entity()
export class Availability extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Field()
  @CreateDateColumn()
  readonly createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt!: Date;

  @Field(() => Meet)
  @ManyToOne(() => Meet, (meet) => meet.availabilities, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'meetId' })
  readonly meet!: Meet;
  @Column('uuid')
  @RelationId((availability: Availability) => availability.meet)
  readonly meetId!: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.availabilities)
  @JoinColumn({ name: 'userId' })
  readonly user?: User;
  @Column('uuid', { nullable: true })
  @RelationId((availability: Availability) => availability.user)
  readonly userId?: string;

  @Column({ nullable: true })
  password?: string;

  @Field()
  @Column()
  name!: string;

  @Field(() => [GraphQLISODateTime], { defaultValue: [] })
  @OneToMany(() => Timeslot, (timeslot) => timeslot.availability, { cascade: ['insert'] })
  timeslots!: Timeslot[];

  static validate = validateAvailability;

  static updateById (id: Parameters<typeof updateById>[1], fields: Parameters<typeof updateById>[2]) {
    return updateById<Availability, Availability['id']>(this, id as any, fields);
  }
}