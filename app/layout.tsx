import "@fontsource-variable/manrope";
import "@fontsource-variable/newsreader";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.princeprogramme.com"),
  title: "Prince Programme United Kingdom",
  description:
    "Foundation programme for students from Central Asia preparing for study at leading universities in the United Kingdom.",
  openGraph: {
    title: "Prince Programme United Kingdom",
    description:
      "Academic Foundation pathway connecting Central Asian students with UK colleges and universities.",
    images: ["/images/hero-campus.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
