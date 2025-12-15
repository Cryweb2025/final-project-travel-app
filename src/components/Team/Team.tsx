import React from "react";
import { useTranslation } from "react-i18next";
import TeamMemberCard from "./TeamMemberCard";
import type { TeamMember } from "../../services/types/teamMember";

// Импорт фотографий команды
import photoVladimir from "../../assets/photos/vladimir.jpg";
import photoYulia from "../../assets/photos/yulia.jpg";
import photoYulianna from "../../assets/photos/yulianna.jpg";
import photoIlyana from "../../assets/photos/ilyana.jpg";
import photoAlexander from "../../assets/photos/alexander.jpg";
import photoYuri from "../../assets/photos/yuri.jpg";

const Team: React.FC = () => {
  // Хук переводов
  const { t } = useTranslation();

  /**
   * Данные команды
   * - name → отображаемое имя (НЕ переводится)
   * - role / description → i18n
   * - badge → опционально (например Team Lead)
   */
  const teamMembers: TeamMember[] = [
    {
      name: "Vladimir",
      badge: "teamlead",
      role: t("team.members.vladimir.role"),
      description: t("team.members.vladimir.description"),
      photo: photoVladimir,
    },
    {
      name: "Yuriy",
      role: t("team.members.yuriy.role"),
      description: t("team.members.yuriy.description"),
      photo: photoYuri,
    },
    {
      name: "Alexander",
      role: t("team.members.alexander.role"),
      description: t("team.members.alexander.description"),
      photo: photoAlexander,
    },
    {
      name: "Ilyana",
      role: t("team.members.ilyana.role"),
      description: t("team.members.ilyana.description"),
      photo: photoIlyana,
    },
    {
      name: "Yulianna",
      role: t("team.members.yulianna.role"),
      description: t("team.members.yulianna.description"),
      photo: photoYulianna,
    },
    {
      name: "Yulia",
      role: t("team.members.yulia.role"),
      description: t("team.members.yulia.description"),
      photo: photoYulia,
    },
  ];

  return (
    <section className="w-full">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* ================= INTRO ================= */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            {t("team.title")}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t("team.subtitle")}
          </p>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t("team.description")}
          </p>
        </div>

        {/* ================= TEAM CARDS ================= */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.name}
              name={member.name}
              role={member.role}
              description={member.description}
              photo={member.photo}
              badge={member.badge}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
