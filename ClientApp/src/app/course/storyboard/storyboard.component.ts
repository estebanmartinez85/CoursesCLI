import {Entity} from "../../DTO/entity";

declare var Focus: any;

import {CourseService} from "../../services/course.service";
import {Component, OnInit, SecurityContext, ViewChild} from '@angular/core';
import {SirenEntity as SirenResponse} from "../../DTO/SirenEntity";
import { QuillComponent, QuillDirective,
  QuillConfigInterface, QuillModulesInterface } from 'ngx-quill-wrapper';
import { Sanitizer } from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-storyboard',
  templateUrl: './storyboard.component.html',
  styleUrls: ['./storyboard.component.css']
})
export class StoryboardComponent implements OnInit {
  private storyboard: Entity;
  public show: boolean = true;
  public disabled: boolean = false;
  public type: string = 'component';
  public text: string;
  public config: QuillConfigInterface = {
    theme: 'snow',
    readOnly: false
  };
  public modules: QuillModulesInterface = {};
  private toolbar: any = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [ 'link', 'image', 'video', 'formula' ],          // add's image support
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
  ];
  @ViewChild(QuillComponent) componentRef: QuillComponent;
  private service;
  public id;
  public course;
  private sanitizer: Sanitizer;
  constructor(courseService: CourseService, sanitizer: Sanitizer) {
    this.service = courseService;
    this.sanitizer = sanitizer;
    this.config.modules = { toolbar: this.toolbar };
    let role: string = this.service.auth.user.role;
    if(role != "Administrator" && role != "Writer" ){
      this.disabled = true;
    }

  }
  ngOnInit() {
    this.id = this.service.GetId();
    this.service.getCourse(+this.id).subscribe((res)=>{
      this.ParseResponse(res);
      this.text = this.storyboard.properties.document;
    });

  }

  private ParseResponse(res: SirenResponse) {
    this.course = res;
    this.storyboard = res.entities.filter(r => r.class.find(t => t == "storyboard") )[0];
  }

  public toggleType(): void {
    this.type = (this.type === 'component') ? 'directive' : 'component';
  }

  public toggleTheme(): void {
    this.config.theme = (this.config.theme === 'snow') ? 'bubble' : 'snow';
  }

  public toggleToolbar(): void {
    this.config.modules = (this.config.modules.toolbar) ?
      { toolbar: false } : { toolbar: this.toolbar };
  }

  public toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  public toggleReadonly(): void {
    this.config.readOnly = (this.config.readOnly != true);
  }

  public clearEditorContent(): void {
      this.componentRef.directiveRef.clear();
  }

  public onEditorBlur(event: any): void {
    //console.log('Editor blur:', event);
  }

  public onEditorFocus(event: any): void {
    //console.log('Editor focus:', event);
  }

  public onEditorCreate(event: any): void {
    //console.log('Editor create:', event);
  }

  public onValueChange(value: string): void {
    //console.log('Value change:', value);
    this.text = value;
  }

  public onContentChange(event: any): void {
    //console.log('Content change:', event);
  }

  public onSelectionChange(event: any): void {
    //console.log('Selection change:', event);
  }

  private SaveDocument(): void {
    this.disabled = true;
    this.service.http.patch(environment.apiURL + `storyboards/${this.storyboard.properties.id}/document`, { document: this.text })
      .subscribe(x => this.disabled = false);
  }
}
