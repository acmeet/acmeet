import { Field, ID } from 'type-graphql';

import { User } from '@/entities/User';

export class UserInput implements Partial<User> {
  @Field(() => ID)
  id?: string;

  @Field()
  email?: string;

  @Field()
  name?: string;

  @Field()
  password?: string;
}