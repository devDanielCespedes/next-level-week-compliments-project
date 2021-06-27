import { Repository, EntityRepository } from "typeorm";
import { Compliments } from "../entities/Compliment";

@EntityRepository(Compliments)
class ComplimentsRepositories extends Repository<Compliments> {
}

export { ComplimentsRepositories }