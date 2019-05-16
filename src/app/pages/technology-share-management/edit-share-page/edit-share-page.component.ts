import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShareHttpService} from '../../../common/service/share-http.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ngx-edit-share-page',
  templateUrl: './edit-share-page.component.html',
  styleUrls: ['./edit-share-page.component.scss'],
})
export class EditSharePageComponent implements OnInit {

  private shareModel: any;

  private shareContent: any;

  private shareId: any;

  private shareForm: FormGroup;

  private editConfig: any = {
    language: 'zh-cn',
  };

  constructor(
    private fb: FormBuilder,
    private shareHttpService: ShareHttpService,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.shareId = this.activeRoute.snapshot.queryParams['shareId'];
    this.getShareDetail();
  }

  getShareDetail() {
    this.shareHttpService.getById(this.shareId).subscribe( data => {
      this.shareModel = data;
      this.initForm();
    });
  }

  initForm() {
    this.shareForm = this.fb.group({
      title: [
        this.shareModel.shareTitle,
        [Validators.required],
      ],
    });
  }

  change(event) {
    this.shareContent = event.editor._.data;
  }

  cancel() {
    history.back();
  }

  save() {
    this.shareModel = {
      shareId: this.shareId,
      shareContent: this.shareContent,
      shareTitle: this.shareForm.value.title,
    };
    this.shareHttpService.updateById(this.shareModel).subscribe( data => {
      this.router.navigate(['/pages/dashboard-management/dashboard-page']);
    });
  }

}
