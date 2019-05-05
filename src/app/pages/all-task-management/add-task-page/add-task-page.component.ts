import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TaskHttpService} from '../../../common/service/task-http.service';

@Component({
  selector: 'ngx-add-task-page',
  templateUrl: './add-task-page.component.html',
  styleUrls: ['./add-task-page.component.scss'],
})
export class AddTaskPageComponent implements OnInit {

  public taskForm: FormGroup;

  public description: any;

  public editConfig: any = {
    language: 'zh-cn',
  };

  constructor(
    private fb: FormBuilder,
    private service: TaskHttpService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.taskForm = this.fb.group({
      title: ['',
      [Validators.required],
      ],
      source: ['',
        [Validators.required],
      ],
      group: ['',
        [Validators.required],
      ],
      executor: ['',
        [Validators.required],
      ],
    });
  }

  change(event) {
    this.description = event.editor._.data;
  }

  save() {
    const taskManagementModel = {
      taskTitle: this.taskForm.value.title,
      taskSource: this.taskForm.value.source,
      taskDescription: this.description,
      taskExecutor: this.taskForm.value.executor,
    };

    const taskGroupExtModel = {
      groupBelonged: this.taskForm.value.group,
    };

    this.service.insert(taskManagementModel).subscribe( data => {
      this.service.updateTaskExt(taskGroupExtModel).subscribe( res => {

      });
    });
  }

  cancel() {
    history.back();
  }
}
