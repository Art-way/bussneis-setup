// In: app/team/page.jsx

import TeamPageComponent from '@/components/pages/teams/team';
import teamData from '@/components/data/team-data'; // Import data for schema

// --- ADDED: Metadata for the main Team page ---
export const metadata = {
  title: "Our Expert Team | Business Setup UAE Consultants",
  description: "Meet the expert team at Business Setup UAE. Our consultants specialize in mainland and free zone company formation, providing professional guidance for your business.",
  alternates: {
    canonical: "/team",
  },
  other: {
    "script[type='application/ld+json']": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Our Expert Team",
      "description": "Meet the consultants and specialists at Business Setup UAE.",
      // Using ItemList to list the team members on this page
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": teamData.map((member, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Person",
            "name": member.name,
            "jobTitle": member.position,
            "url": `https://businesssetupuae.ae/team/${member.id}`
          }
        }))
      }
    })
  }
};

const Team = () => {
    return (
        <>
            <TeamPageComponent />
        </>
    );
};

export default Team;