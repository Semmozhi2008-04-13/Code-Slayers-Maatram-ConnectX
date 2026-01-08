
import {
  Firestore,
  collection,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore';
import { dummyUsers, dummyPosts, dummyJobs, dummyEvents } from './dummy-data';

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
    const userDoc = { id: docId, ...user }; // Add the id to the document data
    batch.set(doc(userRef, docId), userDoc);
    userDocs.set(docId, userDoc); // Store for later use in posts
  });

  // 2. Seed Posts
  const userIds = Array.from(userDocs.keys());
  dummyPosts.forEach((post, index) => {
    // Assign a random user as the author
    const randomUserId = userIds[index % userIds.length];
    const author = userDocs.get(randomUserId);

    if (author) {
      const postRef = doc(collection(firestore, 'posts'));
      batch.set(postRef, {
        ...post,
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
  dummyJobs.forEach(job => {
      const jobRef = doc(collection(firestore, 'jobs'));
      batch.set(jobRef, job);
  });
  
  // 4. Seed Events
  dummyEvents.forEach(event => {
      const eventRef = doc(collection(firestore, 'events'));
      batch.set(eventRef, event);
  });

  // Commit the batch
  try {
    await batch.commit();
    console.log('Dummy data has been successfully seeded to Firestore.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
