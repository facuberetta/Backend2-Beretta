import TicketModel from "../models/ticket.model.js";
import { v4 as uuidv4 } from 'uuid';

export default class TicketsMongo {
  create = async (amount, purchaser) => {
    const code = uuidv4();
    const ticket = await TicketModel.create({ code, amount, purchaser });
    return ticket;
  }
}
