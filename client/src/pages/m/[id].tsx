import type { NextPage } from "next";

import Head from '@/layout/head';
import Meet from '@/sections/meet';

import { useRedirect } from "@/hooks/useRedirect";
import { withUrql } from "@/api/urql/withUrql";
import { useSanitizedMeetData } from "@/sections/meet/hooks/useSanitizedMeetData";
import { useUrlId } from "@/api/hooks/useUrlId";
import { useMeetQuery } from "@/graphql";

const MeetPage: NextPage = () => {
  const meetId = useUrlId();

  // query id and return meet
  const [{ data, error, fetching }] = useMeetQuery({
    pause: meetId === undefined,
    variables: { id: meetId as string }
  });
  
  useRedirect('/404', !fetching && error !== undefined, [error, fetching]);

  const sanitizedData = useSanitizedMeetData({ data });
  
  return (
    <>
      <Head title={sanitizedData.title} />
      <Meet data={sanitizedData} meetId={meetId} />
    </>
  );
};

export default withUrql(MeetPage);