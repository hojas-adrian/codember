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

  const getUsers = (text: string) => {
    const rows = text.split("\n");
    const format = (e: string) => {
      return e.split(",");
    };
    return rows.map(format);
  };

  const validateUser = (user: string[]) => {
    const charts = "abcdefghijklmnñopqrstuvwxyz1234567890";
    const [id, userName, email, age] = user;

    const validateAlphaNum = (text: string) => {
      const isAlfaNum = (chart: string) => charts.includes(chart.toLowerCase());
      return text.split("").every(isAlfaNum);
    };

    const validateEmail = (email: string) => {
      const [user, domain, ...other] = email.split("@");
      if (other.length !== 0 || !domain || !user) return false;
      const [server, dotCom] = domain.split(".");

      return server && dotCom === "com";
    };

    const validateAge = (age: string) => {
      if (!age) return true;
      const isNumber = parseInt(age);

      return !isNaN(isNumber);
    };

    return validateAlphaNum(id) &&
      validateAlphaNum(userName) &&
      validateEmail(email) &&
      validateAge(age);
  };

  const text = readFile(`./data/${fileName}`);
  const users = getUsers(text);
  const unvalidateUsers = users.filter((e) => !validateUser(e));

  const message = (output: string, user: string[]) => {
    return output += user[1].charAt(0);
  };

  return unvalidateUsers.reduce(message, "");
};

try {
  const answer = main("database_attacked.txt");
  console.log(answer);
} catch (error) {
  const errorMessage = errorMessages[error.name] || errorMessages.error;
  console.log(`%c⚠️ ${error.name}: ${errorMessage}`, "color:red");
}
