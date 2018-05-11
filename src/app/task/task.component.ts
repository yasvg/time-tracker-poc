import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: 'task.component.html'
})
export class TaskComponent {
  @Input()
  task: any;

  timerStarted: boolean = false;
  taskTime: string = '00:00:00';
  seconds = 0;
  minutes = 0;
  hours = 0;
  timeO = 0;
  totalTime = 0;

  startTimeClick = () => {
    this.timerStarted = true;
    this.timer();
  };
  stopTimeClick = () => {
    this.timerStarted = false;
    clearTimeout(this.timeO);
  };
  add = () => {
      this.seconds++;
      this.totalTime++;
      if (this.seconds >= 60) {
          this.seconds = 0;
          this.minutes++;
          if (this.minutes >= 60) {
              this.minutes = 0;
              this.hours++;
          }
      }

      this.taskTime = (this.hours ? (this.hours > 9 ? this.hours : "0" + this.hours) : "00") + ":" + (this.minutes ? (this.minutes > 9 ? this.minutes : "0" + this.minutes) : "00") + ":" + (this.seconds > 9 ? this.seconds : "0" + this.seconds);

      this.timer();
  };
  timer = () => {
      this.timeO = setTimeout(this.add, 1000);
  };
}
