import "@fontsource-variable/manrope";
import "@fontsource-variable/newsreader";
import "react-phone-input-2/lib/style.css";
import "./globals.css";
import type { Metadata, Viewport } from "next";

const siteUrl = "https://princeprogramme.com";
const title = "Prince Programme | Foundation в Великобритании";
const description =
  "Подготовьтесь к поступлению в престижные университеты Великобритании и других стран всего за 18 недель по стандартам A-level, ещё до окончания школы.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Prince Programme",
  authors: [{ name: "Prince Programme", url: siteUrl }],
  creator: "Prince Programme",
  publisher: "Prince Programme",
  category: "education",
  keywords: [
    "Foundation в Великобритании",
    "Prince Programme",
    "подготовка к университету Великобритании",
    "обучение в Великобритании",
    "поступление в университет Великобритании",
    "Foundation для студентов Центральной Азии",
    "A-level",
    "колледжи Великобритании"
  ],
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: "Prince Programme",
    title,
    description,
    images: [
      {
        url: "/images/hero-campus.png",
        width: 1536,
        height: 1024,
        alt: "Студенты Prince Programme в британском кампусе"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/hero-campus.png"]
  },
  manifest: "/manifest.webmanifest",
  other: {
    "geo.region": "UZ",
    "geo.placename": "Central Asia"
  }
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "EducationalOrganization"],
      "@id": `${siteUrl}/#organization`,
      name: "Prince Programme",
      alternateName: "Prince Foundation Programme в Центральной Азии",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/prince-logo.webp`,
        width: 554,
        height: 450
      },
      image: `${siteUrl}/images/hero-campus.png`,
      email: "info@princeconsult.com",
      telephone: "+998971248881",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "admissions",
        telephone: "+998971248881",
        email: "info@princeconsult.com",
        availableLanguage: ["Russian", "Uzbek", "English"]
      },
      sameAs: ["https://t.me/princeprogramme_ca", "https://www.instagram.com/princeprogramme/"],
      areaServed: [
        { "@type": "Country", name: "Узбекистан" },
        { "@type": "Country", name: "Казахстан" },
        { "@type": "Country", name: "Кыргызстан" },
        { "@type": "Country", name: "Таджикистан" },
        { "@type": "Country", name: "Туркменистан" }
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Prince Programme",
      description,
      inLanguage: "ru-RU",
      publisher: { "@id": `${siteUrl}/#organization` }
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: title,
      description,
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#organization` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/hero-campus.png`,
        width: 1536,
        height: 1024
      }
    }
  ]
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
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
