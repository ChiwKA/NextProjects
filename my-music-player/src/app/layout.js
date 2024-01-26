import { Inter } from "next/font/google";
import "./globals.css";
import '@fortawesome/fontawesome-svg-core/styles.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My music player",
  description: "by Wunwun",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
