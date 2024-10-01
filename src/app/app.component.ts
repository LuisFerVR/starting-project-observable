import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit{
  destroyRef=inject(DestroyRef);
  clickCount=signal(0);
  constructor(){
    effect(()=>{
      console.log('N° veces click:',this.clickCount());
    })
  }
  ngOnInit(): void {
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
