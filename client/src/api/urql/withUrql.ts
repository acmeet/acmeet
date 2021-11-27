import { withUrqlClient } from "next-urql";

import { createUrqlClient } from "./createUrqlClient";

export const withUrql = withUrqlClient(createUrqlClient, { ssr: true });