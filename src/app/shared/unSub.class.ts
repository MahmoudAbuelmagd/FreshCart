import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn:"root"
})
  
export abstract class unSub implements OnDestroy{
  unSub$ = new Subject<void>()
  ngOnDestroy(): void {
  this.unSub$.next()
  this.unSub$.complete()
  }
  
}