import { Router, NavigationStart } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertType, Alert } from '../component/alert/alert.model';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
          if (this.keepAfterRouteChange) {
              // only keep for a single route change
              this.keepAfterRouteChange = false;
          } else {
              // clear alert messages
              this.clear();
          }
      }
  });
  }
     getAlert(): Observable<any> {
            return this.subject.asObservable();
        }

        success(message: string, keepAfterRouteChange = false) {
            this.alert(AlertType.Success, message, keepAfterRouteChange);
        }

        error(message: string, keepAfterRouteChange = false) {
            this.alert(AlertType.Error, message, keepAfterRouteChange);
        }

        info(message: string, keepAfterRouteChange = false) {
            this.alert(AlertType.Info, message, keepAfterRouteChange);
        }

        warn(message: string, keepAfterRouteChange = false) {
            this.alert(AlertType.Warning, message, keepAfterRouteChange);
        }

        alert(type: AlertType, message: string, keepAfterRouteChange = false) {
            this.keepAfterRouteChange = keepAfterRouteChange;
            this.subject.next({ type, message } as Alert);
        }

        clear() {
            // clear alerts
            this.subject.next();
        }
}
