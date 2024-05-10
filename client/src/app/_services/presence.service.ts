import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { BehaviorSubject, take } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection?: HubConnection;
  private onlineUserSource = new BehaviorSubject<string[]>([]);
  onlineUser$ = this.onlineUserSource.asObservable();

  constructor(private toastr: ToastrService, private router: Router) { }

  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build();

      this.hubConnection.on('UserIsOnline', username => {
        this.onlineUser$.pipe(take(1)).subscribe(usernames => {
          this.onlineUserSource.next([...usernames, username])
        })
      })
  
      this.hubConnection.on('UserIsOffline', username => {
        this.onlineUser$.pipe(take(1)).subscribe(usernames => {
          this.onlineUserSource.next([...usernames.filter(x => x !== username)])
        })
      })

    this.hubConnection.on('UserIsOnline', username => {
      this.toastr.warning(username + ' has disconnected');
    })

    this.hubConnection.on('GetOnlineUsers', usernames => {
      this.onlineUserSource.next(usernames);
    })

    this.hubConnection.on('NewMessageRecieved', ({username, knownAs}) => {
      this.toastr.info(knownAs + ' has sent you a new message! Click me to see it!')
      .onTap
      .pipe(take(1))
      .subscribe({
        next: () => this.router.navigateByUrl('/members/' + username + '?tab=Messages')
      })
    })

  }

  stopConnection() {
    this.hubConnection?.stop().catch(error => console.log(error));
    
  }
}

