import { useEffect, useState } from "react";
import EventCard from "../components/eventCard";
import "./admin.css";
import getData from "../utils/eventData";

interface Event {
  created_at: Date;
  date: Date;
  description: string;
  id: number;
  image_url: string;
  price: string;
  time_end: Date;
  time_start: Date;
  title: string;
}

function AdminScreen() {
  const [eventData, setEventData] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getData()
      .then((data) => setEventData(data))
      .then(() => setLoading(false));
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>Admin</div>
          <div className="event-grid">
            {eventData.map((singleEvent) => (
              <EventCard key={singleEvent.id} singleEvent={singleEvent} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AdminScreen;
