import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent implements OnInit {
  @Input() pageConfig
  @Input() list

  orderByField = 'name';
  reverseSort = false;

configCustomPagination: any;
collectionCustomPagination = { count: 30, data: [] };

  constructor() {
    // this.collectionCustomPagination = this.list;
    // console.log(this.list);
    

    // this.config = {
    //   id: 'basicPaginate',
    //   itemsPerPage: 5,
    //   currentPage: 1,
    //   totalItems: 500
    // };
    // this.configCustomPagination = this.pageConfig
    // console.log(this.pageConfig)

    // this.configCustomPagination = {
    //   id: 'customPaginate',
    //   itemsPerPage: 10,
    //   currentPage: 1,
    //   totalItems: 500
    // };
  }

  ngOnInit(): void {
    console.log(this.pageConfig)
    console.log(this.list)
    this.collectionCustomPagination = this.list;
    this.configCustomPagination = this.pageConfig

  }
// column to sort
column = 'score';
 
// sort ordering (Ascending or Descending). Set true for desending
reverse = false; 

reverseclass:string

// called on header click
sortColumn (col){
 this.column = col;
 if(this.reverse){
  this.reverse = false;
  this.reverseclass = 'arrow-up';
 }else{
  this.reverse = true;
  this.reverseclass = 'arrow-down';
 }
};

// remove and change class
sortClass(col){
 if(this.column == col ){
  if(this.reverse){
   return 'arrow-down'; 
  }else{
   return 'arrow-up';
  }
 }else{
  return '';
 }
 
}

public maxSize: number = 7;
public directionLinks: boolean = true;
public autoHide: boolean = false;
public responsive: boolean = true;
public labels: any = {
  previousLabel: '<--',
  nextLabel: '-->',
  screenReaderPaginationLabel: 'Pagination',
  screenReaderPageLabel: 'page',
  screenReaderCurrentLabel: `You're on page`
};

pageChanged(event) {
  this.pageConfig.currentPage = event;
}

onPageChange(event) {
  this.configCustomPagination.currentPage = event;
}

}
