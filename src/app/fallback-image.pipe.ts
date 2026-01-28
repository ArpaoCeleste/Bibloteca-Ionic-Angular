import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fallbackImage'
})
export class FallbackImagePipe implements PipeTransform {
  transform(imageUrl: string, fallbackUrl: string = '/assets/img/default-cover.png'): string {
    console.log('Image URL:', imageUrl, 'Fallback URL:', fallbackUrl);
    return imageUrl ? imageUrl : fallbackUrl;
  }
}
