
In order to make our lives simpler across platforms and team members we will be using Node Package Manager (npm).
For Windows Machines, you'll need two things
  1) a BASH Shell (cmder or gitbash)
  2) the latest version of Node installed (which installs npm)

When you pull any new commits run the `npm install` in which ever shell you have which will install all dependencies from package.json (Something to note is that node modules will not be committed thanks to the .gitignore).

Also for any of the following commands to work you'll need the angular-cli found `https://cli.angular.io/`.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
