import { ArgsType, Field, GraphQLISODateTime, ID, Int } from 'type-graphql';

import { Meet } from '../../entities/Meet';

export class MeetInput implements Partial<Meet> {
  @Field(() => ID)
  id?: string;
  
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [GraphQLISODateTime], { nullable: true })
  dates?: Date[];

  @Field({ defaultValue: false })
  isDateAgnostic?: boolean;

  @Field(() => [Int], { nullable: true })
  hours?: number[];

  @Field(() => [GraphQLISODateTime], { defaultValue: null, nullable: true })
  scheduledTime!: Date[];
}

@ArgsType()
export class MeetIdInput implements Partial<MeetInput> {
  @Field(() => ID)
  id!: string;
}

@ArgsType()
export class CreateMeetInput implements Partial<MeetInput> {  
  @Field()
  title!: string;

  @Field({ defaultValue: '' })
  description?: string;

  @Field(() => [GraphQLISODateTime])
  dates!: Date[];

  @Field({ defaultValue: false })
  isDateAgnostic?: boolean;

  @Field(() => [Int])
  hours!: number[];
}

@ArgsType()
export class UpdateMeetInput implements Partial<MeetInput> {
  @Field(() => ID)
  id!: string;
  
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [GraphQLISODateTime], { nullable: true })
  dates?: Date[];

  @Field(() => [Int], { nullable: true })
  hours?: number[];
}

@ArgsType()
export class ScheduleMeetInput implements Partial<MeetInput> {
  @Field(() => ID)
  id!: string;

  @Field(() => [GraphQLISODateTime], { defaultValue: null, nullable: true })
  scheduledTime!: Date[];
}