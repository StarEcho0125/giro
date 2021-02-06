import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    private titleService: Title, 
    private metaService: Meta
  ) { }

  public setTitle( newTitle: string) 
  {
    this.titleService.setTitle( newTitle );
  }
  
  public setMetaDescription(content: string)
  {
    this.metaService.updateTag({name: 'description', content: content}, 'name="description"');
  }

  ngOnInit(): void {
  }

}
