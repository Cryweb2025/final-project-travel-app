import React from "react";
import { useTranslation } from "react-i18next";

interface TeamMemberCardProps {
  name: string;
  role: string;
  description: string;
  photo?: string;
  badge?: "teamlead";
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  role,
  description,
  photo,
  badge,
}) => {
  const { t } = useTranslation();
  const initial = name.charAt(0).toUpperCase();

  return (
    <div
      className="
        rounded-2xl border p-5
        bg-white border-slate-100 shadow-sm
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg
        dark:bg-slate-900 dark:border-slate-800 dark:shadow-black/20
      "
    >
      <div className="flex items-center gap-4">
        {/* ===== PHOTO (hover ТОЛЬКО тут) ===== */}
        <div
          className="
            w-24 h-32 rounded-xl
            flex items-center justify-center
            bg-gradient-to-tr from-sky-500 to-emerald-500
            text-white text-2xl font-bold
            overflow-hidden shrink-0
            transition-transform duration-300
            hover:scale-110
          "
        >
          {photo ? (
            <img
              src={photo}
              alt={name}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            <span>{initial}</span>
          )}
        </div>

        <div className="min-w-0">
          {/* Имя + бейдж */}
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              {name}
            </h3>

            {badge === "teamlead" && (
              <span
                className="
                  inline-flex items-center
                  rounded-full px-2 py-0.5 text-[11px] font-semibold
                  bg-amber-100 text-amber-800
                  dark:bg-amber-900/30 dark:text-amber-200
                "
              >
                {t("team.badges.teamlead")}
              </span>
            )}
          </div>

          <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
            {role}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {description}
      </p>
    </div>
  );
};

export default TeamMemberCard;
