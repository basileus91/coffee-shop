import { Component, OnInit, ViewChild } from '@angular/core';
import { EsriMapDirective, Layer } from 'ng-esri-map';

@Component({
  selector: 'jhi-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  public layers: Layer[] = [
    {
      url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer'
    }
  ];
  @ViewChild('ngEsriMap', { static: false }) private myMap: EsriMapDirective;

  constructor() {}

  ngOnInit() {
    console.log(this.myMap);
    this.myMap.initMap({ latitude: 1, longitude: 2 });
  }
}
