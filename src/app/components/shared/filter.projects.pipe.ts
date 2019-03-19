import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProjects'
})

export class FilterProjectsPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;

searchText = searchText.toLowerCase();

return items.filter( it => {
      return it.title.toLowerCase().includes(searchText) || it.reference.toLowerCase().includes(searchText);
    });
   }
}