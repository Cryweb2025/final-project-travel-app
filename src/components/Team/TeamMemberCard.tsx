import React from "react";
import "./Team.css";

interface TeamMemberCardProps {
  name: string;
  role: string;
  description: string;
  photo?: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  role,
  description,
  photo,
}) => {
  const initial = name.charAt(0);

  return (
    <div className="team-card">
      <div className="team-avatar">
        {photo ? (
          <img src={photo} alt={name} />
        ) : (
          <span>{initial}</span>
        )}
      </div>
      <div className="team-info">
        <h3 className="team-name">{name}</h3>
        <p className="team-role">{role}</p>
        <p className="team-description">{description}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
