import argon2 from "argon2";
/**
 * Configuración recomendada para Argon2id:
 * - memoryCost: 64MB (suficiente para seguridad sin afectar rendimiento)
 * - timeCost: 3 iteraciones (balance entre seguridad y velocidad)
 * - parallelism: 1 (Node.js es single-threaded)
 */

const argonConfig = {
  type: argon2.argon2id,
  memoryCost: 65536, // 64MB
  timeCost: 3, // 3 seconds
  parallelism: 1, // 1 thread
  hashLength: 32, // 32 bytes
};

export const hashPassword = async (passsword: string): Promise<string> => {
  return await argon2.hash(passsword, argonConfig);
};

export const verifyPassword = async (
  hashedPassword: string,
  candidatePassword: string,
): Promise<boolean> => {
  return await argon2.verify(hashedPassword, candidatePassword);
};
