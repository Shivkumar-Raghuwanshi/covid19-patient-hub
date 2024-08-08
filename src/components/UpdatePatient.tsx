"use client";

import { useState, useEffect } from "react";
import { Patient, ContactMethod } from "@/types/patient";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapPin,
  Mail,
  AlertCircle,
  ChevronLeft,
  Save,
  Plus,
  Trash2,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function UpdatePatient({ id }: { id: string }) {
  // State variables to manage patient data, loading, and errors
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch patient data when the component mounts
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

  // Handle changes in input fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatient((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  // Handle changes in contact method fields
  const handleContactMethodChange = (index: number, field: keyof ContactMethod, value: string) => {
    setPatient((prev) => {
      if (!prev) return null;
      const updatedContactMethods = [...prev.contactMethods];
      updatedContactMethods[index] = { ...updatedContactMethods[index], [field]: value };
      return { ...prev, contactMethods: updatedContactMethods };
    });
  };

  // Add a new contact method
  const addContactMethod = () => {
    setPatient((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        contactMethods: [...prev.contactMethods, { contactMethod: 'EMAIL', value: '' }],
      };
    });
  };

  // Remove a contact method
  const removeContactMethod = (index: number) => {
    setPatient((prev) => {
      if (!prev) return null;
      const updatedContactMethods = prev.contactMethods.filter((_, i) => i !== index);
      return { ...prev, contactMethods: updatedContactMethods };
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) return;

    try {
      // Send a PATCH request to update the patient data
      const response = await fetch(`/api/patients/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patient),
      });

      if (response.ok) {
        // Navigate to the patient details page on successful update
        router.push(`/patient/${id}`);
      } else {
        setError("Failed to update patient");
      }
    } catch (error) {
      console.error("Error updating patient:", error);
      setError("An error occurred while updating the patient");
    }
  };

  // Render different UI elements based on loading and error states
  if (isLoading) return <PatientUpdateSkeleton />;
  if (error) return <ErrorMessage message={error} />;
  if (!patient) return <ErrorMessage message="Patient not found" />;

  // Render the patient update form
  return (
    <form onSubmit={handleSubmit}>
      {/* Patient name input */}
      <div className="mb-8">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={patient.name}
          onChange={handleInputChange}
          className="mt-1"
        />
      </div>

      {/* Patient address inputs */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
          <MapPin className="mr-3 h-6 w-6 text-blue-500" /> Address
        </h2>
        <div className="space-y-4">
          {/* Address line 1 */}
          <div>
            <Label htmlFor="addressLine1">Address Line 1</Label>
            <Input
              id="addressLine1"
              name="addressLine1"
              value={patient.addressLine1}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          {/* City */}
          <div>
            <Label htmlFor="addressCity">City</Label>
            <Input
              id="addressCity"
              name="addressCity"
              value={patient.addressCity}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          {/* Country */}
          <div>
            <Label htmlFor="addressCountry">Country</Label>
            <Input
              id="addressCountry"
              name="addressCountry"
              value={patient.addressCountry}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          {/* Zip code */}
          <div>
            <Label htmlFor="addressZipCode">Zip Code</Label>
            <Input
              id="addressZipCode"
              name="addressZipCode"
              value={patient.addressZipCode}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Patient contact methods */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
          <Mail className="mr-3 h-6 w-6 text-blue-500" /> Contact Methods
        </h2>
        {/* Render each contact method */}
        {patient.contactMethods.map((contact, index) => (
          <div key={index} className="flex items-center space-x-4 mb-4">
            {/* Contact method type selection */}
            <Select
              value={contact.contactMethod}
              onValueChange={(value) => handleContactMethodChange(index, 'contactMethod', value as 'EMAIL' | 'PHONE')}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select contact type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EMAIL">Email</SelectItem>
                <SelectItem value="PHONE">Phone</SelectItem>
              </SelectContent>
            </Select>
            {/* Contact method value input */}
            <Input
              value={contact.value}
              onChange={(e) => handleContactMethodChange(index, 'value', e.target.value)}
              placeholder={contact.contactMethod === 'EMAIL' ? 'Email address' : 'Phone number'}
              className="flex-grow"
            />
            {/* Remove contact method button */}
            <Button type="button" variant="destructive" onClick={() => removeContactMethod(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {/* Add new contact method button */}
        <Button type="button" variant="outline" onClick={addContactMethod} className="mt-2">
          <Plus className="h-4 w-4 mr-2" /> Add Contact Method
        </Button>
      </div>

      {/* Form actions */}
      <div className="flex justify-between items-center mt-8">
        {/* Back button */}
        <Button
          type="button"
          variant="outline"
          className="flex items-center text-blue-600 border-blue-300 hover:bg-blue-50"
          onClick={() => router.back()}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        {/* Save changes button */}
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>
    </form>
  );
}

// Skeleton loader component for patient update form
function PatientUpdateSkeleton() {
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