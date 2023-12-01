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
  const readFile = (path: `${string}.txt`) => {
    try {
      const buffer = Deno.readFileSync(path);
      const text = new TextDecoder().decode(buffer);

      return text;
    } catch (error) {
      throw new getTextError(error);
    }
  };

  const getFiles = (text: string) => {
    const fileRow = text.split("\n");

    return fileRow.map((e) => e.split("-"));
  };

  const validateKey = (value: string, key: string) => {
    const fileKey = value.split("")
      .filter((chart) => value.split(chart).length === 2)
      .join("");

    return fileKey === key;
  };

  const getValidFiles = (validFiles: string[], item: string[]) => {
    const [value, key] = item;
    const isValid = validateKey(value, key);

    return isValid ? [...validFiles, key] : [...validFiles];
  };

  const text = readFile(`./data/${fileName}`);
  const files = getFiles(text);
  const validFiles = files.reduce(getValidFiles, []);

  return validFiles;
};

try {
  const answer = main("files_quarantine.txt");
  console.log(answer[32]);
} catch (error) {
  const errorMessage = errorMessages[error.name] || errorMessages.error;
  console.log(`%c⚠️ ${error.name}: ${errorMessage}`, "color:red");
}
