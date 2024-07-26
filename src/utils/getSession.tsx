import supabase from "../utils/supabase";

interface User {
  email?: string;
  id?: string;
  user_metadata?: {
    username?: string;
  };
}

async function getSession(): Promise<User | null> {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    console.log(error || "There is no current email provider session");
    return null;
  }
  console.log(session);
  return session.user;
}

export default getSession;
