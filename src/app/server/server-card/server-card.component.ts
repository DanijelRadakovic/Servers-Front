import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Server } from 'src/app/model/server.model';
import { OS } from 'src/app/model/os.model';


@Component({
  selector: 'app-server-card',
  templateUrl: './server-card.component.html',
  styleUrls: ['./server-card.component.css'],
})
export class ServerCardComponent implements OnInit {

  public image = 'assets/server.jpg';
  @Input() id: number;
  @Input() hostname: string;
  @Input() domain: string;
  @Input() os: OS;
  @Output() deleteEvent = new EventEmitter<number>();
  public server: Server;

  constructor() { }

  ngOnInit() {
    this.server = { id: this.id, hostname: this.hostname, domain: this.domain, os: this.os };
  }

  delete(id: number) {
    this.deleteEvent.emit(id);
  }
}