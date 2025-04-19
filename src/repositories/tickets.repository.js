import TicketsMongo from "../dao/mongo/tickets.mongo.js";

const dao = new TicketsMongo();

export default class TicketsRepository {
  create = (amount, purchaser) => dao.create(amount, purchaser);
}
