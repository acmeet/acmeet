import {
  Resolver,
  Query,
  Mutation,
  Args,
  FieldResolver,
  Root,
} from 'type-graphql';

import { Availability } from '@/entities/Availability';
import { AvailabilityIdInput, CreateAvailabilityInput, UpdateAvailabilityInput } from './types';

import { Meet } from '@/entities/Meet';
import { User } from '@/entities/User';
import { Timeslot } from '@/entities/Timeslot';

@Resolver(() => Availability)
export class AvailabilityResolver {
  @FieldResolver()
  meet(@Root() availability: Availability) {
    return Meet.findOne({ id: availability.meetId });
  }

  @FieldResolver()
  user(@Root() availability: Availability) {
    return User.findOne({ id: availability.userId });
  }

  @FieldResolver()
  timeslots(@Root() availability: Availability) {
    return (async () => Timeslot.find({
      select: ['slot'],
      where: { availabilityId: availability.id }
    }).then((timeslots) => timeslots.map(({ slot }) => slot)))();
  }

  // FOR TESTING ONLY
  @Query(() => [Availability])
  async availabilities(): Promise<Availability[]> {
    return Availability.find();
  }

  @Query(() => Availability)
  availability(@Args() { id }: AvailabilityIdInput): Promise<Availability | undefined> {
    return Availability.findOne(id);
  }

  @Mutation(() => Availability)
  async createAvailability(@Args() { meetId, name, times }: CreateAvailabilityInput): Promise<Availability> {
    Availability.validate({ meetId, name, times });

    const availability = await Availability.create({ meetId, name }).save();
    const timeslots: Timeslot[] = times.map((slot) => Timeslot.create({
      slot,
      meetId,
      availabilityId: availability.id,
    }));
    await Timeslot.save(timeslots);
    return availability;
  }

  @Mutation(() => Availability, { nullable: true })
  async updateAvailability(@Args() { id, times }: UpdateAvailabilityInput): Promise<Availability | null> {
    Availability.validate({ id, times });

    const availability = await Availability.findOne(id);
    if (!availability) { return null; };

    const timeslots: Timeslot[] = times.map((slot) => Timeslot.create({
      slot,
      meetId: availability.meetId,
      availabilityId: availability.id,
    }));
    
    await Timeslot.delete({ availabilityId: availability.id });
    availability.timeslots = timeslots;
    return await availability.save();
  }

  @Mutation(() => Boolean)
  async deleteAvailability(@Args() { id }: AvailabilityIdInput): Promise<boolean> {
    await Availability.delete(id);
    return true;
  }
}