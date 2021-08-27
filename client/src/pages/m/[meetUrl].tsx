import type { NextPage } from "next";
import { useRouter } from "next/router";

const MeetPage: NextPage = () => {
  const router = useRouter();
  const { meetUrl } = router.query;

  return (
    <>
    </>
  );
};

export default MeetPage;