import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs';

// GET route to fetch all patients for the authenticated user
export async function GET() {
  try {
    // Get the user ID from the auth context
    const { userId } = auth();
    if (!userId) {
      // If the user is not authenticated, return a 401 Unauthorized response
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all patients where the clerkId matches the authenticated user's ID
    const patients = await prisma.patient.findMany({
      where: { clerkId: userId },
    });

    // Return the list of patients
    return NextResponse.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    // If an error occurs, return a 500 Internal Server Error response
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST route to create a new patient
export async function POST(request: NextRequest) {
  try {
    // Get the user ID from the auth context
    const { userId } = auth();
    if (!userId) {
      // If the user is not authenticated, return a 401 Unauthorized response
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the patient data from the request body
    const patientData = await request.json();

    // Add the clerkId to the patient data to associate the patient with the authenticated user
    patientData.clerkId = userId;

    // Create a new patient using the Prisma client
    const patient = await prisma.patient.create({
      data: patientData,
    });

    // Return the created patient data with a 201 Created status
    return NextResponse.json(patient, { status: 201 });
  } catch (error: any) {
    console.error('Error creating patient:', error);

    // If the error is a P2002 error (unique constraint violation),
    // return a 409 Conflict response with the error message
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'An patient with this ID already exists', code: 'P2002' },
        { status: 409 }
      );
    }

    // If any other error occurs, return a 500 Internal Server Error response
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}