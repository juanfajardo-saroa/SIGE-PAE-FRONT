import { Routes } from '@angular/router';

import { TicketlistComponent } from './ticketlist/ticketlist.component';





export const AppsRoutes: Routes = [
    {
        path: '',
        children: [


            {
                path: 'ticketlist',
                component: TicketlistComponent,
                data: {
                    title: 'Ticket List',
                    urls: [
                        { title: 'Dashboard', url: '/dashboard' },
                        { title: 'Ticket List' }
                    ]
                }
            },



        ]
    }
];
