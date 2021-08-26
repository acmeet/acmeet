import { Field, ID, GraphQLISODateTime, ArgsType } from 'type-graphql';

import { Availability } from '../../entities/Availability';

export class AvailabilityInput implements Partial<Availability> {
  @Field(() => ID)
  id?: string;
  
  @Field(() => ID)
  meetId?: string;

  @Field()
  name?: string;

  @Field(() => [GraphQLISODateTime])
  times?: Date[];
}

@ArgsType()
export class AvailabilityIdInput implements Partial<AvailabilityInput> {
  @Field(() => ID)
  id!: string;
}

@ArgsType()
export class CreateAvailabilityInput implements Partial<AvailabilityInput> {
  @Field(() => ID)
  meetId!: string;

  @Field()
  name!: string;

  @Field(() => [GraphQLISODateTime])
  times!: Date[];
}

@ArgsType()
export class UpdateAvailabilityInput implements Partial<AvailabilityInput> {
  @Field(() => ID)
  id!: string;

  @Field(() => [GraphQLISODateTime])
  times!: Date[];
}