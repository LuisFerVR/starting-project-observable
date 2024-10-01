import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit{
  destroyRef=inject(DestroyRef);
  clickCount=signal(0);
  clickCount$=toObservable(this.clickCount);
  /* doubleClickCount=computed(()=>this.clickCount()*2); */
  constructor(){
    toObservable
    /* effect(()=>{
      console.log('N° veces click:',this.clickCount());
    }) */
  }
  ngOnInit(): void {
    const suscription = this.clickCount$.subscribe({
      next(value){
        console.log('N° veces click:',value);
      }
    });
    this.destroyRef.onDestroy(()=>suscription.unsubscribe());
    /* setInterval(()=>{
      this.clickCount.update((prevCount)=>prevCount+1);
    },1000); */
    /* const suscription = interval(1000).pipe(
      map((value) => value * 2)
    ).subscribe({
      next(value) {
        console.log(value);
      },
    });
    this.destroyRef.onDestroy(()=>suscription.unsubscribe()); */
  }

  onClick(){
    this.clickCount.update((prevCount)=>prevCount+1);
  }
}
