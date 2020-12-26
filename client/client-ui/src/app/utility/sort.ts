import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'autoSort'})
export class SortPipe implements PipeTransform {

  transform(input: Array<any>, col, order) {
      console.log(col,order)
      console.log(input)
    return input.sort( (a,b) => {
        // a>b?1:-1

        if(a[col] < b[col]){
            return -1 * order;
          }
          else if( a[col] > b[col]){
            return 1 * order;
          }
          else{
            return 0;
          }
        
    });
}
  
}