import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.css']
})
export class MyModalComponent implements OnInit {

  @Input() modalTitle: string;
  constructor() { }

  ngOnInit() {
  }

}
