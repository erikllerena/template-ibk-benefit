import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

@Injectable()
export class FilterPipe implements PipeTransform {
    transform(items: any[], field : string, value : string): any[] {  
      if (!items) return [];
      if (!value || value.length == 0) return items;
      //Si están separados con ; también está validado
      return items.filter(it => value.split(";").some(s => s == it[field].toLowerCase()));
    }
}
