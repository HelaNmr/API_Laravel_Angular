import { Ticket } from './ticket.model';

export class Tickets {
    success: boolean;
    data: Ticket[];
    message: string;

    constructor(success: boolean, data: Ticket[], message: string) {
        this.success = success;
        this.data = data;
        this.message = message;
    }
}