import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyDv8PEmxg4GhxjR75Hg5b9GuTYZ3mZsxuA",
      authDomain: "test-681e2.firebaseapp.com",
      databaseURL: "https://test-681e2.firebaseio.com",
      projectId: "test-681e2",
      storageBucket: "test-681e2.appspot.com",
      messagingSenderId: "577718238857",
      appId: "1:577718238857:web:c2171fa7cedf63204ed058",
      measurementId: "G-D5NK4R0CJG"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
