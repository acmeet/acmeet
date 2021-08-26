import 'reflect-metadata';
import { config } from './config';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';

import { MeetResolver, AvailabilityResolver } from './resolvers';

const _start = async () => {
  await createConnection();

  const app = express();

  const schema = await buildSchema({
    resolvers: [
      MeetResolver,
      AvailabilityResolver,
    ],
    dateScalarMode: 'isoDate',
    validate: false, // doesnt work or something idk
  });

  const server = new ApolloServer({
    schema,
  });

  // https://github.com/nestjs/graphql/pull/1627
  await server.start();

  server.applyMiddleware({
    app,
  });

  app.listen(config.port, () => {
    console.log(`server started on port ${config.port}`)
  })
};

_start().catch((e) => console.log(e));