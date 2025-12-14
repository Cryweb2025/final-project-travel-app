import React from "react";
import TeamMemberCard from "./TeamMemberCard";
import "./Team.css";

const teamMembers = [
  {
    name: "Yuriy",
    role: "Contact Form",
    description: "Responsible for developing the contact form.",
  },
  {
    name: "Vladimir",
    role: "Login & Registration",
    description: "Responsible for login, registration, and account panel.",
    photo: "/images/vladimir.jpg",
  },
  {
    name: "Ilyana",
    role: "Weather & Routes",
    description: "Responsible for weather and route features.",
  },
  {
    name: "Yulianna",
    role: "Team Section",
    description: "Responsible for the team section of the website.",
    photo: "/images/yulianna.jpg",
  },
  {
    name: "Alexander",
    role: "Homepage & Languages",
    description: "Responsible for the homepage and language switching.",
  },
  {
    name: "Yulia",
    role: "Hot Tours",
    description: "Responsible for hot tours, descriptions, prices, and countries.",
    photo: "/images/yulia.jpg",
  },
  {
    name: "Andrey",
    role: "Reviews",
    description: "Responsible for the reviews section.",
  },
];

const Team: React.FC = () => {
  return (
    <div className="team-container">
      <div className="team-intro">
        <h2 className="team-title">Our Team</h2>
        <p className="team-subtitle">
          Our advisor team is a tight-knit group with one goal: making travelers happy!  
          No matter how unusual your travel wishes are or how tight your schedule is,  
          we work out the perfect solution for you.
        </p>
        <p className="team-description">
          Each of our advisors visits their destinations 2–3 times a year, as well as other interesting travel countries,  
          to explore new regions and check the quality of hotels offered there for you.
        </p>
      </div>

      <div className="team-cards">
        {teamMembers.map((member) => (
          <TeamMemberCard
            key={member.name}
            name={member.name}
            role={member.role}
            description={member.description}
            photo={member.photo}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;
