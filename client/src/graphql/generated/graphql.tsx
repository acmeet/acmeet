import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Availability = {
  __typename?: 'Availability';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  meet: Meet;
  name: Scalars['String'];
  timeslots?: Maybe<Array<Scalars['DateTime']>>;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};

export type Meet = {
  __typename?: 'Meet';
  availabilities?: Maybe<Array<Availability>>;
  createdAt: Scalars['DateTime'];
  dates: Array<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  hours: Array<Scalars['Int']>;
  id: Scalars['ID'];
  isDateAgnostic?: Maybe<Scalars['Boolean']>;
  owner?: Maybe<User>;
  scheduledTime?: Maybe<Array<Scalars['DateTime']>>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAvailability: Availability;
  createMeet: Meet;
  deleteAvailability: Scalars['Boolean'];
  deleteMeet: Scalars['Boolean'];
  scheduleMeet: Scalars['Boolean'];
  updateAvailability?: Maybe<Availability>;
  updateMeet?: Maybe<Meet>;
};


export type MutationCreateAvailabilityArgs = {
  meetId: Scalars['ID'];
  name: Scalars['String'];
  times: Array<Scalars['DateTime']>;
};


export type MutationCreateMeetArgs = {
  dates: Array<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  hours: Array<Scalars['Int']>;
  isDateAgnostic?: Maybe<Scalars['Boolean']>;
  title: Scalars['String'];
};


export type MutationDeleteAvailabilityArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMeetArgs = {
  id: Scalars['ID'];
};


export type MutationScheduleMeetArgs = {
  id: Scalars['ID'];
  scheduledTime?: Maybe<Array<Scalars['DateTime']>>;
};


export type MutationUpdateAvailabilityArgs = {
  id: Scalars['ID'];
  times: Array<Scalars['DateTime']>;
};


export type MutationUpdateMeetArgs = {
  dates?: Maybe<Array<Scalars['DateTime']>>;
  description?: Maybe<Scalars['String']>;
  hours?: Maybe<Array<Scalars['Int']>>;
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  availabilities: Array<Availability>;
  availability: Availability;
  meet?: Maybe<Meet>;
  meets: Array<Meet>;
};


export type QueryAvailabilityArgs = {
  id: Scalars['ID'];
};


export type QueryMeetArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  availabilities: Array<Availability>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  meets: Array<Meet>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CreateAvailabilityMutationVariables = Exact<{
  meetId: Scalars['ID'];
  name: Scalars['String'];
  times: Array<Scalars['DateTime']> | Scalars['DateTime'];
}>;


export type CreateAvailabilityMutation = { __typename?: 'Mutation', createAvailability: { __typename?: 'Availability', id: string, meet: { __typename?: 'Meet', id: string } } };

export type CreateMeetMutationVariables = Exact<{
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  dates: Array<Scalars['DateTime']> | Scalars['DateTime'];
  hours: Array<Scalars['Int']> | Scalars['Int'];
}>;


export type CreateMeetMutation = { __typename?: 'Mutation', createMeet: { __typename?: 'Meet', id: string } };

export type MeetQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MeetQuery = { __typename?: 'Query', meet?: Maybe<{ __typename?: 'Meet', title: string, description?: Maybe<string>, dates: Array<any>, hours: Array<number>, scheduledTime?: Maybe<Array<any>>, availabilities?: Maybe<Array<{ __typename?: 'Availability', timeslots?: Maybe<Array<any>>, name: string }>> }> };


export const CreateAvailabilityDocument = gql`
    mutation CreateAvailability($meetId: ID!, $name: String!, $times: [DateTime!]!) {
  createAvailability(meetId: $meetId, name: $name, times: $times) {
    id
    meet {
      id
    }
  }
}
    `;

export function useCreateAvailabilityMutation() {
  return Urql.useMutation<CreateAvailabilityMutation, CreateAvailabilityMutationVariables>(CreateAvailabilityDocument);
};
export const CreateMeetDocument = gql`
    mutation CreateMeet($title: String!, $description: String, $dates: [DateTime!]!, $hours: [Int!]!) {
  createMeet(
    title: $title
    description: $description
    dates: $dates
    hours: $hours
  ) {
    id
  }
}
    `;

export function useCreateMeetMutation() {
  return Urql.useMutation<CreateMeetMutation, CreateMeetMutationVariables>(CreateMeetDocument);
};
export const MeetDocument = gql`
    query Meet($id: ID!) {
  meet(id: $id) {
    title
    description
    dates
    hours
    scheduledTime
    availabilities {
      timeslots
      name
    }
  }
}
    `;

export function useMeetQuery(options: Omit<Urql.UseQueryArgs<MeetQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeetQuery>({ query: MeetDocument, ...options });
};