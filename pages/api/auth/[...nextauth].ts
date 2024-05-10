import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-email",
  "streaming",
  "user-read-private",
  "user-library-read",
  "user-top-read",
  "app-remote-control",
  "streaming",
  "user-read-playback-position",
  "user-top-read",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-follow-read"
].join(",");

const params = {
  scope: scopes,
};

const LOGIN_URL = `https://accounts.spotify.com/authorize?${params.scope}`.toString();

console.log("LOGIN URL = ", LOGIN_URL);
console.log("Scopes = ", params.scope);

// @ts-expect-error
async function refreshAccessToken(token) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        // @ts-expect-error
        new Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
    // @ts-expect-error
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
      client_id: process.env.SPOTIFY_CLIENT_ID
    }),
  });

  const data = await response.json();

  console.log("DATA FOR TOKEN = ", data)

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? token.refreshToken,
    accessTokenExpires: Date.now() + data.expires_in * 1000,
  };
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID ?? "",
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
      authorization: { params: { scope: params.scope.toString() }},
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // @ts-expect-error
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at;

        return token;
      }

      if (Date.now() < token.accessTokenExpires * 1000) {
        return token;
      }

      return refreshAccessToken(token);
    },
    // @ts-expect-error
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      console.log("SESSION TOKEN = ", token)
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export default NextAuth(authOptions);
