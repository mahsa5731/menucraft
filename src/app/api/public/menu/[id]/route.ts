import {NextResponse} from 'next/server';
import {adminDb} from '@/libs/firebaseAdmin';

export const revalidate = 60;

export async function GET(request: Request, context: {params: Promise<{id: string}>}) {
  try {
    const {id} = await context.params;

    if (!id) {
      return NextResponse.json({message: 'Menu ID is required'}, {status: 400});
    }

    const doc = await adminDb.collection('restaurantProfiles').doc(id).get();

    if (!doc.exists) {
      return NextResponse.json({message: 'Menu not found'}, {status: 404});
    }

    return NextResponse.json({data: doc.data()});
  } catch (error) {
    console.error('Public Menu API Error:', error);
    return NextResponse.json({message: 'Internal server error'}, {status: 500});
  }
}
