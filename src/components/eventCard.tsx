import "bootstrap/dist/css/bootstrap.min.css";
import "./eventCard.css";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return (
    <div
      className="event-card-user"
      onClick={() => {
        navigate(`/event/${singleEvent.id}`);
        localStorage.setItem('currentEvent', JSON.stringify(singleEvent));
      }}
    >
      <img
        src={singleEvent.image_url}
        className="card-img-top-user"
        alt={singleEvent.title}
      />
      <div className="body-footer-wrapper">
        <div className="card-body">
          <h5 className="card-title">{singleEvent.title}</h5>
          <p className="card-text">{singleEvent.description}</p>
        </div>
        <div className="card-footer">
          <p>Price: {singleEvent.price}</p>
          <p>
            {new Date(singleEvent.date).toDateString().slice(0, 3)},
            {new Date(singleEvent.date).toDateString().slice(3, 10)} @
            {Number(singleEvent.time_start.slice(0, 2)) < 12
              ? Number(singleEvent.time_start.slice(0, 2)) < 10
                ? " " + singleEvent.time_start.slice(1, 2) + "am"
                : " " + singleEvent.time_start.slice(0, 2) + "am"
              : " " + (Number(singleEvent.time_start.slice(0, 2)) - 12) + "pm"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
