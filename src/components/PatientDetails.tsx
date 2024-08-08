"use client";

// Import necessary dependencies and components
import { useState, useEffect } from "react";
import {Patient} from "@/types/patient"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CountryFlag } from "./CountryFlag";
import { useRouter } from 'next/navigation';
import {
  User,
  MapPin,
  Mail,
  Phone,
  AlertCircle,
  ChevronLeft,
  Building,
  Globe,
  MapPinned,
  Briefcase,
  Edit,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Main component to display patient details
export default function PatientDetails({ id }: { id: string }) {
  // State hooks for managing patient data, loading state, and errors
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  // Fetch patient data when component mounts or id changes
  useEffect(() => {
    fetch(`/api/patients/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPatient(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching patient:", error);
        setError("Failed to fetch patient details");
        setIsLoading(false);
      });
  }, [id]);

  const handleUpdateClick = () => {
    router.push(`/patient/${id}/update`);
  };

  // Render loading skeleton, error message, or patient details based on state
  if (isLoading) return <PatientDetailSkeleton />;
  if (error) return <ErrorMessage message={error} />;
  if (!patient) return <ErrorMessage message="Patient not found" />;

  // Render patient details
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-6 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl mx-auto mt-4 shadow-lg rounded-lg overflow-hidden bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 sm:p-8">
          <CardTitle className="text-2xl sm:text-3xl font-bold flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white p-3 rounded-full mr-4 sm:mr-6 shadow-lg">
                <User className="h-8 sm:h-12 w-8 sm:w-12 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{patient.name}</h1>
                <p className="text-sm sm:text-lg text-blue-200 mt-1 sm:mt-2 flex items-center">
                  <Briefcase className="h-4 sm:h-5 w-4 sm:w-5 mr-2" /> Patient
                </p>
              </div>
            </div>
            <CountryFlag country={patient.addressCountry} size="md" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center text-gray-800">
              <MapPin className="mr-2 sm:mr-3 h-5 sm:h-6 w-5 sm:w-6 text-blue-500" /> Address
            </h2>
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg space-y-2">
              <p className="flex items-center text-sm sm:text-base text-gray-700">
                <Building className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5 text-blue-500" /> {patient.addressLine1}
              </p>
              <p className="flex items-center text-sm sm:text-base text-gray-700">
                <MapPinned className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5 text-blue-500" /> {patient.addressCity}
              </p>
              <p className="flex items-center text-sm sm:text-base text-gray-700">
                <Globe className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5 text-blue-500" /> {patient.addressCountry}
              </p>
              <p className="flex items-center text-sm sm:text-base text-gray-700">
                <MapPin className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5 text-blue-500" /> {patient.addressZipCode}
              </p>
            </div>
          </div>

          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center text-gray-800">
              <Mail className="mr-2 sm:mr-3 h-5 sm:h-6 w-5 sm:w-6 text-blue-500" /> Contact Methods
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {patient.contactMethods.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-50 p-3 sm:p-4 rounded-lg"
                >
                  {contact.contactMethod === "EMAIL" ? (
                    <Mail className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5 text-blue-500" />
                  ) : (
                    <Phone className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5 text-green-500" />
                  )}
                  <span className="text-sm sm:text-base text-gray-700">{contact.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 sm:mt-8">
            <Link href="/">
              <Button
                variant="outline"
                className="flex items-center text-blue-600 border-blue-300 hover:bg-blue-50 mb-4 sm:mb-0 py-2 px-4 sm:py-3 sm:px-6"
              >
                <ChevronLeft className="mr-2 h-4 sm:h-4 w-4 sm:w-4" /> Back to List
              </Button>
            </Link>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 sm:py-3 sm:px-6"
              onClick={handleUpdateClick}
            >
              <Edit className="mr-2 h-4 sm:h-4 w-4 sm:w-4" /> Update Patient
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Skeleton component for loading state
function PatientDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-4xl mx-auto mt-8 shadow-lg rounded-lg overflow-hidden bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8">
          <Skeleton className="h-12 w-2/3" />
        </CardHeader>
        <CardContent className="p-8">
          <Skeleton className="h-8 w-1/4 mb-4" />
          <Skeleton className="h-32 w-full mb-8 rounded-lg" />
          <Skeleton className="h-8 w-1/4 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
          <Skeleton className="h-10 w-32 mt-8" />
        </CardContent>
      </Card>
    </div>
  );
}

// Error message component
function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <AlertCircle className="text-red-500 w-12 h-12 mb-3 mx-auto" />
        <p className="text-lg font-medium text-gray-800">{message}</p>
      </div>
    </div>
  );
}