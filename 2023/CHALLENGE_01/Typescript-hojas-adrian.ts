class getTextError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "getTextError";
  }
}

const errorMessages: { [key: string]: string } = {
  getTextError: "Fallo al encontrar el archivo",
  error: "Error desconocido",
};

const main = (fileName: `${string}.txt`) => {
  const getText = (path: string) => {
    try {
      const buffer = Deno.readFileSync(path);
      const text = new TextDecoder().decode(buffer).toLowerCase();

      return text;
    } catch (error) {
      throw new getTextError(error);
    }
  };

  const countwords = (text: string) => {
    const words = text.split(" ");
    const wordsCounted: { [key: string]: number } = {};

    words.forEach((word) => {
      wordsCounted[word] = (wordsCounted[word] || 0) + 1;
    });

    return wordsCounted;
  };

  const text = getText(`./data/${fileName}`);
  const wordsCounted = countwords(text);
  const wordsData = Object.entries(wordsCounted);
  const output = wordsData.map((wordData) => wordData.join(""))
    .join("");

  return output;
};

try {
  const answer = main("message_01.txt");
  console.log(answer);
} catch (error) {
  const errorMessage = errorMessages[error.name] || errorMessages.error;
  console.log(`%c⚠️ ${error.name}: ${errorMessage}`, "color:red");
}
