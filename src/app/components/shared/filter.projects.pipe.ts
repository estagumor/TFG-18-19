import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProjects'
})

export class FilterProjectsPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText || searchText.length == 0) return items;

searchText = searchText.toLowerCase();
    console.log(items)
return items.filter( it => {
      console.log(it);
      
      return it.title.toLowerCase().includes(searchText) || it.reference.toLowerCase().includes(searchText);
    });
   }
}