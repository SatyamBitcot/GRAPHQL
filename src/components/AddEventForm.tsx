'use client';

import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// Mutation for adding an event
const ADD_EVENT = gql`
  mutation AddEvent($title: String!, $description: String!, $date: String!, $location: String!) {
    addEvent(title: $title, description: $description, date: $date, location: $location) {
      id
      title
      description
      date
      location
    }
  }
`;

// Query to refetch the events
const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      title
      description
      date
      location
    }
  }
`;

export default function AddEventForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
  });

  const [addEvent, { loading, error }] = useMutation(ADD_EVENT, {
    refetchQueries: [{ query: GET_EVENTS }],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addEvent({ variables: { ...formData } });

    // Reset the form
    setFormData({
      title: '',
      description: '',
      date: '',
      location: '',
    });
  };

  return (
    <div className="container">
      <h1>Add a New Event</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Event'}
        </button>
        {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      </form>
    </div>
  );
}
