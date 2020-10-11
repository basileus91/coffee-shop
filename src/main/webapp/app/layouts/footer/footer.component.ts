import { Component } from '@angular/core';
import { faFacebook, faInstagram, faTumblr, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'jhi-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faTumblr = faTumblr;
  faTwitter = faTwitter;
}
