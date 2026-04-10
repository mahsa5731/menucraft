import {withAuth, successResponse, errorResponse} from '@/libs/server-api';
import {adminDb} from '@/libs/firebaseAdmin';
import {RestaurantProfileSchema} from '@/types/schema';

export const GET = withAuth([], async (request, context, user) => {
  try {
    const docRef = adminDb.collection('restaurantProfiles').doc(user.uid);
    const doc = await docRef.get();

    if (!doc.exists) {
      return successResponse(null);
    }

    const data = doc.data();

    if (!data?.menuSections) {
      data!.menuSections = [];
    }

    return successResponse(data);
  } catch (error) {
    return errorResponse('Failed to fetch profile and menu', String(error), 500, request.url);
  }
});

export const POST = withAuth([], async (request, context, user) => {
  try {
    const body = await request.json();
    const validatedData = RestaurantProfileSchema.parse(body);

    await adminDb
      .collection('restaurantProfiles')
      .doc(user.uid)
      .set({
        ...validatedData,
        updatedAt: new Date().toISOString(),
      });

    return successResponse(validatedData);
  } catch (error) {
    return errorResponse('Invalid data', String(error), 400, request.url);
  }
});
