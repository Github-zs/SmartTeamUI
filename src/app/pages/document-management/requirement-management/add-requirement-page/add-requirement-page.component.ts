import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-add-requirement-page',
  templateUrl: './add-requirement-page.component.html',
  styleUrls: ['./add-requirement-page.component.scss'],
})
export class AddRequirementPageComponent implements OnInit {

  public requirementForm: FormGroup;

  public description: string;
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
    this.requirementForm = this.fb.group({
      title: [
        '',
        [Validators.required],
      ],
    });
  }

  save() {

  }

  cancel() {
    history.back();
  }

  change(event) {
    this.description = event.editor._.data;
  }
}
