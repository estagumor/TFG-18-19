import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPublications'
})

export class FilterPublicationsPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText || searchText.length == 0) return items;

searchText = searchText.toLowerCase();
return items.filter( it => {     
      return it.articleTitle.toLowerCase().includes(searchText);
    });
   }
}