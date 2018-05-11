import { Component } from '@angular/core';
import * as $ from 'jquery';
import { StitchClientFactory } from "mongodb-stitch";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Time Tracker App';
  appId = 'authapp-****';
  clientPromise = StitchClientFactory.create('taskmanager-bswlz');
  newTaskName = '';
  taskList = [
    {
      name: 'My task 1',
      totalTime: 0
    },
    {
      name: 'My task 2',
      totalTime: 0
    }
  ];
  addTaskClick(){
    let newTask = {
      name: this.newTaskName,
      totalTime: 0
    };
    this.taskList.push(newTask);
  }
  submitTimesheetClick(){
    let data = this.taskList;
    this.clientPromise.then(client => {
      const db = client.service('mongodb', 'mongodb-atlas').db('TimeTracker');
      client.login().then(() =>
        db.collection('Collection1').updateOne({owner_id: client.authedId()}, {$set:{number:42}}, {upsert:true})
      ).then(()=>
        db.collection('Collection1').find({owner_id: client.authedId()}).limit(100).execute()
      ).then(docs => {
        console.log("Found docs", docs)
        console.log("[MongoDB Stitch] Connected to Stitch")
      }).catch(err => {
        console.error(err)
      });
    });
    // $.ajax({
    //   url: 'https://script.google.com/a/learningmate.com/macros/s/AKfycbx5B_cBiZ68Gm9EDaVsyuGcStX5L5RD6N9imhfi7uPSwP55_Obc/exec',
    //   type: 'POST',
    //   dataType: 'jsonp',
    //   data: JSON.stringify(data),
    //   success: (data) => {
    //     console.log(data);
    //   }
    // });
  }
}
