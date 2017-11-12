import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';

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
  //done:string = "";
  // graus: Observable<Grau[]>;
  graus: any;
  currentID: string;
  currentGrau: Observable<Grau>;
  grauDoc: AngularFirestoreDocument<Grau>;


  //dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
   //dtTrigger: Subject = new Subject();


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
        /*if(this.done==""){
          this.dtTrigger.next();
          this.done="done";
        }*/
      return actions.map(a => {
        const data = a.payload.doc.data() as Grau;
        const id = a.payload.doc.id;
        return { id, data };
      });
    });
  }
}
