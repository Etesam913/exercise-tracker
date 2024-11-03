import { inject, Injectable } from "@angular/core";
import {
  DocumentData,
  getDocs,
  addDoc,
  deleteDoc,
  CollectionReference,
  Query,
  doc,
  Firestore,
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class FirestoreService {
  private firestore: Firestore = inject(Firestore);

  /**
   * Fetches data from the specified collection, optionally applying a where clause.
   * @param collectionRef - Reference to the Firestore collection.
   * @returns A promise that resolves to an array of document data.
   */
  async getData(
    queryRef: Query<DocumentData, DocumentData>,
  ): Promise<DocumentData[]> {
    const snapshot = await getDocs(queryRef);
    return snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
  }

  /**
   * Adds a new document to the specified collection.
   * @param collectionRef - Reference to the Firestore collection.
   * @param data - Data to be added to the new document.
   * @returns A promise that resolves to the added document reference.
   */
  async addDocument(
    collectionRef: CollectionReference<DocumentData>,
    data: Record<string, any>,
  ) {
    return await addDoc(collectionRef, data);
  }

  /**
   * Deletes a document from Firestore.
   * @returns A promise that resolves when the document is deleted.
   */
  async deleteDocument(collectionName: string, docId: string) {
    const docRef = doc(this.firestore, collectionName, docId);
    return await deleteDoc(docRef);
  }
}
