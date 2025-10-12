import React from "react";
import { useTranslation } from "react-i18next";

// StatsCards.jsx
// Responsive 4-card stats section using Tailwind CSS v4
// Drop this file into your React project (e.g. src/components/StatsCards.jsx)
// Usage: <StatsCards />

const cards = [
  {
    id: 1,
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 21v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    value: "1000+",
    titleKey: "landingstats.satisfiedClients",
  },
  {
    id: 2,
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l3 3 7 1-4 4 1 7-6-3-6 3 1-7-4-4 7-1 3-3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    value: "1000+",
    titleKey: "landingstats.projectsCompleted",
  },
  {
    id: 3,
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l9 4-9 4-9-4 9-4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 10v10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 14l5 3 5-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    value: "15+",
    titleKey: "landingstats.industryCertifications",
  },
  {
    id: 4,
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 17l6-6 4 4 8-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    value: "99%",
    titleKey: "landingstats.clientSatisfaction",
  },
];

export default function Statistics() {
  const { t } = useTranslation();
  return (
    <section className="bg-gray-50 py-6 sm:py-10 xl:py-20 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className=" lg:w-10/12 xl:max-w-7xl mx-auto ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
        
        
        lg:gap-6  gap-2">
          {cards.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow"
            >
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-14  h-14 rounded-lg bg-emerald-50 text-emerald-700">
                  {c.icon}
                </div>
              </div>

              <div className="lg:text-2xl xl:text-3xl text-xl font-extrabold text-slate-900">{c.value}</div>
              <div className="mt-3 line-clamp-1 text-sm text-slate-600">{t(c.titleKey)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
