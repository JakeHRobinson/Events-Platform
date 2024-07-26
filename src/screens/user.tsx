import { useEffect, useState } from "react";
import EventCard from "../components/eventCard";
import "./admin.css";
import getData from "../utils/eventData";
import supabase from "../utils/supabase";
import getSession from "../utils/getSession";
import { useSession } from "@supabase/auth-helpers-react";

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

interface User {
  email?: string;
  id?: string;
  user_metadata?: {
    username?: string;
  };
}

function UserScreen() {

  const [eventData, setEventData] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currSession, setCurrSession] = useState<User | null>(null);

  async function databaseCheck() {
    const { data, error } = await supabase
      .from("Users")
      .select("*")
      .eq("uuid", currSession?.id);

    if (data?.length === 0) {
      addUser();
    } else if (error) {
      console.log(error);
    }
  }

  async function addUser() {
    const { error } = await supabase.from("Users").insert([
      {
        username: currSession?.user_metadata?.username,
        email: currSession?.email,
        uuid: currSession?.id,
        type: "personal",
      },
    ]);

    if (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    getData()
      .then((data) => setEventData(data))
      .then(() => setLoading(false));
    getSession().then((userSession) => {
      setCurrSession(userSession);
    });
  }, []);

  useEffect(() => {
    if (currSession !== null) {
      databaseCheck();
    }
  }, [currSession]);

  return loading ? (
    <div>loading</div>
  ) : (
    <div className="event-grid">
      {eventData.map((singleEvent) => {
        return <EventCard key={singleEvent.id} singleEvent={singleEvent} />;
      })}
    </div>
  );
}

export default UserScreen;
