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

function UserScreen() {
  const [eventData, setEventData] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getData()
      .then((data) => setEventData(data))
      .then(() => setLoading(false));
  }, []);

  return loading ? (
    <div>loading</div>
  ) : (
    <div>
      User
      <div className="event-grid">
        {eventData.map((singleEvent) => {
          return <EventCard key={singleEvent.id} singleEvent={singleEvent} />;
        })}
      </div>
    </div>
  );
}

export default UserScreen;
