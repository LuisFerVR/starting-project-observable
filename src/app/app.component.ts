import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit{
  destroyRef=inject(DestroyRef);
  clickCount=signal(0);
  clickCount$=toObservable(this.clickCount);
  interval$=interval(1000);
  intervalSignal=toSignal(this.interval$,{initialValue:0});
  observablePersonalizado$=new Observable((subscriber)=>{
    let timeExtecuted=0;
    const interval = setInterval(()=>{
      if(timeExtecuted>3){
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log('Emitiendo valor');
      subscriber.next({mesage:'new Value'});
      timeExtecuted ++;
    },2000)
  })
  /* doubleClickCount=computed(()=>this.clickCount()*2); */
  constructor(){
    toObservable
    /* effect(()=>{
      console.log('N° veces click:',this.clickCount());
    }) */
  }
  ngOnInit(): void {
    this.observablePersonalizado$.subscribe({next:(msg)=> console.log(msg), complete:()=>console.log('Completado')});
    /* const suscription = this.clickCount$.subscribe({
      next(value){
        console.log('N° veces click:',value);
      }
    });
    this.destroyRef.onDestroy(()=>suscription.unsubscribe()); */
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
