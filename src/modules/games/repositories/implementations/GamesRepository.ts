import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const findByTitleContaining = this.repository.
    createQueryBuilder('games')
    .where(`title ILIKE '%${param}%'`)
    .getMany();


    return findByTitleContaining;
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const countallgames = this.repository.query('SELECT COUNT(*) FROM games');

    return countallgames;
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const findUsersByGameId = this.repository.
    createQueryBuilder().
    relation(Game, "users")
    .of(id)
    .loadMany()


    return findUsersByGameId;
  }
}
