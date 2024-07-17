import { useEffect, useState } from "react";
import singleEventData from "../utils/singleEventData";
import { useParams } from "react-router-dom";
import "./eventScreen.css";
import { Button } from "react-bootstrap";

interface SingleEvent {
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

function EventScreen() {
  const [event, setEvent] = useState<SingleEvent>();
  const [loading, setLoading] = useState<boolean>(false);
  let { id } = useParams();

  useEffect(() => {
    setLoading(true);
    if (id) {
      singleEventData(id).then((data) => {
        if (data) {
          setEvent(data[0]);
          setLoading(false);
        }
      });
    }
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    event && (
      <div className="single-event-card-body">
        <img src={event.image_url} />
        <div className="single-event-content-wrapper">
          <div className="title-description">
            <h2>{event.title}</h2>
            <p className="event-description">{event.description}</p>
          </div>
          <div className="price-date">
            <p>Price: {event.price}</p>
            <p>
              Date:{" "}
              {new Date(event.date).toLocaleDateString("en-GB", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          {event.price.toString().includes("£") ? (
            <Button>Sign up and pay</Button>
          ) : (
            <Button>Sign up</Button>
          )}
        </div>
      </div>
    )
  );
}

export default EventScreen;
