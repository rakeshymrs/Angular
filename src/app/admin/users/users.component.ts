import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { HttpClientService } from 'src/app/service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Array<User> = [];
  selectedUser: User | undefined;
  action!: string;
  
  constructor(private httpClientService: HttpClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.refreshData();
    
  }
  refreshData(){
    this.httpClientService.getUsers().subscribe(
      response => this.handleSuccessfulResponse(response),
    );

    this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.action = params['action'];
        const selectedUserId = params['id'];
        if (selectedUserId) {
          this.selectedUser = this.users.find(user => user.id === +selectedUserId);
        }
      }
    );

  }
  viewUser(id: number) {
    this.router.navigate(['admin','users'], {queryParams : {id, action: 'view'}});
  }


  addUser() {
    this.selectedUser = new User();
    this.router.navigate(['admin', 'users'], { queryParams: { action: 'add' } });
  }
  handleSuccessfulResponse(response: any[]) {
    this.users = response;
  }


  }


