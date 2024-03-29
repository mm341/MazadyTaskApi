import { Children } from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import createEmotionCache from "../utils/create-emotion-cache";
class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Rubik:wght@100;200;300;400;500;600;700;800;900&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/aos@next/dist/aos.css"
          />
          {/*<link*/}
          {/*    rel="stylesheet"*/}
          {/*    href="https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto+Slab|Roboto:300,400,500,700&display=optional"*/}
          {/*/>*/}

          <meta name="theme-color" content="#111827" />
          <meta name="description" content="Best Food You Can Eat" />
          <meta
            name="keywords"
            content={
              "talabate,talabatee,order,food-delivery,order-Edelivery,delivery,gahez,hungerStation,otlob"
            }
          />
          <script
            type="application/javascript"
            src="https://accounts.google.com/gsi/client"
            async
          />
          {/*<script*/}
          {/*    async*/}
          {/*    defer*/}
          {/*    crossOrigin="anonymous"*/}
          {/*    src="https://connect.facebook.net/en_US/sdk.js"*/}
          {/*/>*/}
        </Head>
        <body  style={{backgroundColor:"#F6F4F5"}}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

CustomDocument.getInitialProps = async (ctx) => {
  const originalRenderPage: any = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => (props: any) =>
        <App emotionCache={cache} {...props} />,
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags],
  };
};

export default CustomDocument;
