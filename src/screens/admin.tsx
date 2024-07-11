import { useEffect, useState } from "react";
import EventCard from "../components/eventCardAdmin";
import "./admin.css";
import getData from "../utils/eventData";
import getSession from "../utils/getSession";
import getUser from "../utils/getUser";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [eventData, setEventData] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getData()
      .then((data) => setEventData(data))
      .then(() => setLoading(false));

    getSession()
      .then((session) => {
        if (session && session.id !== null && session.id !== undefined) {
          return getUser(session.id);
        }
      })
      .then((user) => {
        if (user.type !== "admin") {
          navigate("/home");
        }
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="event-grid">
          {eventData.map((singleEvent) => (
            <EventCard key={singleEvent.id} singleEvent={singleEvent} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminScreen;
