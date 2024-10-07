import { IToken } from "../interfaces/token.interface";
import { Token } from "../models/token.model";

class TokenRepository {
  public async create(dto: Partial<IToken>): Promise<IToken> {
    return await Token.create(dto);
  }

  public async findByParams(params: Partial<IToken>): Promise<IToken | null> {
    return await Token.findOne(params);
  }

  public async deleteOneByParams(params: Partial<IToken>): Promise<void> {
    await Token.deleteOne(params);
  }

  public async deleteManyByParams(params: Partial<IToken>): Promise<void> {
    await Token.deleteMany(params);
  }

  public async deleteBeforeDate(date: Date): Promise<number> {
    const { deletedCount } = await Token.deleteMany({
      createdAt: { $lt: date },
    });
    return deletedCount;
  }

  public async getOldVisitors(date: Date): Promise<IToken[]> {
    return await Token.find({
      updatedAt: { $lt: date },
    });
  }
  public async getOldVisitorsBeforeSevenDays(date: Date): Promise<IToken[]> {
    return await Token.find({
      updatedAt: { $gt: date },
    });
  }
}

export const tokenRepository = new TokenRepository();
