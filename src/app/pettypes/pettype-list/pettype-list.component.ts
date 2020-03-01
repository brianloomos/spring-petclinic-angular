import {Component, OnInit} from '@angular/core';
import {PetType} from '../pettype';
import {Router} from '@angular/router';
import {PetTypeService} from '../pettype.service';
import {Specialty} from '../../specialties/specialty';

@Component({
  selector: 'app-pettype-list',
  templateUrl: './pettype-list.component.html',
  styleUrls: ['./pettype-list.component.css']
})
export class PettypeListComponent implements OnInit {
  pettypes: PetType[];
  errorMessage: string;
  responseStatus: number;
  isInsert = false;

  constructor(private pettypeService: PetTypeService, private router: Router) {
    this.pettypes = [] as PetType[];
  }

  ngOnInit() {
    console.log('randomize');
    this.pettypeService.getPetTypes().subscribe(
      pettypes => this.pettypes = pettypes.sort(function(a, b){return 0.5 - Math.random()}),
      error => this.errorMessage = error as any
    );
  }

  deletePettype(pettype: PetType) {
    console.log('crazy stuff happening here!');
    //pettype.id = (pettype.id-1)
    this.pettypeService.deletePetType(pettype.id.toString()).subscribe(
      response => {
        this.responseStatus = response;
        this.pettypes = this.pettypes.filter(currentItem => !(currentItem.id === pettype.id));
      },
      error => this.errorMessage = error as any);
  }

  onNewPettype(newPetType: Specialty) {
    this.pettypes.push(newPetType);
    this.showAddPettypeComponent();
  }

  showAddPettypeComponent() {
    this.isInsert = !this.isInsert;
  }

  showEditPettypeComponent(updatedPetType: PetType) {
    this.router.navigate(['/pettypes', updatedPetType.id.toString(), 'edit']);
  }

  gotoHome() {
    this.router.navigate(['/welcome']);
  }
}
