import {withAuth, successResponse, errorResponse} from '@/libs/server-api';
import {adminAuth, adminDb} from '@/libs/firebaseAdmin';

export const DELETE = withAuth([], async (request, context, user) => {
  try {
    await adminDb.collection('restaurantProfiles').doc(user.uid).delete();

    await adminAuth.deleteUser(user.uid);

    return successResponse(null, 'Account deleted successfully');
  } catch (error) {
    return errorResponse('Failed to delete account', String(error), 500, request.url);
  }
});
