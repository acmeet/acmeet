import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  RelationId,
} from 'typeorm';

import { Availability } from './Availability';
import { Meet } from './Meet';

@Entity()
export class Timeslot extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @CreateDateColumn()
  readonly createdAt!: Date;

  @UpdateDateColumn()
  readonly updatedAt!: Date;

  @ManyToOne(() => Availability, (availability) => availability.timeslots, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'availabilityId' })
  readonly availability!: Availability;
  @Column('uuid')
  @RelationId((timeslot: Timeslot) => timeslot.availability)
  readonly availabilityId!: string;

  @ManyToOne(() => Meet, (meet) => meet.timeslots, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'meetId' })
  readonly meet!: Meet;
  @Column('uuid')
  @RelationId((timeslot: Timeslot) => timeslot.meet)
  readonly meetId!: string;

  @Column('timestamptz')
  slot!: Date;
}