import type { AppProps } from 'next/app'

import "../styles/global.css";

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps}/>
    </>
  )
}

export default MyApp
