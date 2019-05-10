import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShareHttpService} from '../../../common/service/share-http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-add-share-page',
  templateUrl: './add-share-page.component.html',
  styleUrls: ['./add-share-page.component.scss'],
})
export class AddSharePageComponent implements OnInit {

  private shareForm: FormGroup;

  private description: string;

  private shareModel: any;

  private editConfig: any = {
    language: 'zh-cn',
  };

  constructor(
    private fb: FormBuilder,
    private service: ShareHttpService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.shareForm = this.fb.group({
      title: [
        '',
        [Validators.required],
      ],
    });
  }

  save() {
    this.shareModel = {
      shareTitle: this.shareForm.value.title,
      shareContent: this.description,
    };
    this.service.insert(this.shareModel).subscribe( data => {
      this.router.navigate(['/pages/technology-share-management/technology-share-page']);
    });
  }

  cancel() {
    history.back();
  }

  change(event) {
    this.description = event.editor._.data;
  }

}
