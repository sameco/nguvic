//Import all the required modules for the root component
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

var firebaseConfig = {
        apiKey: "AIzaSyAxiHYGYH7RcW8TpFrBeljWnbn1CgRPqPM",
        authDomain: "gestor-de-graus.firebaseapp.com",
        databaseURL: "https://gestor-de-graus.firebaseio.com",
        projectId: "gestor-de-graus",
        storageBucket: "gestor-de-graus.appspot.com",
        messagingSenderId: "900967811321"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
