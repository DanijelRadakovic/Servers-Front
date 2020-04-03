import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from 'src/app/core/server.service';
import { ToastrService } from 'ngx-toastr';
import { Server } from 'src/app/model/server.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.css']
})
export class ServerListComponent implements OnInit {

  private modalForm: NgbModalRef;
  public isValidFormSubmitted: boolean;
  public headerName: string;
  public formGroup: FormGroup;

  public addImage = 'assets/add-server.jpg';
  public servers: Server[];

  constructor(private modalService: NgbModal,
    private serverService: ServerService,
    private toastrService: ToastrService) {
    this.servers = [];
    this.isValidFormSubmitted = null;
    this.formGroup = new FormGroup({
      hostname: new FormControl('', [
        Validators.required, 
        Validators.minLength(1), 
        Validators.maxLength(30)]
      ),
      os: new FormControl(null, [Validators.required]),
      domain: new FormControl('', [Validators.required]),
    });
    this.headerName = 'Create Server';
  }

  ngOnInit() {
    this.serverService.findAll().subscribe(
      response => this.servers = response,
      err => this.toastrService.error(err));
  }

  delete(id: number) {
    this.serverService.remove(id).subscribe(
      (response: string) => {
        this.toastrService.success(response);
        this.servers = this.servers.filter(server => server.id !== id);
      }, (error: string) => this.toastrService.error(error));
  }

  open(content: any): void {
    this.modalForm = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onFormSubmit(): void {
    this.isValidFormSubmitted = false;
    if (this.formGroup.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;

    this.serverService.create(
      { id: null, hostname: this.hostname.value, os: this.os.value, domain: this.domain.value })
      .subscribe((server: Server) => {
        this.servers.push(server);
        this.modalForm.close();
        this.toastrService.success('Server is successfully created!');
      }, (error: string) => this.toastrService.error(error));
  }

  public get hostname() {
    return this.formGroup.get('hostname');
  }

  public get os() {
    return this.formGroup.get('os');
  }

  public get domain() {
    return this.formGroup.get('domain');
  }

}
