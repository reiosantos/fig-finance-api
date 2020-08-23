import {readdirSync} from 'fs';
import { Express } from "express";

let trimTs = (path: string) => {
  return path.substr(0, path.length - 3);
};

let acceptTsNotIndex = (fileName: string) => {
  return fileName.substr(-3) === '.js' && fileName.substr(0, 5) !== 'index';
};

const initControllers = (app: Express, express: any, routerPrefix: string) => {
  readdirSync(__dirname).forEach(function (fileName) {
    if (acceptTsNotIndex(fileName)) {
      new (require('./' + trimTs(fileName)))(app, express, routerPrefix);
    }
  });
};

export default initControllers;
