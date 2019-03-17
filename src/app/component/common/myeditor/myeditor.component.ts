import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output} from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './myeditor.component.html',
  styleUrls: ['./myeditor.component.scss']
})
export class MyeditorComponent implements OnInit,AfterViewInit, OnDestroy {

  @Input() elementId: String;
  @Output() onEditorContentChange = new EventEmitter();

  editor;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let self = this;
    tinymce.init({
      selector: '#' + this.elementId,
      height: 600,
      plugins: ['link', 'paste', 'table', 'image'],
      skin_url: 'assets/skins/ui/oxide',
      content_css: 'assets/skins/content/writer/content.css',
      language: 'zh_CN',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup change', () => {
          const content = editor.getContent();
          this.onEditorContentChange.emit(content);
        });
      },

    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
  // private keyupHandler(event) {
  //   console.log('编辑器的内容：', event);
  // }
}
