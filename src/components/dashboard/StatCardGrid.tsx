import React from 'react';
import StatCard from '@/components/dashboard/StatCard';

interface WorldwideData {
  cases: number;
  deaths: number;
  recovered: number;
}

function StatCardGrid({ worldwideData }: { worldwideData: WorldwideData | null }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {worldwideData && (
        <>
          <StatCard title="Total Cases" value={worldwideData.cases} icon={<CaseIcon />} />
          <StatCard title="Total Deaths" value={worldwideData.deaths} icon={<DeathIcon />} />
          <StatCard title="Total Recovered" value={worldwideData.recovered} icon={<RecoveredIcon />} />
        </>
      )}
    </div>
  );
}

function CaseIcon() {
  return (
    <svg className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function DeathIcon() {
  return (
    <svg className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function RecoveredIcon() {
  return (
    <svg className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default StatCardGrid;