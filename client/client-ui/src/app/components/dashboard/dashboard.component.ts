import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { TeamServiceService} from './../../service/team-service.service';
import {Observable, Subject, fromEvent} from 'rxjs';
import { of, timer } from 'rxjs';
import { map, filter, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import {Team} from './../../model/team';
import { EventManager } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tags:Array<any>  = []
  @ViewChild('ref1') ref1: ElementRef;
  @ViewChild('ref2') ref2: ElementRef;
  @ViewChild('suggestion1') sugg1: ElementRef;
  @ViewChild('suggestion2') sugg2: ElementRef;

  isteam1Winner:Boolean = null
  isteam2Winner:Boolean = null

  listSugg1:Array<any> = []
  listSugg2:Array<any> = []
  isShow:boolean = false
  
  
  firstTeamId:string
  secondTeamId:string
  example = {
  firstTeamName:'',
  secondTeamName:''
  }
  isTied



  config: any = {
    id: "customPaginate",
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0
  }
  collection = { 
    count:0, 
    data:[] 
  }
  passedCollection = Object.create({ 
    count:0, 
    data:[] 
  }) 

  constructor(private _teamService: TeamServiceService, private elm: ElementRef) { 

  }

  ngOnInit(): void {
    this.callInitialData()
  }

  ngAfterViewInit() {
    let isZeroLenghtSugg1 = -1
    let isZeroLenghtSugg2 = -1


    fromEvent([this.ref1.nativeElement, this.ref2.nativeElement, 
               this.sugg1.nativeElement, this.sugg2.nativeElement], 'keyup')
    .pipe(
       // get value
       map((event: any) => {
        //  console.log(event.target.id)
        if(event.keyCode === 8 || event.keyCode === 46) this.reset(null)
        return [event.target.value, event.target.id, event.keyCode];
    })
    // if character length greater then 2
    ,filter(res => { 
      if(res[0].length === 0) { 

         if(res[1] === 'sugg1'){
           this.listSugg1 = []
           isZeroLenghtSugg1 = 0
         } else if(res[1] === 'sugg2'){
           this.listSugg2 = []
           isZeroLenghtSugg2 = 0
        } else {
           this.reset(null);
        }
        
        }
        if(isZeroLenghtSugg2 === 0 && isZeroLenghtSugg1 ===0 || 
          isZeroLenghtSugg2 === 0 && isZeroLenghtSugg1 ===-1 || 
          isZeroLenghtSugg2 === -1 && isZeroLenghtSugg1 ===0) 
        this.isShow = false;

      return res[1]==='sugg1'||res[1]==='sugg2'? res[0].length > 2: res[0].length > 0
    })
    // Time in milliseconds between key events
    ,debounceTime(500)        
    // If previous query is diffent from current   
    ,distinctUntilChanged()
    // subscription for response
    )
    .subscribe(res => {
      console.log(res)
    if(res[1] === 'team_name') { 
        this.findByName(res[0]); 
      }
     else if(res[1] === 'score'){
       this.findByScore(res[0]);
     }else if(res[1]==='sugg1') {
      this.getSuggestion(res[1], res[0])
      isZeroLenghtSugg1 = -1
     } else if(res[1]==='sugg2'){
       this.getSuggestion(res[1], res[0])
       isZeroLenghtSugg2 = -1
     }
    });

  }

  getSuggestion(target, matchPattern) {
    console.log(target, matchPattern);

    let list:Array<any> = this.collection.data.filter(data => {
      
      let team_name:String = data.team_name.toLowerCase()

      let isMatch:boolean = true
      matchPattern.trim().toLowerCase().split('').forEach((chr,idx) => {
        if(chr != team_name[idx])
        isMatch = false
      });

      if(isMatch) {
        this.passedCollection.count++;
        return true
      }
    })

    if(target === 'sugg1'){
      this.listSugg1 = list
      this.isShow = true;
    }else if(target === 'sugg2') {
      this.listSugg2 = list
      this.isShow = true;
    }
    console.log(list);
    
    
  }

  addTeam(target, _id, teamName) {
    console.log(target, _id, teamName);
    if(target === 'team1') { 
       this.firstTeamId = _id;
       this.example.firstTeamName = teamName;
       this.isShow = false
       this.listSugg1 = []
      }
    if(target === 'team2') { 
      this.secondTeamId = _id
      this.example.secondTeamName = teamName
      this.isShow = false
      this.listSugg2 = []
    }
  }



  onSubmit(){
    let obj = {
      winner:'',
      losser:'',
      tied:null
    }

  if(this.isTied) {
    obj.winner = this.firstTeamId
    obj.losser = this.secondTeamId
    obj.tied = this.isTied
  }
  else {
      obj.winner= this.isteam1Winner?this.firstTeamId:this.secondTeamId,
      obj.losser= this.isteam2Winner?this.firstTeamId:this.secondTeamId,
      obj.tied= this.isTied
    }

    // console.log(obj)
  // validate
    this._teamService.postMatchWinner(obj).subscribe((data) => {
      console.log(data)
      this.callInitialData()
    })
    
  }

  markWinner(event, team) {
    console.log(event.target, team)
    if(team === 'team1') {
      this.isteam1Winner = true
      this.isteam2Winner = false
      this.isTied = false
    } else if(team === 'team2') {
      this.isteam1Winner = false
      this.isteam2Winner = true
      this.isTied = false
    } else if (team === 'tied') {
      this.isTied = true
      this.isteam1Winner = false
      this.isteam2Winner = false
    }
  }

  callInitialData() {
    this._teamService.getScoreCard().subscribe((data:any) => {
      this.collection.data = data.list
      this.collection.count = data.list.length
      this.config.totalItems = this.collection.count
      this.passedCollection.count = this.collection.count
      this.passedCollection.data = this.collection.data
    })
  }

  
  sort() {
      console.log("sort")

  }
 
  findByName(matchPattern:String) {
    console.log(matchPattern);
    this.passedCollection.count = 0

    this.passedCollection.data = this.passedCollection.data.filter(data => {
      
      let team_name:String = data.team_name.toLowerCase()

      let isMatch:boolean = true
      matchPattern.trim().toLowerCase().split('').forEach((chr,idx) => {
        if(chr != team_name[idx])
        isMatch = false
      });

      if(isMatch) {
        this.passedCollection.count++;
        return true
      }
    })
    console.log(this.passedCollection);
    
  }

  findByScore(matchPattern) {
    console.log(matchPattern);
    this.passedCollection.count = 0
    this.passedCollection.data = this.passedCollection.data.filter(data => {
      // console.log(data.score)
      if(data.score ==  Number(matchPattern))
      {
        this.passedCollection.count++;
        console.log(data)
        return data;
      }
      })
  }

  checkbox( target) {
    // console.log(event, target);
    let index = this.tags.indexOf(target);
    // console.log(index)

  if (index == -1) {
    this.tags.push(target);
  } else {
    do {
      this.tags.splice(index, 1);
      index = this.tags.indexOf(target);
      this.reset(null)
    } while (index != -1);
  }
  console.log(this.tags)
    
  }

  reset(e) {
    // console.log(e.target.id)
    if(e!=null && e.target.id === "reset") {
      this.callInitialData()
      return;
    }
    this.passedCollection.count = this.collection.count; 
    this.passedCollection.data = this.collection.data;
  }
      

}
