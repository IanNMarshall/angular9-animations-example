import { NgModule } from '@angular/core';
import { 
  RouterModule,
  RouteReuseStrategy,
  DetachedRouteHandle,
  ActivatedRouteSnapshot
 } from '@angular/router';
import { AnimatedComponent } from "./animated/animated.component";
import { HomeComponent } from './home/home.component';

export class CustomReuseStrategy implements RouteReuseStrategy { 

  private handlers: {[key: string]: DetachedRouteHandle} = {};
  
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    console.log("RouteReuse: shouldDetach")
    return true;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    console.log("RouteReuse: store", handle)
    this.handlers[route.url.join("/")] = handle;    
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    console.log("RouteReuse: shouldAttach", !!this.handlers[route.url.join("/")])
    return !!this.handlers[route.url.join("/")];    
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    console.log("RouteReuse: retrieve", this.handlers[route.url.join("/")])
    return this.handlers[route.url.join("/")];    
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    console.log("RouteReuse: shouldReuseRoute", future.routeConfig === curr.routeConfig)
    return future.routeConfig === curr.routeConfig;
  }
}
@NgModule({
  imports: 
  [
  RouterModule.forRoot(
    [
      {
        path: "home",
        component: HomeComponent,
        data: { title: "My Dashboard" }
      },
      {
        path: "animation",
        component: AnimatedComponent,
        data: { title: "My Dashboard" }
      },
    ],
    {
      useHash: true,
      onSameUrlNavigation: "reload"
    }
  )],
  providers: [
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
