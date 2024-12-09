export const tasks = {
  addition: {
    range: { aMin: 1, aMax: 20, bMin: 1, bMax: 20 },
    question: (a, b) => `Найти сумму чисел ${a} и ${b}`,
    calculate: (a, b) => a + b,
  },
  multiplication: {
    range: { aMin: 1, aMax: 20, bMin: 1, bMax: 20 },
    question: (a, b) => `Найти произведение чисел ${a} и ${b}`,
    calculate: (a, b) => a * b,
  },
  modulus: {
    range: { aMin: 1, aMax: 20, bMin: 1, bMax: 20, nMin: 2, nMax: 30 },
    question: (a, b, n) => `Найти результат выражения (${a} + ${b}) % ${n}`,
    calculate: (a, b, n) => (a + b) % n,
  },
  publicKey: {
    range: { pMin: 2, pMax: 50, gMin: 2, gMax: 10, aMin: 1, aMax: 10 },
    question: (p, g, a) =>
      `Диффи-Хеллман: p = ${p}, g = ${g}, секретный ключ a = ${a}. 
        Вычислите публичный ключ A = g^a % p.`,
    calculate: (p, g, a) => Math.pow(g, a) % p,
  },
  encryptionCezar: {
    range: { charMin: 65, charMax: 90, shiftMin: 1, shiftMax: 10 },
    question: (charCode, shift) =>
      `Шифрование Цезаря: Символ "${String.fromCharCode(
        charCode
      )}" со сдвигом ${shift}. Какой получится символ?`,
    calculate: (charCode, shift) =>
      String.fromCharCode(((charCode - 65 + shift) % 26) + 65),
  },
  decryptionCezar: {
    range: { charMin: 65, charMax: 90, shiftMin: 1, shiftMax: 10 },
    question: (charCode, shift) =>
      `Дешифрование Цезаря: Символ "${String.fromCharCode(
        charCode
      )}" со сдвигом ${shift}. Какой был исходный символ?`,
    calculate: (charCode, shift) =>
      String.fromCharCode(((charCode - 65 - shift + 26) % 26) + 65),
  },
  vigenereCipher: {
    range: { textMin: 5, textMax: 10, keyMin: 3, keyMax: 5 },
    question: (text, key) =>
      `Шифрование текста "${text}" с помощью ключа "${key}" методом Виженера. Каков результат?`,
    calculate: (text, key) => {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const encrypt = (text, key) => {
        let encrypted = "";
        for (let i = 0; i < text.length; i++) {
          const textIndex = alphabet.indexOf(text[i].toUpperCase());
          const keyIndex = alphabet.indexOf(key[i % key.length].toUpperCase());
          encrypted += alphabet[(textIndex + keyIndex) % 26];
        }
        return encrypted;
      };
      return encrypt(text.toUpperCase(), key.toUpperCase());
    },
  },
};

