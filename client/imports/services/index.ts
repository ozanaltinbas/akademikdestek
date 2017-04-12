import { AccountsService } from './accounts.service';
import { LoggedInGuard } from './logged-in-guard';
import { LoggedOutGuard } from './logged-out-guard';

export const SERVICES_DECLARATIONS: any[] = [
    AccountsService,
    LoggedInGuard,
    LoggedOutGuard
];
