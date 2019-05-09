import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-add-design-page',
  templateUrl: './add-design-page.component.html',
  styleUrls: ['./add-design-page.component.scss'],
})
export class AddDesignPageComponent implements OnInit {

  private designForm: FormGroup;

  private description: string;

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
    this.designForm = this.fb.group({
      title: [
        '',
        [Validators.required],
      ],
    });
  }

  cancel() {
    history.back();
  }

  save() {

  }

  change(event) {
    this.description = event.editor._.data;
  }
}
