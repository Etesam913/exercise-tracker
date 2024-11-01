import { inject, Injectable } from "@angular/core";
import {
  DocumentData,
  Firestore,
  collection,
  getDocs,
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class FirestoreService {
  private firestore: Firestore = inject(Firestore);
  constructor() {}

  async getData(collectionName: string): Promise<DocumentData> {
    const colRef = collection(this.firestore, collectionName);
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((doc) => doc.data());
  }
}
