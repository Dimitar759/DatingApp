import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-memeber-list',
  templateUrl: './memeber-list.component.html',
  styleUrls: ['./memeber-list.component.css']
})
export class MemeberListComponent implements OnInit{
  members$: Observable<Member[]> | undefined;

  constructor(private memberService: MembersService) {
     
  }

  ngOnInit(): void {
    this.members$ = this.memberService.getMembers();
  }


}
