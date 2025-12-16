import { useTranslation } from "react-i18next";
import "./About.css";

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="about-container">
      <h1>{t("about")}</h1>
      <p>{t("about_text")}</p>
    </div>
  );
};

export default About;

