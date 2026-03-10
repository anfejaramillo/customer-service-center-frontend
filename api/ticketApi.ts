import { Ticket } from "@/components/layout/types";
import api from "@/scripts/httpClient";

export async function getAllTickets(): Promise<Array<Ticket>> {
    try {
        let result = new Array<Ticket>();
        result = (await api().get("v1/tickets")).data;
        return result;
    } catch (error) {
        return [];
    }
}

export async function createTicket(ticket: Ticket): Promise<Ticket> {
    try {
        let result = (await api().post("v1/tickets", ticket)).data;
        return result;
    } catch (error) {
        ticket.id = -1
        return ticket;
    }

}

export async function updateTicket(ticket: Ticket): Promise<Ticket> {
    try {
        let result = (await api().put("v1/tickets/" + ticket.id, ticket)).data;
        return result;
    } catch (error) {
        ticket.id = -1
        return ticket;
    }
}



