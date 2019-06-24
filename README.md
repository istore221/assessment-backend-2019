# Slate backend test assignment (GraphQL)

This repository contains boilerplate for the backend test assignment.
The server uses `Express` and `apollo-server-express` to expose a GraphQL interface. `MongoDB` is used as a database with `mongoose` as ODM.

## Installation (Development)

```sh
git clone https://github.com/istore221/assessment-backend-2019.git
cd assessment-backend-2019
git checkout remotes/origin/kt-assignment-dev

npm install

vi config/default.yaml  #change db.uri to mongodb://localhost:27020/incident-management

npm start
#running at: http://localhost:3000/graphql
```

## Installation (Production)

```sh
git clone https://github.com/istore221/assessment-backend-2019.git
cd assessment-backend-2019
git checkout remotes/origin/kt-assignment-dev
docker-compose up -d
#running at: http://localhost:3000/graphql
```

## Goal

Currently, if you run `npm start`, you will see an error since there are no definitions for Apollo Server. Your task is to create these definitions according to the requirements in [Test assignment](#test-assignment).

When you are done with the test, please send a link to your repo to your recruiter.  Thank you for your time and interest in Slate!

## Test assignment

Using the boilerplate in this repo, expose a GraphQL interface with the following features:

- Raise (create) an incident and assign it to a user with an `Engineer` role
```sh
mutation {
  createIncident (incident: {
    title: "navbar not working on mobile",
  }){
    _id,
    title,
    description,
    assignee,
    status,
    createdAt,
    updatedAt
  }
}
```

- Assign the incident to a user
```sh
mutation {
  assignIncident (
    incident: "5d10ff9d2e095d0d08c84cb7",
    user: "5d10c8cc5680b90599df9041"
  )
}
```

- Acknowledge the incident
```sh
mutation {
  changeIncidentStatus (
    _id: "5d10ff9d2e095d0d08c84cb7",
    status: Acknowledged
  )
}
```

- Resolve the incident
```sh

mutation {
  changeIncidentStatus (
    _id: "5d10ff9d2e095d0d08c84cb7",
    status: Resolved
  )
}
```

- Read details about a certain incident
```sh
{
  incident(_id: "5d10ff9d2e095d0d08c84cb7") {
 	_id,
    title,
    description,
    assignee,
    status,
    createdAt,
    updatedAt
  }
}

```

- Delete an incident

```sh
mutation {
  deleteIncident (_id: "5d10ff9d2e095d0d08c84cb7")
}
```

- Index all incidents in the system
  - This includes filtering by fields, sorting by the date of creation and update and pagination

```sh
{
  incidents (filter: {
	# status: Created
  },options: {
    page: 1,
  	limit: 10,
    sort: { createdAt: "ASC" }
  }) {
   	_id
    title
    assignee
    status
    createdAt
    updatedAt
  }
}
```

`Incident` and `User` models are defined for your convenience. There is no need to wire up the user management system.

## Evaluation

You should spend no more than **4 hours** on this test assignment.

Before you submit the link to your fork with a complete assignment, please make sure your repo contains:

- The code for exposing the GraphQL interface
- A Dockerfile with the code necessary to run your app as a docker container (currently empty)
- Edited `docker-compose.yaml` that includes the reference to your app's docker image along with `mongo`

You are allowed to:

- Add/delete any npm packages as you see fit
- Structure the code in any way you want
- Add any code formatters and linters
- Add configuration variables if needed

You are **not** allowed to:
- Change mongoose models

We will judge your work based on following criteria:
- Code quality, structure and readability
- Amount of boilerplate code
- Usage of new language and framework features to reduce the amount of code written
- Presence of code tests (not required, but is still a big bonus)
- Edge cases coverage (e.g. no user with an Engineer role in the DB)

## Start the development

Make sure you have Node.js v8+ installed.

For your convenience this repository also includes a `docker-compose.yaml` file, which has a mongodb server wired up to the app. `docker-compose up -d` runs in `prestart` hook before `npm start`. If you want to use your own DB setup instead, just delete `prestart` webhook from `package.json`.

Run `npm start` in the root folder of the project to start the development.
