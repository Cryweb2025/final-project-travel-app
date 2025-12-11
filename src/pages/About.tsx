import { useTranslation } from "react-i18next";

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{t("about")}</h1>
      <p>{t("about_text")}</p>
    </div>
  );
};

export default About;

