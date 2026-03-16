import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Force dark mode to match Stitch hero/dashboard designs.
document.documentElement.classList.add('dark');

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));
