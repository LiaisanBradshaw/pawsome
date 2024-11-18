import { Component, ElementRef, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './services/data.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  template: `
  <!--Displaying all of the data-->
  <link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
  crossorigin="anonymous"
/>

<div class="container my-4">
  <h1 class="text-center mb-4">🐾 Dog Breeds and Sub-Breeds</h1>
  <div *ngIf="breeds | keyvalue as breedArray; else loading" class="row g-3">
    <!-- Breed cards -->
    <div *ngFor="let breed of breedArray" class="col-md-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body">
          <h3 class="card-title text-primary">{{ breed.key }}</h3>
          <ul class="list-group list-group-flush" *ngIf="breed.value.length > 0">
          <p class="d-inline-flex gap-1">
            <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseSubBreeds{{ breed.key }}" role="button" aria-expanded="false" aria-controls="collapseSubBreeds">
              See Sub Breeds
            </a>
          </p>
          <div class="collapse" id="collapseSubBreeds{{ breed.key }}">
              <li
                class="list-group-item text-secondary"
                *ngFor="let subBreed of breed.value"
              >
              {{ subBreed }}
              </li>
          </div>
        </ul>
        <p class="text-muted mt-2" *ngIf="breed.value.length === 0">
          No sub-breeds
        </p>
          <button
            class="btn btn-outline-primary mt-3"
            (click)="getRandomImage(breed.key)"
          >
            Show Random Image
          </button>
        </div>
        <div class="card-footer bg-light text-center" *ngIf="chosenBreed === breed.key">
          <img
            [src]="breedImg"
            class="img-fluid rounded"
            alt="Random image of {{ breed.key }}"
          />
        </div>
      </div>
    </div>
  </div>
  <ng-template #loading>
    <div class="text-center">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2">Loading breeds...</p>
    </div>
  </ng-template>
</div>

  `,
  standalone: true
})
export class AppComponent implements OnInit {
  breeds: { [key: string] : string[] } = {};
  breedImg: { [key: string] : string[] } = {};
  chosenBreed: string = '';
  
  //getting the breeds
  constructor(private service: DataService, private elementRef:ElementRef){}
  ngOnInit(): void {
    this.service.getBreeds().subscribe((response) =>{
      this.breeds = response.message;
    });
  }

  //importing bootstrap js
  ngAfterViewInit() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
    this.elementRef.nativeElement.appendChild(script);
  }

  //getting a randon image for a specific breed
  getRandomImage(breed_name: string){
    this.chosenBreed = breed_name;
    this.service.getImage(breed_name).subscribe((response) =>{
      this.breedImg=response.message;
    })
  }
}
