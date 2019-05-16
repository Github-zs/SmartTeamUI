import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DesignHttpService} from '../../../../common/service/design-http.service';

@Component({
  selector: 'ngx-edit-design-page',
  templateUrl: './edit-design-page.component.html',
  styleUrls: ['./edit-design-page.component.scss'],
})
export class EditDesignPageComponent implements OnInit {

  private designForm: FormGroup;

  private designModel: any;

  private designId: number;

  private designContent: any;

  private editConfig: any = {
    language: 'zh-cn',
  };

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private designHttpService: DesignHttpService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.designId = this.activeRoute.snapshot.queryParams['designId'];
    this.getDesignDetail();
  }

  getDesignDetail() {
    this.designHttpService.getById(this.designId).subscribe( data => {
      this.designModel = data;
      this.initForm();
    });
  }

  initForm() {
    this.designForm = this.fb.group({
      title: [
        this.designModel.designTitle,
        [Validators.required],
      ],
    });
  }

  change(event) {
    this.designContent = event.editor._.data;
  }

  save() {
    this.designModel = {
      designId: this.designId,
      designContent: this.designContent,
      designTitle: this.designForm.value.title,
    };
    this.designHttpService.updateById(this.designModel).subscribe( data => {
      this.router.navigate(['/pages/dashboard-management/dashboard-page']);
    });
  }

  cancel() {
    history.back();
  }

}
