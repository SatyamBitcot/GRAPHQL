import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { v4 as uuidv4 } from "uuid";

// In-memory events database
const events: Array<{
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
}> = [
  {
    id: "1",
    title: "GraphQL Workshop",
    description: "Learn GraphQL",
    date: "2024-12-01",
    location: "Online",
  },
];

// Schema
const typeDefs = gql`
  type Event {
    id: ID!
    title: String!
    description: String!
    date: String!
    location: String!
  }

  type Query {
    events: [Event!]!          
    event(id: ID!): Event      
  }

  type Mutation {
    addEvent(
      title: String!
      description: String!
      date: String!
      location: String!
    ): Event!

    deleteEvent(id: ID!): Event!
  }
`;


const resolvers = {
    Query: {
      events: () => events, // Returns all events
      event: (_: any, { id }: { id: string }) => {
        return events.find((event) => event.id === id); // Find event by ID
      },
    },
    Mutation: {
      addEvent: (_: any, { title, description, date, location }: any) => {
        const newEvent = {
          id: uuidv4(), // Generate a unique ID
          title,
          description,
          date,
          location,
        };
        events.push(newEvent); // Add the new event to the in-memory database
        return newEvent; // Return the created event
      },
      deleteEvent: (_: any, { id }: { id: string }) => {
        const eventIndex = events.findIndex((event) => event.id === id);
        if (eventIndex === -1) {
          throw new Error("Event not found");
        }
        const [deletedEvent] = events.splice(eventIndex, 1); // Remove the event from the in-memory database
        return deletedEvent; // Return the deleted event
      },
    },
  };
  

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(server);
