import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactFormComponent } from 'src/app/components/contact-form/contact-form.component';
import { InputLoginComponent } from 'src/app/components/input-login/input-login.component';

@Component({
  selector: 'app-porfolio',
  templateUrl: './porfolio.component.html',
  styleUrls: ['./porfolio.component.css']
})
export class PorfolioComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  showWebProjects(){
    //alert("web");
    const modal = this.modalService.open(ContactFormComponent);
    modal.result.then(
      this.handleModalInputLoginClose.bind(this),
      this.handleModalInputLoginClose.bind(this)
    )
  }
  showAppProjects(){alert("app");}
  showDataScienceProjects(){alert("data science");}
  showGameProjects(){alert("game");}
  show3DProjects(){alert("3D");}
  showMakerProjects(){alert("Maker");}

  handleModalInputLoginClose(){
    //alert("se ha cerrado el modal");
  }
}


