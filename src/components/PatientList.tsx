'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Patient } from '@/types/patient';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2, Eye, UserPlus, AlertCircle, Loader2, Users } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function PatientList() {
  // State variables to manage patients, loading, and errors
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);

  // Fetch patients when the component mounts
  useEffect(() => {
    fetch('/api/patients')
      .then(response => response.json())
      .then(data => {
        setPatients(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
        setError('Failed to fetch patients');
        setIsLoading(false);
      });
  }, []);

  // Delete a patient
  const deletePatient = async (id: string) => {
    try {
      const response = await fetch(`/api/patients/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setPatients(patients.filter(pat => pat.id !== id));
      } else {
        throw new Error('Failed to delete patient');
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
      setError('Failed to delete patient');
    }
  };

  // Handle delete button click
  const handleDeleteClick = (patient: Patient) => {
    setPatientToDelete(patient);
    setIsDeleteDialogOpen(true);
  };

  // Confirm patient deletion
  const confirmDelete = async () => {
    if (patientToDelete) {
      await deletePatient(patientToDelete.id);
      setIsDeleteDialogOpen(false);
      setPatientToDelete(null);
    }
  };

  // Render different UI states based on loading and error
  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-5xl mx-auto shadow-md rounded-lg overflow-hidden">
        {/* Patient list header */}
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 py-4 sm:py-6 px-4 sm:px-8">
          <CardTitle className="text-xl sm:text-2xl font-semibold text-white flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
              Patient Directory
            </div>
            {/* Add patient button */}
            <Link href="/add-patient" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 transition-colors duration-300">
                <UserPlus className="h-4 w-4 mr-2" /> Add Patient
              </Button>
            </Link>
          </CardTitle>
        </CardHeader>
        {/* Patient list content */}
        <CardContent className="p-0">
          {/* Render empty state if no patients */}
          {patients.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-gray-700 py-4 px-4 sm:px-6 lg:px-8">Name</TableHead>
                    <TableHead className="font-semibold text-gray-700 px-4 sm:px-6 lg:px-8">Patient ID</TableHead>
                    <TableHead className="text-right font-semibold text-gray-700 px-4 sm:px-6 lg:px-8">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Render each patient */}
                  {patients.map(patient => (
                    <TableRow key={patient.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <TableCell className="font-medium text-gray-900 px-4 sm:px-6 lg:px-8">{patient.name}</TableCell>
                      <TableCell className="text-gray-600 px-4 sm:px-6 lg:px-8">{patient.id}</TableCell>
                      <TableCell className="text-right px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row justify-end gap-2">
                          {/* View patient button */}
                          <Link href={`/patient/${patient.id}`} className="w-full sm:w-auto">
                            <Button variant="outline" size="sm" className="w-full sm:w-auto text-blue-600 border-blue-300 hover:bg-blue-50">
                              <Eye className="h-4 w-4 mr-1" /> View
                            </Button>
                          </Link>
                          {/* Delete patient button */}
                          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(patient)} className="w-full sm:w-auto bg-red-500 hover:bg-red-600">
                                <Trash2 className="h-4 w-4 mr-1" /> Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the patient
                                  {patientToDelete && ` ${patientToDelete.name}`} and remove their data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Loading state component
function LoadingState() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
        <p className="text-gray-600">Loading patients...</p>
      </div>
    </div>
  );
}

// Error state component
function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
      <p className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</p>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}

// Empty state component
function EmptyState() {
  return (
    <div className="text-center py-12 sm:py-16 px-4">
      <Users className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
      <p className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">No Patients Found</p>
      <p className="text-gray-600 mb-6">Get started by adding your first patient to the system.</p>
      <Link href="/add-patient" className="inline-block">
        <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300">
          <UserPlus className="h-5 w-5 mr-2" /> Add Your First Patient
        </Button>
      </Link>
    </div>
  );
}