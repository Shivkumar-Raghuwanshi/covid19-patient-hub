'use client';

import { useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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

interface CovidMapProps {
  countriesData: CountryData[];
}

export default function CovidMap({ countriesData }: CovidMapProps) {
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/images/leaflet/marker-icon-2x.png',
      iconUrl: '/images/leaflet/marker-icon.png',
      shadowUrl: '/images/leaflet/marker-shadow.png',
    });
  }, []);

  return (
    <div className="h-screen w-full flex flex-col items-center bg-gray-100">
      <header className="bg-blue-600 text-white py-4 w-full text-center shadow-md sm:py-5 md:py-6 lg:py-7">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Covid-19 Global Map</h1>
        <p className="mt-1 text-sm sm:text-base md:text-lg">Visualizing Covid-19 data by country</p>
      </header>
      <div className="flex-grow w-full">
        <MapContainer center={[0, 0] as L.LatLngExpression} zoom={2} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {countriesData.map((country) => (
            <Marker
              key={country.country}
              position={[country.countryInfo.lat, country.countryInfo.long] as L.LatLngExpression}
            >
              <Popup className="sm:max-w-xs md:max-w-sm lg:max-w-md">
                <div className="text-sm sm:text-base md:text-lg text-gray-800">
                  <h3 className="font-semibold sm:text-xl md:text-2xl">{country.country}</h3>
                  <p className="mt-1">Active Cases: <span className="font-medium text-yellow-500">{country.active.toLocaleString()}</span></p>
                  <p>Recovered: <span className="font-medium text-green-500">{country.recovered.toLocaleString()}</span></p>
                  <p>Deaths: <span className="font-medium text-red-500">{country.deaths.toLocaleString()}</span></p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}