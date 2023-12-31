import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit{
  title = 'juancarlo.dev';

  constructor() {}

  ngOnInit() {
    const options = {
     strings: ['a software developer.', 'an artist.', 'a rust enthusiast.', 'a bass player.'],
     typeSpeed: 25,
     backSpeed: 25,
     showCursor: true,
     cursorChar: '|',
     loop: true
    };

    const typed = new Typed('.typed-element', options);
  }
}
