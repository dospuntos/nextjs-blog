import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();
  let location = useRouter();
  let title = "";
  let image = "/img/hero-image.jpg";

  switch (location.pathname) {
    case "/about":
      title = t("aboutTitle");
      image = "/img/hero-image-about.jpg";
      break;
    case "/services":
      title = t("servicesTitle");
      image = "/img/hero-image-services.jpg";
      break;
    case "/contact":
      title = t("contactTitle");
      image = "/img/hero-image-contact.jpg";
      break;
    default:
      title = "";
      image = "/img/hero-image.jpg";
  }

  return (
    <div className="heroImage wrapper-large">
      <h1>{title}</h1>
      <img src={image} alt={title} />
    </div>
  );
}
