import "bootstrap/dist/css/bootstrap.min.css";
import "./eventCard.css";
import EditWindow from "./editWindow";
import { useState } from "react";
import DeleteWindow from "./deleteWindow";

interface EventProps {
  key: number;
  singleEvent: {
    created_at: Date;
    date: Date;
    description: string;
    id: number;
    image_url: string;
    price: string;
    time_end: string;
    time_start: string;
    title: string;
  };
}

const EventCard = ({ singleEvent }: EventProps) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  return (
    <>
      <div className="event-card">
        <img
          src={singleEvent.image_url}
          className="card-img-top"
          alt={singleEvent.title}
        />
        <div className="card-body">
          <h5 className="card-title">{singleEvent.title}</h5>
          <p className="card-text">{singleEvent.description}</p>
        </div>
        <div className="button-wrapper">
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditing(true);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setDeleting(true);
            }}
          >
            Delete
          </button>
        </div>
      </div>
      {editing && (
        <EditWindow setEditing={setEditing} singleEvent={singleEvent} />
      )}
      {deleting && <DeleteWindow setDeleting={setDeleting} eventId={singleEvent.id}/>}
    </>
  );
};

export default EventCard;
