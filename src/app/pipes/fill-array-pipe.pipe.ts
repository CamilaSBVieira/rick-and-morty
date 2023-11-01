import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fillArrayPipe'
})
export class FillArrayPipePipe implements PipeTransform {

  transform(number: number) {
    return Array.from({length: number}, (_, i) => i + 1)
  }

}
