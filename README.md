# TFG

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.7.

## Installation

This guide is made to linux operating systems. We recommend that you run all the commands at the `sudo` state. 

1. **Install git, npm and mongodb:**
    1. Run `apt install git npm mongodb`.That will install the git, npm and mongodb packages saved at the Advanced Packaging Tool cloud.  
1. **Clone the repo of the project:**
    1. At the folder you want to use to save the project, open a terminal and run `git clone https://github.com/Wordsan/TFG-18-19`. That will make a copy of the project.
1. **Install the dependencies of the project:**
    1. Now run `npm install`. That will install all the dependencies at the package.json file. 
    1. Run `npm install -g @angular/cli`. That's a dependency of the project that needs to be installed individually (due to some errors). 
1. **Run the db:**
    1. Run `service mongodb start`. That will start the mongodb and it will be ready to use. 
1. **Run the backend:**
    1. Run `node index.js`. 
1. **Run the frontend:**
    1. See the *Development server* head. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
To learn more about git: (https://git-scm.com/doc).
  
