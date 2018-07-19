import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forbiddenNameValidator } from '../forbidden-name.directive';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

	powers = ['Readly Smart', 'Super Flexible', 'Super Hot', 'Weather Changer'];
	model =  {name: 'Dr.', alterEgo: 'Dr. What', power: this.powers[0]};
	//model = new Hero(18, 'Dr IQ', this.powers[0], 'Chunk Overstreet');
	heroForm: FormGroup;


    get name() {
    	return this.heroForm.get('name');
    }

    get power() {
    	return this.heroForm.get('power');
    }

  constructor() { }

  ngOnInit() {
  	this.heroForm = new FormGroup({
		'name': new FormControl(this.model.name,
			[
                Validators.required,
                Validators.minLength(4),
                forbiddenNameValidator(/bob/i)
			]),
            'alterEgo': new FormControl(this.model.alterEgo),
            'power': new FormControl(this.model.power,
            	Validators.required)
		});
  }

}
