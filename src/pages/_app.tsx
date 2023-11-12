import { type AppType } from "next/app";
import { Quicksand, Montserrat } from 'next/font/google'

import { api } from "~/utils/api";

import "~/styles/globals.css";

const montserratFont = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

const quickFont = Quicksand({
  subsets: ['latin'],
  variable: '--font-quick',
})

const MyApp: AppType = ({ Component, pageProps }) => {
  return <>
    <style jsx global>
      {`
          :root {
            --font-montserrat: ${montserratFont.style.fontFamily};
            --font-quick: ${quickFont.style.fontFamily};
          }
        `}
    </style>
    <Component {...pageProps} />
  </>
};

export default api.withTRPC(MyApp);
