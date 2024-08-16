import supabase from "../utils/supabase";

interface User {
  email?: string;
  id?: string;
  user_metadata?: {
    username?: string;
  };
}

interface Session {
  app_metadata: {
    provider: string;
    providers?: string[];
  };
  access_token?: string;
  provider_token?: string | null;
  refresh_token?: string;
  token_type?: string;
  user?: User;
}

async function getAccessToken(): Promise<Session | null> {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    console.log(error || "There is no current session", session);
    return null;
  }
  //   console.log(session);
  return session;
}

export default getAccessToken;
