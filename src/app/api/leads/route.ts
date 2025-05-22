import { NextRequest, NextResponse } from 'next/server';

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  country: string;
  selectedVisas: string[];
  resume: File | null;
  additionalInfo: string;
  status: 'PENDING' | 'REACHED_OUT';
  createdAt: string;
}

let leads: Lead[] = [];

export async function GET(req: NextRequest) {
  console.log('GET /api/leads - Current leads:', leads);
  return NextResponse.json({ leads });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const lead: Lead = {
      id: Date.now().toString(),
      firstName: formData.get('firstName')?.toString() || '',
      lastName: formData.get('lastName')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      linkedin: formData.get('linkedin')?.toString() || '',
      country: formData.get('country')?.toString() || '',
      selectedVisas: formData.getAll('selectedVisas').map(v => v.toString()),
      resume: formData.get('resume') as File | null,
      additionalInfo: formData.get('additionalInfo')?.toString() || '',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    console.log('POST /api/leads - Adding lead:', lead);
    leads.push(lead);
    console.log('POST /api/leads - Current leads:', leads);

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    console.error('Error submitting lead:', error);
    return NextResponse.json(
      { error: 'Failed to submit lead' },
      { status: 500 }
    );
  }
} 