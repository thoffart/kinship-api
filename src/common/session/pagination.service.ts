import { Inject } from "@nestjs/common";
import { SessionManager } from "./session.manager";

export class PaginationService {
  constructor(@Inject('SessionManager') private readonly session: SessionManager) { }

  
}