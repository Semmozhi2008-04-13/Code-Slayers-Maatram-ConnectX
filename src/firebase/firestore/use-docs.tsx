
'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  doc,
  getDocs,
  query,
  where,
  collection,
  DocumentData,
  FirestoreError,
  getFirestore,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useFirestore } from '@/firebase/provider';
import type { WithId } from './use-collection';

export interface UseDocsResult<T> {
  data: WithId<T>[] | null;
  isLoading: boolean;
  error: FirestoreError | Error | null;
}

/**
 * React hook to fetch multiple documents from a collection by their IDs.
 * It's more efficient than using useDoc in a loop for multiple documents.
 * 
 * IMPORTANT! YOU MUST MEMOIZE the inputted documentIds and collectionName.
 * 
 * @template T Optional type for document data. Defaults to any.
 * @param {string} collectionName - The name of the collection.
 * @param {string[] | null | undefined} documentIds - An array of document IDs to fetch.
 * @returns {UseDocsResult<T>} Object with data, isLoading, error.
 */
export function useDocuments<T = any>(
  collectionName: string,
  documentIds: string[] | null | undefined
): UseDocsResult<T> {
  type ResultItemType = WithId<T>;
  type StateDataType = ResultItemType[] | null;

  const [data, setData] = useState<StateDataType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | Error | null>(null);
  const firestore = useFirestore();

  const memoizedIds = useMemo(() => documentIds ? [...documentIds].sort().join(',') : null, [documentIds]);

  useEffect(() => {
    if (!memoizedIds || !collectionName) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    const fetchDocuments = async () => {
      setIsLoading(true);
      setError(null);
      
      const ids = memoizedIds.split(',');
      if (ids.length === 0) {
        setData([]);
        setIsLoading(false);
        return;
      }

      try {
        const collectionRef = collection(firestore, collectionName);
        // Firestore 'in' queries are limited to 30 items per query.
        const idChunks = [];
        for (let i = 0; i < ids.length; i += 30) {
          idChunks.push(ids.slice(i, i + 30));
        }

        const queryPromises = idChunks.map(chunk => 
          getDocs(query(collectionRef, where('__name__', 'in', chunk)))
        );
        
        const querySnapshots = await Promise.all(queryPromises);

        const results: ResultItemType[] = [];
        querySnapshots.forEach(snapshot => {
            snapshot.forEach(doc => {
                results.push({ ...(doc.data() as T), id: doc.id });
            });
        });

        setData(results);
      } catch (e) {
        const contextualError = new FirestorePermissionError({
          operation: 'list',
          path: collectionName,
        });
        setError(contextualError);
        setData(null);
        errorEmitter.emit('permission-error', contextualError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoizedIds, collectionName, firestore]);

  return { data, isLoading, error };
}

