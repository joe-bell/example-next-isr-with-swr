import Document, { Html, Head, Main, NextScript } from "next/document";
import { config } from "@/config";
import { title } from "process";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="robots" content="noindex" />
          <title>{config.title}</title>
          <meta name="twitter:site" content={config.twitter} />
          <meta name="twitter:creator" content={config.twitter} />

          <meta property="og:title" content={title} />
          <meta property="og:description" content={config.description} />
          <meta name="description" content={config.description} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
