import { Resolver } from 'type-graphql';

@Resolver()
export class UserResolver {
  
}

// import {
//   Arg,
//   Mutation,
//   Resolver,
// } from 'type-graphql';

// import { User } from '../../entities/User';

// @Resolver(() => User)
// export class UserResolver {
//   @Mutation(() => TBD)
//   async register(
//     @Arg('email') email: string,
//     @Arg('password') password: string,
//   ): Promise<TBD> {
//      // validate user
//      // validate unhashed password
//      // hash password
//      // update user
//      // 
//   }
// }
