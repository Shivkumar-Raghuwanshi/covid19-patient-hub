import React from 'react';
import CovidMap from '@/components/dashboard/CovidMap';

interface CountryData {
  country: string;
  countryInfo: {
    lat: number;
    long: number;
  };
  cases: number;
  deaths: number;
  recovered: number;
  active: number;
}

function MapSection({ countriesData }: { countriesData: CountryData[] }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md sm:p-6 md:p-8 lg:p-10">
      <div>
        <h3 className="text-lg font-semibold leading-6 text-gray-900 sm:text-xl md:text-2xl">World Map</h3>
        <div className="mt-4 h-72 sm:h-80 md:h-96">{countriesData.length > 0 && <CovidMap countriesData={countriesData} />}</div>
      </div>
    </div>
  );
}

export default MapSection;