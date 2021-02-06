import { Component, OnInit } from '@angular/core';
import { Article } from '../../../models/article.model';
import { ArticleService } from '../../../services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publicararticle',
  templateUrl: './publicararticle.component.html',
  styleUrls: ['./publicararticle.component.scss']
})
export class PublicararticleComponent implements OnInit {

  constructor(private articleService: ArticleService, private router: Router) { }

  dadesArticle = new Article();

  actualizarArticle = new Article();

  idioma: any = "tots";

  articlesEsp: any;

  articlesCat: any;

  ngOnInit(): void {
    $("select#selecIdioma").css('backgroundColor', '#04063c');
    $("nav").css('backgroundColor', '#04063c');

    this.obtenirTotsArticles();
  }

  enviardadesArticle() {
    this.articleService.publicarArticle(this.dadesArticle).subscribe(
      res =>
      {
        alert("S'ha publicat l'article correctament.")
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/vxcbhkypwnbniuqwezmncaerdfbwtopkjjhsers']);
      });
      },
      //Control d'errors del servidor
      error =>
      {
        alert("No s'ha pogut publicar l'article, intenta-ho més tard.");
      }
    );
  }

  obtenirTotsArticles()
  {
    this.articleService.obtenirArticles(this.idioma).subscribe(
      res =>
      {
        this.articlesEsp = res[0];
        this.articlesCat = res[1];
        
      },
      error =>
      {
        
      }
    );
  }

  obrirModalActualitzarArticle(article, idioma)
  {
    this.actualizarArticle.id = article.id;
    this.actualizarArticle.language = idioma;
    this.actualizarArticle.content = article.content;
    this.actualizarArticle.title1 = article.title_article;
    this.actualizarArticle.description1 = article.descripcio1;
    this.actualizarArticle.categoria = article.categoria;
    this.actualizarArticle.img = article.img;

    $('.popup #inputId').val(article.id);
    $('.popup #inputImatge').val(article.img);
    $('.popup #inputTitolArticle').val(article.title_article);
    $('.popup #inputPrimeraDescripcio').val(article.descripcio1);
    $('.popup #inputContent').val(article.content);
    $('.popup #selectCategoria').val(article.categoria);

  }

  enviardadesEditarArticle(){
 
    this.articleService.editarArticle(this.actualizarArticle).subscribe(
      res =>
      {
        alert("S'ha actualitzat l'article correctament.");
        this.tancarPopup();
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/vxcbhkypwnbniuqwezmncaerdfbwtopkjjhsers']);
      });
        // this.router.navigate(['/blog-dolibarr']);
      },
      //Control d'errors del servidor
      error =>
      {
        alert("No s'ha pogut actualitzar l'article, intenta-ho més tard.");
      }
    );
  }

  eliminarArticle(id, idioma){
    this.articleService.eliminarArticle(id, idioma).subscribe(
      res =>
      {
        alert("S'ha eliminat l'article correctament.");
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/vxcbhkypwnbniuqwezmncaerdfbwtopkjjhsers']);
      });
      },
       //Control d'errors del servidor
       error =>
       {
         alert("No s'ha pogut eliminar l'article, intenta-ho més tard.");
         
       }
    );
  }

  tancarPopup()
  {
    $('#tancarPopup').click();
  }
}
