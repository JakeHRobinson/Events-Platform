import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import EventCard from "../components/eventCard";
import './admin.css'

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

  useEffect(() => {
    async function getData() {
      const { data, error } = await supabase.from("Events").select("*");

      if (error) {
        console.log(error);
      }
      return data || [];
    }

    getData().then((data) => setEventData(data));
  }, []);

  return (
    <div className='event-grid'>
      {eventData.map((singleEvent) => {
        return <EventCard key={singleEvent.id} singleEvent={singleEvent}/>;
      })}
    </div>
  );
}

export default AdminScreen;
