import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { styles } from "@/styles";

export const AppShell: React.FC = ({ children }) => (
  <React.Fragment>
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
              <button className={styles.button.github}>View Source</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <main className={`${styles.container} mt-8`}>{children}</main>
  </React.Fragment>
);
