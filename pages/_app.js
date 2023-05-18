import "../styles/globals.css";
import "../styles/nprogress.css";
import store from "../redux/store";
import { Provider } from "react-redux";
import Navbar from "../components/Navbar";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Footer from "../components/Footer";
import { SessionProvider } from "next-auth/react";
import Social from "../utils/Socials";
import Script from "next/script";
import Head from "next/head";
import { useCookies } from "react-cookie";
import axios from "axios";
import { StyledEngineProvider } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import NProgress from "nprogress";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const queryClient = new QueryClient();
  const router = useRouter();

  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    router.events.on("routeChangeStart", NProgress.start);
    router.events.on("routeChangeComplete", NProgress.done);
    router.events.on("routeChangeError", NProgress.done);
    return () => {
      router.events.off("routeChangeStart", NProgress.start);
      router.events.off("routeChangeComplete", NProgress.done);
      router.events.off("routeChangeError", NProgress.done);
    };
  }, []);

  const [cookie, setCookie, removeCookie] = useCookies(["jwt"]);
  axios.defaults.headers.common["authorization"] = `Bearer ${cookie.jwt}`;

  return (
    <div className="">
      <Head>
        <title>TBFE - {pageProps.title}</title>
        <link rel="icon" type="image/jpg" href={`/site-light-chopped.jpg`} />
        <meta name="description" content={`${pageProps.summery}`} />
        <meta name="keywords" content={pageProps.keywords} />
        <meta property="og:title" content={`TBFE - ${pageProps.title}`} />
        <meta property="og:description" content={`${pageProps.summery}`} />
        <meta property="og:type" content={`${pageProps.type}`} />
        <meta property="og:site_name" content="TheBlogForEverything" />
        <meta property="og:image" content={`${pageProps.image}`} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:image:alt" content={`${pageProps.title}`} />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="400" />
        {pageProps.id ? (
          <meta
            property="og:url"
            content={`https://www.theblogforeverything.com/post/${pageProps.id}`}
          />
        ) : (
          <meta
            property="og:url"
            content={`https://www.theblogforeverything.com/${pageProps.parameter}`}
          />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TBFEpage" />
        <meta name="twitter:title" content={`${pageProps.title}`} />
        <meta name="twitter:description" content={`${pageProps.summery}`} />
        <meta name="twitter:image" content={`${pageProps.image}`} />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-PKPENVER0M"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-PKPENVER0M');
                `}
      </Script>

      <div className=" font-poppins">
        <StyledEngineProvider injectFirst>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <SessionProvider session={session}>
                <Navbar />
                <div className="mt-12">
                  <Component {...pageProps} />
                </div>
                {!(
                  router.pathname === "/register" ||
                  router.pathname === "/signin"
                ) && (
                  <>
                    <Footer />
                    <Social />
                  </>
                )}
              </SessionProvider>
            </Provider>
          </QueryClientProvider>
        </StyledEngineProvider>
      </div>
    </div>
  );
}

export default MyApp;
