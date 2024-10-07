import { IOldPassword } from "../interfaces/old-password.interface";
import { OldPassword } from "../models/old-password.model";

class OldPasswordRepository {
  public async create(dto: Partial<IOldPassword>): Promise<IOldPassword> {
    return await OldPassword.create(dto);
  }

  public async deleteBeforeDate(date: Date): Promise<number> {
    const { deletedCount } = await OldPassword.deleteMany({
      createdAt: { $lt: date },
    });
    return deletedCount;
  }

  public async findByParams(
    params: Partial<IOldPassword>,
  ): Promise<IOldPassword[] | null> {
    return await OldPassword.find(params).select("+oldPassword");
  }
}

export const oldPasswordRepository = new OldPasswordRepository();
