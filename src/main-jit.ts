import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

console.log('Running JIT compiled');

platformBrowserDynamic().bootstrapModule(AppModule)
    .then((success) => console.log('Bootstrap success'))
    .catch((error) => console.log(error));
