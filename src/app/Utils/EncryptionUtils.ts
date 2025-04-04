import { hash, compare } from 'bcrypt';

export class EncryptionUtils {
  static encryption(value: string): Promise<string> {
    return hash(value, 9);
  }
  static decryption(
    inputValue: string,
    encryptedValue: string,
  ): Promise<boolean> {
    return compare(inputValue, encryptedValue);
  }
}
