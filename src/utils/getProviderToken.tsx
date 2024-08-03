import axios from 'axios';

interface SupabaseSession {
  user: {
    identities: {
      identity_id: string;
      provider_id: string;
      access_token: string;
      provider: string
    }[];
    // Other session properties...
  };
}

async function requestGoogleProviderToken(session: SupabaseSession): Promise<string | null> {
  const apiKey = import.meta.env.VITE_SUPABASE_KEY; // Fetching the Supabase API key from environment variables
  const projectId = 'business-events-website'; // Replace with your Google Cloud project ID
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:verifyAssertion?key=${apiKey}&project=${projectId}`;

  // Find the index of the Google identity
  const googleIdentityIndex = session.user.identities.findIndex(identity => identity.provider === 'google');

  if (googleIdentityIndex === -1) {
    console.error('Google identity not found in session');
    return null;
  }

  const googleIdentity = session.user.identities[googleIdentityIndex];
  const requestBody = {
    idToken: googleIdentity.access_token, // Using the access token as the ID token
    postBody: JSON.stringify({ provider: 'google.com', accessToken: googleIdentity.access_token }),
    returnSecureToken: false, // We're not interested in a new ID token
    returnIdpCredential: true, // Request the original access token
  };

  try {
    const response = await axios.post(url, requestBody);
    if (response.data && response.data.idToken) {
      return response.data.idToken; // Return the provider token
    } else {
      console.error('No provider token found in response');
      return null;
    }
  } catch (error) {
    console.error('Error requesting provider token:', error);
    return null;
  }
}

export default requestGoogleProviderToken;