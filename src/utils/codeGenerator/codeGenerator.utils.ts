import { customAlphabet } from 'nanoid';
import { Repository } from 'typeorm';

export abstract class CodeGenerator {
  public static async generateUniqueCode<T>(
    repository: Repository<any>,
    fieldName: keyof T,
  ): Promise<string> {
    const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 5);
    let code: string;
    let isUnique = false;

    do {
      code = nanoid();

      const existingEntity = await repository.findOne({
        where: { [fieldName]: code },
      });

      if (!existingEntity) {
        isUnique = true;
      }
    } while (!isUnique);

    return code;
  }
}
