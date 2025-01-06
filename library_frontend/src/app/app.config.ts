import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { MyPreset } from './theme/my-preset';  // Import your custom preset
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { TitleCasePipe } from '@angular/common';
import { ConfirmationService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: MyPreset  // Use your custom preset here
            }
        }),
        provideHttpClient(withInterceptorsFromDi()),
        DatePipe,
        TitleCasePipe,
        ConfirmationService
    ]
};
