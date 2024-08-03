import { useEffect, useState } from "react";
import singleEventData from "../utils/singleEventData";
import { useParams } from "react-router-dom";
import "./eventScreen.css";
import { Button } from "react-bootstrap";
import getSession from "../utils/getSession";
import getUser from "../utils/getUser";
import supabase from "../utils/supabase";
import getAccessToken from "../utils/getAccessToken";
import requestGoogleProviderToken from "../utils/getProviderToken";

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

interface User {
  id: number;
  created_at: Date;
  username: string;
  email: string;
  type: string;
  uuid: string;
  event_sign_ups: number[];
}

interface UserSession {
  email?: string;
  id?: string;
  user_metadata?: {
    username?: string;
  };
  identities?: {
    identity_id: string;
    provider_id: string;
    access_token: string;
    provider: string;
  }[];
}

interface Session {
  access_token?: string;
  provider_token?: string | null;
  refresh_token?: string;
  token_type?: string;
  user?: UserSession;
}

function EventScreen() {
  const [event, setEvent] = useState<SingleEvent>();
  const [loading, setLoading] = useState<boolean>(false);
  const [signedUp, setSignedUp] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [userEvents, setUserEvents] = useState<number[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  let { id } = useParams();

  useEffect(() => {
    setLoading(true);
    if (id) {
      singleEventData(id)
        .then((data) => {
          if (data) {
            setEvent(data[0]);
            setLoading(false);
          }
        })
        .then(() => {
          return getSession();
        })
        .then((session) => {
          if (session && session.id) {
            return getUser(session.id);
          }
        })
        .then((user) => {
          setUserEvents(user.event_sign_ups);
          setUser(user);
        });
    }

    getAccessToken().then((session) => {
      if (session !== null && session !== undefined) {
        setSession(session);
      }
    });
  }, []);

  const linkIdentity = async () => {
    const redirect =
      import.meta.env.VITE_ENVIRONMENT === "development"
        ? `http://localhost:5173/event/${id}`
        : `https://business-events-platform.netlify.app/event/${id}`;

    const scopes = [
      "profile",
      "email",
      "openid",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/calendar",
    ].join(" ");

    const { data, error } = await supabase.auth.linkIdentity({
      provider: "google",
      options: {
        scopes: scopes,
        redirectTo: redirect,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      console.log(error);
    } else {
      return data;
    }
  };

  const signedUpCheck = async () => {
    if (event && event.id && userEvents.includes(event.id)) {
      setSignedUp(true);
    } else {
      setSignedUp(false);
    }
  };

  const addToGoogleCalendar = async () => {
    console.log("adding to calendar");
    const providerToken = session?.provider_token
      ? session.provider_token
      : session?.access_token;
    if (event !== null && event !== undefined) {
      const eventObject = {
        summary: event.title,
        description: event.description,
        start: {
          dateTime: new Date(`${event.date}T${event.time_start}`).toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          dateTime: new Date(`${event.date}T${event.time_end}`).toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      };

      await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + providerToken,
          },
          body: JSON.stringify(eventObject),
        }
      )
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          if (data.error) {
            alert("There was a problem adding to your calendar");
            console.log(data.error);
          } else {
            alert("Success, please check your google calendar!");
          }
        });
    }
  };

  const signupHandler = async (user: User) => {
    setDisabled(true);

    try {
      const { error } = await supabase.rpc("increment_sign_ups", {
        x: 1,
        event_id: event?.id,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (event?.id && !userEvents.includes(event.id)) {
        const updatedUserSignUps = [...userEvents, event?.id];
        const { error } = await supabase
          .from("Users")
          .update({ event_sign_ups: updatedUserSignUps })
          .eq("id", user.id);

        if (error) {
          throw new Error(error.message);
        }

        setUserEvents(updatedUserSignUps);
        setDisabled(false);
      } else {
        alert("You have already signed up to this event!");
        setDisabled(false);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong, please try again in a few moments");
      setDisabled(false);
    }
  };

  // below function needed for testing, it unlinks any google provider accounts from an email provider account.

  // const unlinkHandler = async () => {

  //   const googleIdentities = session?.user?.identities.find(
  //     (identity) => identity.provider === "google"
  //   );
  //   // console.log(identities);
  //   const { error } = await supabase.auth.unlinkIdentity(googleIdentities);
  // };

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
          <Button
            onClick={() => {
              if (session) {
                signedUpCheck().then(() => {
                  if (user && signedUp === false) {
                    signupHandler(user);
                  } else {
                    alert("You're already signed up to this event!");
                  }
                });
              } else {
                alert("Please login to book an event");
              }
            }}
            disabled={disabled}
          >
            Book now
          </Button>
          <Button
            onClick={async () => {
              if (!session) {
                alert("Please log in to continue.");
              } else if (
                !session.user?.identities?.find(
                  (identity) => identity.provider.toLowerCase() === "google"
                )
              ) {
                try {
                  linkIdentity().then((data) => {
                    console.log(data?.provider, "<----------------");
                  });
                } catch (error) {
                  console.error("Failed to link Google account:", error);
                  alert(
                    "Failed to link your Google account. Please try again."
                  );
                }
              } else {
                console.log(session, "you fucked up ");
                addToGoogleCalendar();
              }
            }}
          >
            Add to Google Calendar
          </Button>
          {/* <Button onClick={unlinkHandler}>unlink</Button> */}
        </div>
      </div>
    )
  );
}

export default EventScreen;
