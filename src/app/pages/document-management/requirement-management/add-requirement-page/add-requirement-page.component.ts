import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RequirementHttpService} from '../../../../common/service/requirement-http.service';

@Component({
  selector: 'ngx-add-requirement-page',
  templateUrl: './add-requirement-page.component.html',
  styleUrls: ['./add-requirement-page.component.scss'],
})
export class AddRequirementPageComponent implements OnInit {

  private requirementForm: FormGroup;

  private description: string;

  private requirementModel: any;

  private editConfig: any = {
    language: 'zh-cn',
  };

  constructor(
    private fb: FormBuilder,
    private service: RequirementHttpService,
    private router: Router,
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
    this.requirementModel = {
      requirementTitle: this.requirementForm.value.title,
      requirementContent: this.description,
    };
    this.service.insert(this.requirementModel).subscribe( data => {
      this.router.navigate(['/pages/document-management/requirement-management']);
    });
  }

  cancel() {
    history.back();
  }

  change(event) {
    this.description = event.editor._.data;
  }
}
