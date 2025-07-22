import { Directive, HostBinding, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appDropdown]',
    standalone: false
})

export class DropdownDirective {
    private dropdownMenu: HTMLElement | null = null;

    constructor(private elRef: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {
        this.dropdownMenu = this.elRef.nativeElement.querySelector('.dropdown-menu');
    }

    @HostListener('click')
    toggleOpen() {
        if (this.dropdownMenu) {
            if (this.dropdownMenu.classList.contains('show')) {
                this.renderer.removeClass(this.dropdownMenu, 'show');
            } else {
                this.renderer.addClass(this.dropdownMenu, 'show');
            }
        }
    }

    @HostListener('document:click', ['$event.target'])
    onDocumentClick(target: HTMLElement) {
        if (this.elRef.nativeElement.contains(target)) {
            // click inside, ignore
            return;
        }
        if (this.dropdownMenu) {
            this.renderer.removeClass(this.dropdownMenu, 'show');
        }
    }
}