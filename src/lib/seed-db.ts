
import {
  Firestore,
  collection,
  writeBatch,
  serverTimestamp,
  doc,
} from 'firebase/firestore';
import { dummyUsers, dummyPosts, dummyJobs, dummyEvents } from './dummy-data';
import { placeholderImages } from './placeholder-images';

// This function will seed the database.
// It's designed to be run once, for example, when the app first loads and detects an empty database.
export const seedDatabase = async (firestore: Firestore) => {
  const batch = writeBatch(firestore);

  // 1. Seed Users
  const userDocs = new Map<string, any>();
  dummyUsers.forEach((user, index) => {
    // Using a predictable-but-unique-enough ID for dummy data
    const docId = `user-${(index + 1).toString().padStart(3, '0')}`;
    const userRef = collection(firestore, 'userProfiles');
    
    // Assign a placeholder avatar
    const avatar = placeholderImages.avatars[index % placeholderImages.avatars.length];
    
    const userDoc = { 
      id: docId, 
      ...user,
      profilePictureUrl: avatar.imageUrl
    }; 
    batch.set(doc(userRef, docId), userDoc);
    userDocs.set(docId, userDoc); // Store for later use in posts
  });

  // 2. Seed Posts
  const userIds = Array.from(userDocs.keys());
  dummyPosts.forEach((post, index) => {
    const randomUserId = userIds[index % userIds.length];
    const author = userDocs.get(randomUserId);

    if (author) {
      const postRef = doc(collection(firestore, 'posts'));
      
      const postImage = placeholderImages.postImages[index % placeholderImages.postImages.length];

      batch.set(postRef, {
        ...post,
        imageUrl: postImage.imageUrl,
        createdAt: serverTimestamp(),
        author: {
          id: author.id,
          name: `${author.firstName} ${author.lastName}`,
          avatarUrl: author.profilePictureUrl,
          headline: author.headline,
        },
      });
    }
  });
  
  // 3. Seed Jobs
  dummyJobs.forEach((job, index) => {
      const jobRef = doc(collection(firestore, 'jobs'));
      const companyLogo = placeholderImages.companyLogos[index % placeholderImages.companyLogos.length];
      batch.set(jobRef, {
          ...job,
          companyLogoUrl: companyLogo.imageUrl
      });
  });
  
  // 4. Seed Events
  dummyEvents.forEach((event, index) => {
      const eventRef = doc(collection(firestore, 'events'));
      const eventBanner = placeholderImages.eventBanners[index % placeholderImages.eventBanners.length];
      batch.set(eventRef, {
          ...event,
          bannerUrl: eventBanner.imageUrl,
          organizerId: userIds[index % userIds.length] // Assign a random user as organizer
      });
  });

  // Commit the batch
  try {
    await batch.commit();
    console.log('Dummy data has been successfully seeded to Firestore.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
