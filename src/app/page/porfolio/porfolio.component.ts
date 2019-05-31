import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-porfolio',
  templateUrl: './porfolio.component.html',
  styleUrls: ['./porfolio.component.css']
})
export class PorfolioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showWebProjects(){alert("web");}
  showAppProjects(){alert("app");}
  showDataScienceProjects(){alert("data science");}
  showGameProjects(){alert("game");}
  show3DProjects(){alert("3D");}
  showMakerProjects(){alert("Maker");}

}
