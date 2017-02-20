import { platformBrowser } from '@angular/platform-browser';

import { AppModuleNgFactory } from '../aot/src/app/app.module.ngfactory';

console.log('Running AOT compiled');

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory)
    .then((success) => console.log('Bootstrap success'))
    .catch((error) => console.log(error));
