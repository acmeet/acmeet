import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { ObjectType, Field, ID, Int, GraphQLISODateTime } from 'type-graphql';

import { User } from './User';
import { Availability } from './Availability';
import { Timeslot } from './Timeslot';

import { validateMeet } from '@/models/meet/validator';
import { updateById } from '@/utils/updateAndReturnEntity';

@ObjectType()
@Entity()
export class Meet extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Field(() => String)
  @Column({ unique: true })
  readonly url!: string;

  @Field()
  @CreateDateColumn()
  readonly createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt!: Date;

  @Field()
  @Column()
  title!: string;

  @Field({ defaultValue: '' })
  @Column({ default: '' })
  description?: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.meets)
  @JoinColumn({ name: 'ownerId' })
  readonly owner?: User;
  @Column('uuid', { nullable: true })
  @RelationId((meet: Meet) => meet.owner)
  readonly ownerId?: string;

  @Field(() => [GraphQLISODateTime])
  @Column('timestamptz', { array: true })
  dates!: Date[];

  @Field({  defaultValue: false })
  @Column({ default: false })
  readonly isDateAgnostic!: boolean;
  
  @Field(() => [Int])
  @Column('integer', { array: true })
  hours!: number[]; // UTC

  @Field(() => [GraphQLISODateTime], { defaultValue: null, nullable: true })
  @Column('timestamptz', { array: true, nullable: true })
  scheduledTime?: Date[] | null;

  @Field(() => [Availability], { defaultValue: [] })
  @OneToMany(() => Availability, (availability) => availability.meet)
  availabilities!: Availability[];

  @OneToMany(() => Timeslot, (timeslot) => timeslot.meet)
  timeslots!: Timeslot[];

  static validate = validateMeet;

  static updateById (id: Parameters<typeof updateById>[1], fields: Parameters<typeof updateById>[2]) {
    return updateById<Meet, Meet['id']>(this, id as any, fields);
  }
}
