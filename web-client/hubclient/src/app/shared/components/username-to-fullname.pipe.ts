import { PipeTransform, Pipe } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { User } from 'src/app/models/innovation-hub.model';
import { user } from 'src/app/models/sample/sample-campaign';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Pipe({ name: 'usernameToFullName'})
export class UsernameToFullNamePipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    let users: any[];
    let userObjects = new User();
    let valueToReturn: any;
    let valueFound = false;
    if (args && args.length > 0) {
      args.forEach((x) => {
        users = x;
        if (!valueFound) {
          users.forEach((key: any) => {
            if (!valueFound) {
            userObjects = plainToClass(User, key);
            if (value === userObjects.username) {
              valueToReturn = userObjects.fullName;
              valueFound = true;
            } else {
              valueToReturn = userObjects.username;
            }
          }
          });
        }
      });
    } else {
      valueToReturn = value;
    }
    if (!valueToReturn) {
      valueToReturn = value;
    }
    return valueToReturn;
  }
}
