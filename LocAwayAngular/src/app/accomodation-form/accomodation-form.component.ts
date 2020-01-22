import {Component, OnInit} from '@angular/core';
import {AccomodationHttpService} from '../accomodation/accomodation-http.service';
import {Accomodation} from "../Model/Accomodation";
import {ActivatedRoute, Router} from "@angular/router";
import {Option} from "../Model/Option";
import {OptionHttpService} from "../Option/option.service";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {HttpClient, HttpEvent} from "@angular/common/http";
import {FileHttpService} from "../fileUpload/file-http.service";
import {PhotoHttpService} from "../photo/photo-http.service";
import {Photo} from "../Model/Photo";
import {User} from "../Model/User";

@Component({
  selector: 'app-accomodation-form',
  templateUrl: './accomodation-form.component.html',
  styleUrls: ['./accomodation-form.component.css']
})
export class AccomodationFormComponent implements OnInit {
  connectedU : User = JSON.parse(localStorage.getItem("connectedUser"));

  newAccomodation: Accomodation = new Accomodation();
  option: Option;
  optionId: number;
  options: Array<Option>;

  accept = '*'
  files:File[] = []
  progress:number
  //url = 'https://evening-anchorage-3159.herokuapp.com/api/'
  url = 'https://jquery-file-upload.appspot.com/'
  hasBaseDropZoneOver:boolean = false
  httpEmitter:Subscription
  httpEvent:HttpEvent<{}>
  lastFileAt:Date
  sendableFormData:FormData//populated via ngfFormData directive
  dragFiles:any
  validComboDrag:any
  lastInvalids:any
  fileDropDisabled:any
  maxSize:any
  baseDropValid:any


  constructor(private accomodationService: AccomodationHttpService, private route: ActivatedRoute, private optionService: OptionHttpService, private fileService: FileHttpService, private photoService: PhotoHttpService, private router: Router) {
    this.newAccomodation = new Accomodation();
    this.optionService.findAllObservable().subscribe(resp => {
      this.options = resp;

    }, err => console.log(err));

  }

  typesDeBiens(){
    return this.accomodationService.typesDeBiens;
  }

  save() {

    for(let option of this.options) {
      if(option.checked) {
        this.newAccomodation.options.push(option);
      }
    }


    this.newAccomodation.user = this.connectedU;
    this.accomodationService.saveObservable(this.newAccomodation).subscribe((accomResp) =>{
      //variable pour rediriger après l'upload de la dernière photo
      let nbPhoto: number = 0;
      this.files.forEach((file) =>{
        this.fileService.upload(file).subscribe((resp) =>{
          let newPhoto: Photo = new Photo();
          newPhoto.accomodation = accomResp;
          newPhoto.path = resp.fileDownloadUri;
          this.photoService.saveObservable(newPhoto).subscribe((resp) =>{
            nbPhoto++;
            if(nbPhoto == this.files.length){
              this.router.navigate(["accomodation-detail", accomResp.id]);
            }
          });

        });
      });
    });
  }
  getDate(){
    return new Date()
  }
  ngOnInit() {

  }

  textForAccomtype(typedebien: string): string{
    if(typedebien == "HOUSE"){
      return "Maison";
    } else if(typedebien == "APPARTMENT"){
      return "Appartement";
    }else if(typedebien == "GUESTHOUSE"){
      return "Maison d'hôtes";
    }else if(typedebien == "ALTERNATIVE"){
      return "Alternatif";
    }else{
      return "défaut";
    }
  }
}
