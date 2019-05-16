import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RequirementHttpService} from '../../../../common/service/requirement-http.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ngx-edit-requirement-page',
  templateUrl: './edit-requirement-page.component.html',
  styleUrls: ['./edit-requirement-page.component.scss'],
})
export class EditRequirementPageComponent implements OnInit {

  private requirementForm: FormGroup;

  private requirementModel: any;

  private requirementId: any;

  private requirementContent: any;

  private editConfig: any = {
    language: 'zh-cn',
  };

  constructor(
    private fb: FormBuilder,
    private requirementHttpService: RequirementHttpService,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.requirementId = this.activeRoute.snapshot.queryParams['requirementId'];
    this.getRequirementDetail();
  }


  getRequirementDetail() {
    this.requirementHttpService.getById(this.requirementId).subscribe( data => {
      this.requirementModel = data;
      this.initForm();
    });
  }

  initForm() {
    this.requirementForm = this.fb.group({
      title: [
        this.requirementModel.requirementTitle,
        [Validators.required],
      ],
    });
  }

  change(event) {
    this.requirementContent = event.editor._.data;
  }


  save() {
    this.requirementModel = {
      requirementId: this.requirementId,
      requirementContent: this.requirementContent,
      requirementTitle: this.requirementForm.value.title,
    };
    this.requirementHttpService.updateById(this.requirementModel).subscribe( data => {
      this.router.navigate(['/pages/dashboard-management/dashboard-page']);
    });
  }


  cancel() {
    history.back();
  }
}
