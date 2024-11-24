import { customAlphabet } from 'nanoid';
import { Repository } from 'typeorm';

export abstract class CodeGenerator {
  public static async generateUniqueCode(repository: Repository<any>): Promise<string> {
    const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 5);
    let code: string;
    let isUnique = false;

    do {
      code = nanoid();

      const existingEntity = await repository.findOne({
        where: { CodCiudad: code },
      });

      if (!existingEntity) {
        isUnique = true;
      }
    } while (!isUnique);

    return code;
  }
}
