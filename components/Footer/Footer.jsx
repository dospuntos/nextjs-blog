import { useTranslation } from "react-i18next";
import packageJson from "../../package.json";
import { GrFacebookOption, GrTwitter, GrLinkedinOption } from "react-icons/gr";

export default function Footer() {
  let d = new Date();
  let year = d.getFullYear();
  const { t } = useTranslation();

  return (
    <div className="footer pure-g">
      <div className="pure-u-1 pure-u-md-2-3">
        Copyright &copy; {year} Dos Puntos Design. <br />
        <em>NO 998 051 002 MVA</em>
        <br />
        {t("copyright")} <small>v. {packageJson.version}</small>
      </div>
      <div className="pure-u-1 pure-u-md-1-3 text-right">
        <ul className="social-links ">
          <li>
            <a
              href="https://facebook.com/dospuntosdesign"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GrFacebookOption />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/dospuntosdesign"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GrTwitter />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/company/3092605"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GrLinkedinOption />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
