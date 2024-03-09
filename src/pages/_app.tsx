import "@/styles/globals.css";
import React, { useMemo, useState } from "react";
import createEmotionCache from "@/utils/create-emotion-cache";
import { CacheProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "../theme/index";
import { Box, Container, CssBaseline } from "@mui/material";

import "../language/i18n";
import { persistor, store } from "../redux/store";
import { useTranslation } from "react-i18next";
import Router, { useRouter } from "next/router";

import "../styles/nprogress.css";
import nProgress from "nprogress";
import "simplebar-react/dist/simplebar.min.css";

import type {} from "@mui/lab/themeAugmentation";
// When using TypeScript 3.x and below
import "@mui/lab/themeAugmentation";

import { PersistGate } from "redux-persist/integration/react";
import { RTL } from "@/Components/GlobalComponent/RTL/RTL";
import ScrollToTop from "@/Components/GlobalComponent/scroll-top/ScrollToTop";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);
const clientSideEmotionCache = createEmotionCache();
export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps | any) {
  //  hooks

  const { t } = useTranslation();
  const [languagedirection, setlanguagedirection] = useState<string>("");

  //  custom theme
  const theme = useMemo(
    () =>
      createTheme({
        direction: languagedirection,
      }),
    [languagedirection]
  );
  const getLayout = Component.getLayout ?? ((page: any) => page);
  const queryClient = new QueryClient();

  return (
    <CacheProvider value={emotionCache}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Toaster
                toastOptions={{
                  className: "",
                }}
                containerStyle={{
                  zIndex: 1000000,
                  position: "sticky",
                }}
              />
              <Head>
              <title>{t("Mazady")}</title>
              </Head>

              <Box
                sx={{
                  mt: "48px",

                  mb: "5rem",
                }}
              >
                <ScrollToTop />
                {/* <DynamicFavicon /> */}
                <Container>{getLayout(<Component {...pageProps} />)}</Container>
              </Box>
              {/* <Footer /> */}
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </CacheProvider>
  );
}
