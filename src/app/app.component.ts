import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { IServerDropdownOption } from './models/server-dropdown';
import { GuidService} from './services/guid.service';
import { shareReplay } from 'rxjs/operators';
import { DropdownGuids } from './models/dropdown-guids.enum';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: "app-root",
    styleUrls: ["./app.component.scss"],
    templateUrl: "./app.component.html"
})
export class AppComponent {
    public title = "Samples";

    form = new FormGroup({
    combo1: new FormControl(''),
    combo2: new FormControl(''),
  })
}
