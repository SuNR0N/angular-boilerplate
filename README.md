# angular-boilerplate

> An Angular 2+ CRUD application featuring [Angular 2+](https://angular.io), [Bootstrap 4](https://v4-alpha.getbootstrap.com/), [TypeScript](http://www.typescriptlang.org/), [TSLint](http://palantir.github.io/tslint/), [TypeDoc](http://typedoc.org/), [Karma](https://karma-runner.github.io/1.0/index.html), [Mocha](https://mochajs.org/), [Chai](http://chaijs.com/), [Sinon.JS](http://sinonjs.org/), [Protractor](http://www.protractortest.org/#/), [Istanbul](https://github.com/gotwarlost/istanbul), [Express](https://expressjs.com/), [JWT](https://jwt.io/), [HAL](http://stateless.co/hal_specification.html), [Webpack](https://webpack.js.org/), [Docker](https://www.docker.com/)

The application is an enhanced version of my [old demo](https://github.com/opencredo/angular2-boilerplate) which was using the alpha version of Angular 2 and it tries to demonstrate the following features:
- Angular 2+ features
- Best practices for code style and organisation
- TypeScript and setting up coding standards with TSLint
- Production ready build system with Webpack
- Unit testing with Karma, Mocha, Chai, Sinon.JS
- End-to-end testing with Protractor
- Code coverage with Karma & Istanbul
- Code documentation with TypeDoc
- RESTful API design
- Hypermedia-driven APIs with HAL
- Authentication with JWT


### Quick start
```bash
# clone the repository
git clone https://github.com/SuNR0N/angular-boilerplate.git

# change directory
cd angular-boilerplate

# install required packages via npm
npm install

# start the server
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your favourite browser

Login Credentials:
> Username: john.doe, Password: password123

### TODO

- [X] Integrate font-awesome
- [X] Investigate badge issue for Bootstrap 4
- [X] Implement ToasterService
- [X] Implement 404 and Unauthorized pages
- [X] Implement modal and canDeactivate guard when leaving Edit/Create page
- [X] Add support for data reset
- [X] Implement filtering for List page
- [X] Implement Pager component for List page
- [ ] Implement unit tests
- [ ] Implement e2e tests
- [ ] Add proper styling using SASS
- [ ] Use enableProdMode in production
- [ ] Add HMR for Express
- [ ] Add Swagger spec
- [ ] Implement responsive design