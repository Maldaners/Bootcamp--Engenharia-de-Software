import * as bcrypt from 'bcrypt';

export class EncryptUtils {

    private readonly saltOrRounds = 10;

    public async getEncryptedValue(value: string): Promise<string> {
        return await bcrypt.hash(value, this.saltOrRounds);
    }

    public async compareValues(valueDecrypted: string, valueEncripted: string): Promise<boolean> {
        return await bcrypt.compare(valueDecrypted, valueEncripted)
    }
}