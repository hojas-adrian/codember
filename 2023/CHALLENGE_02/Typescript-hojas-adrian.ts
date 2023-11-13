class getTextError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "getTextError";
  }
}

class unexpectedInput extends Error {
  constructor(message: string) {
    super(message);
    this.name = "unexpectedInput";
  }
}

const errorMessages: { [key: string]: string } = {
  getTextError: "Fallo al encontrar el archivo",
  unexpectedInput: "El formato del código es incorrecto",
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

  const compile = (text: string) => {
    const instructions = text.split("");

    const processInstruction = (
      { output, i }: { output: string; i: number },
      instruction: string,
    ) => {
      const instructionHandlers = {
        "#": (i: number) => ++i,
        "@": (i: number) => --i,
        "*": (i: number) => i ** 2,
        "&": (i: number) => i,
      };

      function isValidInstruction(
        instruction: string,
      ): instruction is "@" | "#" | "*" | "&" {
        return instructionHandlers[instruction as "@" | "#" | "*" | "&"] !==
          undefined;
      }
      if (isValidInstruction(instruction)) {
        if (instruction === "&") output = output + i;
        return { output: output, i: instructionHandlers[instruction](i) };
      }

      throw new unexpectedInput(
        `El caracter que intenta procesar "${instruction}" no es valido`,
      );
    };
    return instructions.reduce(processInstruction, { output: "", i: 0 });
  };

  const text = getText(`./data/${fileName}`);
  const result = compile(text);

  return result.output;
};

try {
  const answer = main("message_02.txt");
  console.log(answer);
} catch (error) {
  const errorMessage = errorMessages[error.name] || errorMessages.error;
  console.log(`%c⚠️ ${error.name}: ${errorMessage}`, "color:red");
}
