import "@fontsource-variable/manrope";
import "@fontsource-variable/newsreader";
import "react-phone-input-2/lib/style.css";
import "./globals.css";
import type { Metadata, Viewport } from "next";

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

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#07182f"
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
