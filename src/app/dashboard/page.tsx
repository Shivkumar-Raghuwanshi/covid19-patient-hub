'use client';

// Import necessary dependencies
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Import custom components
import Header from '@/components/dashboard/Header';
import StatCardGrid from '@/components/dashboard/StatCardGrid';
import ChartSection from '@/components/dashboard/ChartSection';
import MapSection from '@/components/dashboard/MapSection';

// Register the required chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Define the types for the data structures
interface WorldwideData {
 cases: number;
 deaths: number;
 recovered: number;
}

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

interface HistoricalData {
 cases: { [date: string]: number };
 deaths: { [date: string]: number };
 recovered: { [date: string]: number };
}

// Main component that renders the dashboard
export default function DashboardPage() {
 // State variables to hold the data
 const [worldwideData, setWorldwideData] = useState<WorldwideData | null>(null);
 const [countriesData, setCountriesData] = useState<CountryData[]>([]);
 const [historicalData, setHistoricalData] = useState<HistoricalData | null>(null);
 const [selectedTab, setSelectedTab] = useState('cases');

 // Fetch the data from the API when the component mounts
 useEffect(() => {
   const fetchData = async () => {
     try {
       // Make multiple API calls in parallel using Promise.all()
       const [worldwideRes, countriesRes, historicalRes] = await Promise.all([
         axios.get('https://disease.sh/v3/covid-19/all'),
         axios.get('https://disease.sh/v3/covid-19/countries'),
         axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all'),
       ]);

       // Update the state variables with the fetched data
       setWorldwideData(worldwideRes.data);
       setCountriesData(countriesRes.data);
       setHistoricalData(historicalRes.data);
     } catch (error) {
       console.error('Error fetching data:', error);
     }
   };

   fetchData();
 }, []);

 // Render the dashboard components
 return (
   <div className="space-y-6 p-2 sm:p-8 md:p-6 bg-gray-50 min-h-screen">
     <Header />
     <StatCardGrid worldwideData={worldwideData} />
     <ChartSection historicalData={historicalData} selectedTab={selectedTab} onTabChange={setSelectedTab} />
     <MapSection countriesData={countriesData} />
   </div>
 );
}