import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Prince Programme",
    short_name: "Prince Programme",
    description:
      "Foundation-программа для подготовки студентов из Центральной Азии к поступлению в университеты Великобритании.",
    start_url: "/",
    display: "standalone",
    background_color: "#07182f",
    theme_color: "#07182f",
    lang: "ru-RU",
    categories: ["education"]
  };
}
