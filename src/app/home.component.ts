import { Component } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { TopicService } from './topic.service';
import { Topic } from './models/topic';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  topics: Topic[] = [];
  private service: TopicService;
  private router: Router;
  showWarning = false;

  constructor(private ts: TopicService, private r: Router) { 
    this.service = ts;
    this.router = r;
    this.service.list().subscribe(t => this.topics = t, err => {
      console.log('Unable to load topics!');
    });
  }

  enterTopic(topic: string) {
    if(topic.trim().length == 0) { this.showWarning = false; return; }

    this.showWarning = false;
    this.service.get(topic).subscribe(
      data => {
        this.router.navigateByUrl(`/feedback/${data.id}`);
      },
      err => {
        console.log('Something went wrong!', err);
        this.showWarning = true;
      });
  }
}