import { Injectable } from '@angular/core';
import { Contact } from 'src/app/components/contact-form/models/contact';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ContactViewModel } from '../models/contact-view-model';
 
@Injectable({
  providedIn: 'root'
})
export class ContactService {
 
  constructor(private db: AngularFirestore) { }
 
  private contactCollectionName = 'contact';
 
  getContacts(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Contact>(this.contactCollectionName, ref => ref.orderBy('lastModifiedDate', 'desc')).get();
  }
  saveContact(contact: Contact): Promise<DocumentReference> {
    return this.db.collection(this.contactCollectionName).add(contact);
  }
  editContact(contact: ContactViewModel): Promise<void>{
    return this.db.collection(this.contactCollectionName).doc(contact.id).update(contact);
  }
  editContactPartial(id: string, obj: Object): Promise<void>{
    return this.db.collection(this.contactCollectionName).doc(id).update(obj);
  }
  deleteContact(idContact: string): Promise<void>{
    return this.db.collection(this.contactCollectionName).doc(idContact).delete();
  }
}