import Link from 'next/link';
import { useMutation, gql } from '@apollo/client';

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
};

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


const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      id
      title
    }
  }
`;

export default function EventList({ events }: { events: Event[] }) {
  const [deleteEvent] = useMutation(DELETE_EVENT, {
    refetchQueries: [{ query: GET_EVENTS }],
  });


  const handleDelete = async (id: string) => {
    try {
      await deleteEvent({ variables: { id } });
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="container">
      <h1>Upcoming Events</h1>
      <ul>
        {events.map((event: Event) => (
          <li key={event.id}>
            <h2>
              <Link href={`/events/${event.id}`}>{event.title}</Link>
            </h2>
            <p>
              <strong>Date:</strong> {event.date}
            </p>
            <p>
              <strong>Location:</strong> {event.location}
            </p>
            <button className='button' onClick={() => handleDelete(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
