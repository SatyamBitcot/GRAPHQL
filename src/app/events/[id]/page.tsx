'use client';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_EVENTS = gql`
  query GetEvent($id: ID!) {
    event(id: $id) {
      id
      title
      description
      date
      location
    }
  }
`;

export default function EventDetails({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data, loading, error } = useQuery(GET_EVENTS, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { title, description, date, location } = data.event;

  return (
    <div className="container">
      <h1>{title}</h1>
      <p>
        <strong>Description:</strong> {description}
      </p>
      <p>
        <strong>Date:</strong> {date}
      </p>
      <p>
        <strong>Location:</strong> {location}
      </p>
    </div>
  );
}
