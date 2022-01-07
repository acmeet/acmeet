<div align="center">
<img src="client/public/logo.svg" width="150" />

<h1>acmeet</h1>

<strong>meeting scheduling</strong>

<div>
<img alt="lines of code badge" src="https://tokei.rs/b1/github/acmeet/acmeet" />
</div>
  
</div>

## about

acmeet is a website for scheduling meetings.

The frontend is built with **[Next.js](https://nextjs.org/)**, **[Typescript](https://www.typescriptlang.org/)**, and **[React](https://reactjs.org/)**, using **[SCSS](https://www.typescriptlang.org/)** and **[CSS Modules](https://github.com/css-modules/css-modules)** for styling, along with extensive use of **[CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)**. **[urql](https://formidable.com/open-source/urql/)** is used to perform GraphQL queries. All components are built and styled from scratch (`@_--react-calendar` is created by me).

The backend is a **[GraphQL](https://graphql.org/)** server written in **Typescript** and **[Node.js](https://nodejs.org/)**, built atop **[Apollo Server](https://github.com/apollographql/apollo-server)** and **[Express](https://expressjs.com/)**. **[TypeGraphQL](https://typegraphql.com/)** is used to describe the GraphQL API. The server communicates with a **[PostgreSQL](https://www.postgresql.org/)** database built with **[TypeORM](https://typeorm.io/)**.

## features

- properly implemented dark mode
- create a meeting
- add availabilities to a meeting
- check availability for given response
- check number of responders available at a given time

## design space

acmeet is a web application for assisting groups of people in finding times to schedule meetings. In this domain, there are already several other applications that fulfill this niche, primarily [when2meet](https://when2meet.com) and [LettuceMeet](https://lettucemeet.com), and to a lesser extent [When is Good](https://whenisgood.net/) and [Vailable](https://www.vailable.io/).

// TODO

## todo

- clean up the codebase lol

### frontend

- touch events
- better mobile support in general
- "preview" change with click and drag when adding availability
- not ugly text inputs (see material ui)
- edit meets
- schedule meets

### backend

- redis caching layer
- rate limiting
- user auth (email / login with google)
  - gcal integration

## architecture notes

acmeet is created as a personal project for better familiarizing myself with various technologies such as GraphQL, PostgreSQL, TypeORM, and TypeGraphQL. If this application was to be built with being a website with an actual userbase in mind, it would have been written in Rust, and used a key value database (which better fits the needs of the application), such as MongoDB.

In a similar vein, acmeet is designed with minimizing server operations in mind so as to avoid hosting costs. This results in incredibly _inefficient_ communication between the client and server, as well as complicating the rendering of data on the client side. It also means the data validation server side sucks. It's also why acmeet only supports 30 minute increments, even though, at least personally, 15 minutes would be preferred.
