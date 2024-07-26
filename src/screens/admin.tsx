import { useEffect, useState } from "react";
import EventCard from "../components/eventCardAdmin";
import "./admin.css";
import getData from "../utils/eventData";
import getSession from "../utils/getSession";
import getUser from "../utils/getUser";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import CreateWindow from "../components/createListing";
import supabase from "../utils/supabase"

interface Event {
  created_at: Date;
  date: Date;
  description: string;
  id: number;
  image_url: string;
  price: string;
  time_end: string;
  time_start: string;
  title: string;
}

function AdminScreen() {
  const navigate = useNavigate();


  const [eventData, setEventData] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);


  //@ts-ignore: Unused variable, but needed for db table listener
  const EventsListener = supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "Events" },
      () => {
        setLoading(true);
        getData()
          .then((data) => setEventData(data))
          .then(() => setLoading(false));
      }
    )
    .subscribe();

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
        if (user === undefined || user.type !== "admin") {
          navigate("/home");
        }
      });
  }, []);

  return (
    <div>
      <Button
        className="btn-primary"
        style={{ marginTop: "35px" }}
        onClick={() => {
          setCreating(true);
        }}
      >
        Create Listing
      </Button>
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
      {creating && <CreateWindow setCreating={setCreating} />}
    </div>
  );
}

export default AdminScreen;
