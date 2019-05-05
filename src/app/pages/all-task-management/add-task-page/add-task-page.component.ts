import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
    console.log(this.taskForm.value);
  }

  cancel() {
    history.back();
  }
}
