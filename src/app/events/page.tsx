'use client';

import AddEventForm from "@/components/AddEventForm";
import EventList from "@/components/EventList";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

// GraphQL Query
const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      title
      date
      location
    }
  }
`;

export default function EventsPage() {
  const { data, loading, error } = useQuery(GET_EVENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Events</h1>
      <EventList events={data.events} />
      <h2>Add Event</h2>
      <AddEventForm />
    </div>
  );
}
