import * as React from "react";
import Link from "next/link";
import Head from "next/head";
import { styles } from "@/styles";
import { config } from "@/config";

export const AppShell: React.FC = ({ children }) => (
  <React.Fragment>
    <Head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="robots" content="noindex" />

      <title>{config.title}</title>
      <meta name="twitter:site" content={config.twitter} />
      <meta name="twitter:creator" content={config.twitter} />

      <meta property="og:title" content={config.title} />
      <meta property="og:description" content={config.description} />
      <meta name="description" content={config.description} />
    </Head>
    <header className="border-b border-gray-200 py-2">
      <div className={styles.container}>
        <nav>
          <ul className="flex items-center justify-between">
            <li>
              <Link href="/">
                <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Home
                </a>
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/joe-bell/example-next-isr-with-swr"
                className={styles.button.primary}
              >
                View Source
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <main className={`${styles.container} mt-8`}>{children}</main>
  </React.Fragment>
);
