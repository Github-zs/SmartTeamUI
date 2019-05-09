import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DesignHttpService} from '../../../../common/service/design-http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-add-design-page',
  templateUrl: './add-design-page.component.html',
  styleUrls: ['./add-design-page.component.scss'],
})
export class AddDesignPageComponent implements OnInit {

  private designForm: FormGroup;

  private description: string;

  private designModel: any;

  public editConfig: any = {
    language: 'zh-cn',
  };

  constructor(
    private fb: FormBuilder,
    private service: DesignHttpService,
    private router: Router,
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
    this.designModel = {
      designTitle: this.designForm.value.title,
      designContent: this.description,
    };
    this.service.insert(this.designModel).subscribe( data => {
      this.router.navigate(['/pages/document-management/design-management']);
    });
  }

  change(event) {
    this.description = event.editor._.data;
  }
}
