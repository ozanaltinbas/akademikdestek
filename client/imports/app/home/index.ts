import { HomeComponent } from './home.component';
import { IntroComponent } from './intro/intro.component';
import { AboutComponent } from './about/about.component';
import { TeamComponent } from './team/team.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { CONTACT_MESSAGES_DECLARATIONS } from './contact/message/index';

export const HOME_DECLARATIONS = [
    HomeComponent,
    IntroComponent,
    AboutComponent,
    TeamComponent,
    ServicesComponent,
    ContactComponent,
    ...CONTACT_MESSAGES_DECLARATIONS
];