import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';

// GET route to fetch a patient by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get the user ID from the auth context
    const { userId } = auth();
    if (!userId) {
      // If the user is not authenticated, return a 401 Unauthorized response
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch the patient by the provided ID
    const patient = await prisma.patient.findUnique({
      where: { id: params.id },
    });

    if (!patient) {
      // If the patient is not found, return a 404 Not Found response
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }

    // Return the patient data
    return NextResponse.json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    // If an error occurs, return a 500 Internal Server Error response
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE route to delete a patient by ID
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get the user ID from the auth context
    const { userId } = auth();
    if (!userId) {
      // If the user is not authenticated, return a 401 Unauthorized response
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Delete the patient by the provided ID
    await prisma.patient.delete({
      where: { id: params.id },
    });

    // Return a success message
    return NextResponse.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Error deleting patient:', error);
    // If an error occurs, return a 500 Internal Server Error response
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH route to update a patient by ID
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get the user ID from the auth context
    const { userId } = auth();
    if (!userId) {
      // If the user is not authenticated, return a 401 Unauthorized response
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Update the patient by the provided ID with the request body data
    const updatedPatient = await prisma.patient.update({
      where: { id: params.id },
      data: await request.json(),
    });

    // Return the updated patient data
    return NextResponse.json(updatedPatient);
  } catch (error) {
    console.error('Error updating patient:', error);
    // If an error occurs, return a 500 Internal Server Error response
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}