import {doc, getDoc, serverTimestamp, setDoc} from 'firebase/firestore';
import {deleteObject, getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {db, storage} from '@/libs/firebaseConfig';
import {RestaurantProfile} from '@/types/schema';

const collectionName = 'restaurantProfiles';

export async function getRestaurantProfile(uid: string): Promise<RestaurantProfile | null> {
  const refDoc = doc(db, collectionName, uid);
  const snapshot = await getDoc(refDoc);

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  return {
    name: data.name ?? '',
    phone: data.phone ?? '',
    address: data.address ?? '',
    coverImage: data.coverImage ?? '',
    menuSections: data.menuSections ?? [],
    updatedAt: data.updatedAt?.toDate?.()?.toISOString?.() ?? null,
  };
}

export async function saveRestaurantProfile(uid: string, profile: RestaurantProfile) {
  const refDoc = doc(db, collectionName, uid);

  await setDoc(
    refDoc,
    {
      name: profile.name.trim(),
      phone: profile.phone.trim(),
      address: profile.address.trim(),
      coverImage: profile.coverImage?.trim() ?? '',
      menuSections: profile.menuSections,
      updatedAt: serverTimestamp(),
    },
    {merge: true}
  );
}

export async function uploadRestaurantCoverImage(uid: string, file: File) {
  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const fileRef = ref(storage, `restaurant-covers/${uid}/cover.${extension}`);

  await uploadBytes(fileRef, file, {
    contentType: file.type || 'image/jpeg',
  });

  return getDownloadURL(fileRef);
}

export async function deleteRestaurantCoverImageByUrl(fileUrl: string) {
  if (!fileUrl) {
    return;
  }

  const fileRef = ref(storage, fileUrl);
  await deleteObject(fileRef);
}
