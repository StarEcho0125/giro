import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { Title, Meta } from "@angular/platform-browser";
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  flagUrl: string = '../../assets/flags/CAT.jpg';
  
  constructor(
    public translate: TranslateService,
    private title: Title,
    public auth: AuthenticationService,
    private meta: Meta
  ) { }

  ngOnInit(): void {
  }

  onChange(lang) {
    this.translate.use(lang);
    let cur_title = this.title.getTitle();
    let cur_desc: string = '';
    this.title.setTitle(this.translate.instant(cur_title));
    if(lang == 'CAT') {
      this.flagUrl = '../../assets/flags/CAT.jpg';
    } else if(lang == 'ESP') {
      this.flagUrl = '../../assets/flags/ESP.png';
    }
    try {
      cur_desc = this.meta.getTag('description').content;
    } catch (error) {
      console.log("Metadata is not described.");
      return;
    }

    this.meta.addTags([
      {name: 'description', content: this.translate.instant(cur_desc)}
    ]);
  }

}
