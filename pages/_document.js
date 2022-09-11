import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="theme-color" content="#ED1D24" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/marvel-wiki-icon-192.png" />
        <link
          rel="Marvel Wiki fav icon"
          type="image/x-icon"
          href="/favicon.ico"
        />
        <link
          href="https://fonts.googleapis.com/css?family=PT+Sans:400,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}