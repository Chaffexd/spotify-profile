import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta property="og:locale" content="en_GB" />
        <meta name="author" content="Shane Chaffe" />
        <meta property="og:image:width" content="920" />
        <meta property="og:image:height" content="470" />
        <meta
          property="og:site_name"
          content="A Spotify Profile project using the Spotify API"
        />
        <meta
          name="keywords"
          content="JavaScript developer, TypeScript developer, Web developer"
        />
      </Head>
      <body className="bg-gray-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
