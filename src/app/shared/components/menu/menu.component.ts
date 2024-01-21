import { Component, HostListener, Input, OnInit, Output } from '@angular/core';
import { Category, Concept, SubCategory } from '../../interfaces';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  @Input() openSidebar: boolean;
  @Input() concepts: Concept[];
  @Input() categories: Category[];
  @Input() subcategories: SubCategory[];

  openSubMenu: boolean = false;
  openSubMenuDetail: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth >  768) {
      this.closeSideBar()
    }
  }

  constructor(private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    
  }

  findByUuidConcept(category: any, uuid: string): any {
    return category.uuid == uuid;
  }

  closeDetail(element: HTMLElement) {
    if(!this.openSidebar) {
      document.getElementById(element.getAttribute('aria-labelledby')).classList.remove('active');    
      element.classList.remove('active', 'show')
    }
  }

  closeSideBar() {
    this.openSidebar = false;
    this.openSubMenu = false;
    this.openSubMenuDetail = false;
  }

  createValueOfAttributes(pre:string, name: string, sub: string) {
    return pre + name + sub;
  }

  selectConcept() {
    if(this.openSidebar) this.openSubMenu = !this.openSubMenu;    
  }

  selectCategory() {
    if(this.openSidebar) this.openSubMenuDetail = !this.openSubMenuDetail; 
  }

  selectSubCategory(uuid: string) {    
    this.localStorageService.save('search', { categories: uuid})
    this.navigateTo();
  }

  navigateTo() {
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

}
