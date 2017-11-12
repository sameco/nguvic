import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

interface Grau {
  ECTS: string;
  assig: string;
  codi: string;
  coef: string;
  credECTS: string;
  credUVIC: string;
  grup: string;
  hores: string;
  horesTot: string;
  prof: string;
  sem: string;
  tipus: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //Atributs Graus
  ECTS: string;
  assig: string;
  codi: string;
  coef: string;
  credECTS: string;
  credUVIC: string;
  grup: string;
  hores: string;
  horesTot: string;
  prof: string;
  sem: string;
  tipus: string;

  grausCol: AngularFirestoreCollection<Grau>;
  // graus: Observable<Grau[]>;
  graus: any;
  currentID: string;
  currentGrau: Observable<Grau>;
  grauDoc: AngularFirestoreDocument<Grau>;


  addGrau() {
    /*
    AFEGIR DOCUMENT AMB ID PERSONALITZAT
    this.afs.collection('bd/H0AcuFIYqTVItLjXjjHw/Graus').doc('custom-id').set({'assig': this.assig, 'codi': this.codi});
    */
    //TODO check assig or codi not null
    this.afs.collection('bd/H0AcuFIYqTVItLjXjjHw/Graus').add({'assig': this.assig, 'codi': this.codi});
  }

  getGrau(id){
    this.currentID = id;
    this.grauDoc = this.afs.doc('bd/H0AcuFIYqTVItLjXjjHw/Graus/'+id);
    this.currentGrau = this.grauDoc.valueChanges();
  }

  constructor(private afs: AngularFirestore){
  }


  ngOnInit(){
    this.grausCol = this.afs.collection('bd/H0AcuFIYqTVItLjXjjHw/Graus');
    // this.graus = this.grausCol.valueChanges();

    this.graus = this.grausCol.snapshotChanges().map(actions =>{
      return actions.map(a => {
        const data = a.payload.doc.data() as Grau;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });
  }
}
