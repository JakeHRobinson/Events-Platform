import "bootstrap/dist/css/bootstrap.min.css";
import "./eventCard.css";

interface EventProps {
  key: number;
  singleEvent: {
    created_at: Date;
    date: Date;
    description: string;
    id: number;
    image_url: string;
    price: string;
    time_end: Date;
    time_start: Date;
    title: string;
  };
}

const EventCard = ({ singleEvent }: EventProps) => {
  return (
    <div className="event-card-user">
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
          <p>{new Date(singleEvent.date).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
