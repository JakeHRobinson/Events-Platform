import { useEffect, useState } from "react";
import supabase from "../utils/supabase";

function AdminScreen() {
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

  return <div>{JSON.stringify(eventData)}</div>;
}

export default AdminScreen;
