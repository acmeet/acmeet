import { 
  Resolver,
  Query,
  Mutation,
  Args,
  FieldResolver,
  Root
} from 'type-graphql';
import { getManager } from 'typeorm';

import { Meet } from '@/entities/Meet';
import { MeetIdInput, CreateMeetInput, ScheduleMeetInput, UpdateMeetInput } from './types';

import { Availability } from '@/entities/Availability';
import { User } from '@/entities/User';

import { url } from '@/utils/url';

import { DATE_AGNOSTIC_MEET_DATES } from '@/common/constants';


@Resolver(() => Meet)
export class MeetResolver {
  @FieldResolver()
  owner(@Root() meet: Meet) {
    return User.findOne({ id: meet.id });
  }

  @FieldResolver()
  availabilities(@Root() meet: Meet) {
    return Availability.find({ meetId: meet.id });
  }

  // FOR TESTING ONLY
  @Query(() => [Meet])
  async meets(): Promise<Meet[]> {
    return Meet.find();
  }

  @Query(() => Meet, { nullable: true })
  meet(@Args() { id }: MeetIdInput): Promise<Meet | undefined> {
    return Meet.findOne(id);
  }

  @Mutation(() => Meet)
  async createMeet(@Args() { ...fields }: CreateMeetInput): Promise<Meet> {
    Meet.validate(fields);
    if (fields.isDateAgnostic) fields.dates = DATE_AGNOSTIC_MEET_DATES;
    return Meet.create({ ...fields, url: url() }).save();
  }

  @Mutation(() => Meet, { nullable: true })
  async updateMeet(@Args() { id, ...fields }: UpdateMeetInput): Promise<Meet | null> {
    Meet.validate({ id, ...fields })
    const meet = await Meet.findOne(id);
    if (!meet) { return null; }
    
    if (meet.isDateAgnostic) { fields.dates = DATE_AGNOSTIC_MEET_DATES; }
    
    const res = await Meet.updateById({ id }, { ...fields, scheduledTime: null });
    await getManager().query(updateAvailabilitiesQuery, [id]);

    return res;
  }

  @Mutation(() => Boolean)
  async deleteMeet(@Args() { id }: MeetIdInput): Promise<boolean> {
    await Meet.delete(id);
    return true;
  }

  @Mutation(() => Boolean)
  async scheduleMeet(@Args() { id, scheduledTime }: ScheduleMeetInput): Promise<boolean> {
    Meet.validate({ scheduledTime });
    const meet = await Meet.findOne(id);
    if (!meet) { return false; }

    await Meet.updateById({ id }, { scheduledTime });
    return true;
  }
}

// culls out all associated availabilities' timeslots that are outside of the new dates/hours
// playground: http://sqlfiddle.com/#!15/349f7/1
// typeorm snake_cases table names (see the migration files), so Meet -> meet, Timeslot -> timeslot
// need to quote `meetId`: https://github.com/typeorm/typeorm/issues/2763#issuecomment-419601525
const updateAvailabilitiesQuery =
`WITH
  props AS ( SELECT * FROM meet WHERE id = $1 ),
  hours AS ( SELECT hours FROM props ),
  dates AS ( SELECT dates FROM props )
SELECT ts.* FROM props, timeslot ts WHERE (
  ts."meetId" = props.id
  AND NOT
  ts.slot <@ ANY (
    SELECT TSTZRANGE(
      n + INTERVAL '1 hour' * hours[1],
      n + INTERVAL '1 hour' * hours[2],
      '[)'
    )
    FROM hours, UNNEST(dates) AS n
  )
);`