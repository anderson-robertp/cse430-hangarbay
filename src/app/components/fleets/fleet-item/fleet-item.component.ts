import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Fleet } from '../fleet.model';

@Component({
  selector: 'app-fleet-item',
  standalone: false,
  templateUrl: './fleet-item.component.html',
  styleUrl: './fleet-item.component.scss'
})

export class FleetItemComponent {
  
  @Input() fleet!: Fleet;
  @Output() select = new EventEmitter<Fleet>();
  @Output() delete = new EventEmitter<Fleet>();

  onSelect() {
    this.select.emit(this.fleet);
  }

  onDelete() {
    this.delete.emit(this.fleet);
  }
}
