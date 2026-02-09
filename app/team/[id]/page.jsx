// In: app/team/[id]/page.jsx

import teamData from '@/components/data/team-data';
import TeamSingle from '@/components/pages/teams/team-single';
import { notFound } from 'next/navigation';

// 1. توليد الميتا داتا ديناميكياً (SEO)
export async function generateMetadata({ params }) {
  const teamMember = teamData.find((member) => member.id === params.id);

  if (!teamMember) {
    return {
      title: 'Team Member Not Found',
    };
  }

  return {
    title: `${teamMember.name} - ${teamMember.position}`,
    description: `Meet ${teamMember.name}, our ${teamMember.position} at Business Setup UAE. Expert guidance for your company formation.`,
    alternates: {
      canonical: `/team/${params.id}`,
    },
    openGraph: {
        title: `${teamMember.name} - ${teamMember.position}`,
        description: `Contact ${teamMember.name} for business setup advice.`,
        images: [
            {
                url: teamMember.image.src, // تأكد أن الصورة تعمل هنا
                width: 800,
                height: 600,
                alt: teamMember.name,
            }
        ]
    }
  };
}

// 2. مكون الصفحة (Server Component)
const TeamMemberPage = ({ params }) => {
    const teamDetails = teamData.find((team) => team.id === params.id);

    // التحقق من وجود العضو
    if (!teamDetails) {
        notFound(); // سيقوم بتشغيل ملف not-found.jsx
    }

    return (
        <>
            {/* تم تمرير البيانات للمكون الذي يعرض التفاصيل */}
            <TeamSingle teamDetails={teamDetails} />
        </>
    );
};

export default TeamMemberPage;