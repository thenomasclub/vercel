// components/EventSlider.js
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { createPortal } from 'react-dom';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function EventSlider() {
  const [events, setEvents] = useState([]);
  const [placeholder, setPlaceholder] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase
        .from('events')
        .select('id, title, date, description, location');

      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data);
      }
    }

    fetchEvents();

    // Try to find the placeholder in DOM
    const interval = setInterval(() => {
      const el = document.querySelector('.event-slider-placeholder');
      if (el) {
        setPlaceholder(el);
        clearInterval(interval);
      }
    }, 100);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  if (!placeholder) return null; // Wait until placeholder exists

  if (events.length === 0)
    return createPortal(<p>No events found.</p>, placeholder);

  const sliderContent = (
    <div className="event-slider auto-scroll">
      {events.map((event) => (
        <div key={event.id} className="event-slide">
          <h4>{event.title}</h4>
          <p>
            {new Date(event.date).toLocaleString('en-GB', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}
          </p>
          <p>{event.location}</p>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  );

  return createPortal(sliderContent, placeholder);
}