import React from "react";
import { PUBLIC_STATS } from "../constants/publicStats";

const ProofBar = () => {
  const {
    udemyLearners,
    udemyPublicReviews,
    udemyLectures,
    tiktokFollowers,
    tiktokLikes,
    studyMaterialYears,
  } = PUBLIC_STATS;

  const proofItems = [
    {
      value: `${udemyLearners}+`,
      label: "Udemy Learners",
      href: "https://www.udemy.com/user/ntlakanipho-mgaguli/",
    },
    {
      value: `${udemyPublicReviews}`,
      label: "Public Reviews",
      href: "https://www.udemy.com/user/ntlakanipho-mgaguli/",
    },
    {
      value: `${udemyLectures}`,
      label: "Course Lectures",
      href: "https://www.udemy.com/user/ntlakanipho-mgaguli/",
    },
    {
      value: `${tiktokFollowers}+`,
      label: "TikTok Followers",
    },
    {
      value: `${tiktokLikes}+`,
      label: "TikTok Likes",
    },
    {
      value: studyMaterialYears,
      label: "Study Material Contributions",
    },
  ];

  return (
    <section id="proof" className="px-6 py-10">
      <div className="max-w-7xl mx-auto rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-sm">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y md:divide-y-0 divide-white/10 md:divide-x divide-white/10">
          {proofItems.map((item) => {
            const content = (
              <div className="px-4 py-6 text-center">
                <p className="text-2xl md:text-3xl font-bold text-white font-mono">
                  {item.value}
                </p>
                <p className="text-xs uppercase tracking-wider text-slate-500 mt-2">
                  {item.label}
                </p>
              </div>
            );

            if (!item.href) {
              return <div key={item.label}>{content}</div>;
            }

            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-white/5 transition-colors duration-300"
              >
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProofBar;
