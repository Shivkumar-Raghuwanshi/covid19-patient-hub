import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300 sm:p-6 md:p-8 lg:p-10">
      <div className="flex items-center sm:space-x-6 md:space-x-8 lg:space-x-10">
        <div className="flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <dl>
            <dt className="truncate text-sm font-medium text-gray-500 sm:text-base md:text-lg lg:text-xl">{title}</dt>
            <dd className="mt-1 text-lg font-medium text-gray-900 sm:text-xl md:text-2xl lg:text-3xl">{value.toLocaleString()}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}

export default StatCard;