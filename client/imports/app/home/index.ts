import { HomeComponent } from './home.component';
import { IntroComponent } from './intro/intro.component';
import { AboutComponent } from './about/about.component';
import { TeamComponent } from './team/team.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { CONTACT_MESSAGES_DECLARATIONS } from './contact/message/index';
import { TeamFirstComponent } from './team/team-first/team-first.component';
import { TeamSecondComponent } from './team/team-second/team-second.component';
import { TeamThirdComponent } from './team/team-third/team-third.component';

export const HOME_DECLARATIONS = [
    HomeComponent,
    IntroComponent,
    AboutComponent,
    TeamComponent,
    ServicesComponent,
    ContactComponent,
    ...CONTACT_MESSAGES_DECLARATIONS,
    TeamFirstComponent,
    TeamSecondComponent,
    TeamThirdComponent
];