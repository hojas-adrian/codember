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
      const text = new TextDecoder().decode(buffer).toLowerCase();

      return text;
    } catch (error) {
      throw new getTextError(error);
    }
  };

  const parseText = (tableRow: string) => {
    const [range, rawChart, password] = tableRow.split(" ");

    const [rawMinValue, rawMaxValue] = range.split("-");
    const minValue = parseInt(rawMinValue);
    const maxValue = parseInt(rawMaxValue);

    const chart = rawChart.charAt(0);

    return { minValue, maxValue, chart, password };
  };

  const groupByVulnerability = ({ corrects, wrongs }: {
    corrects: string[];
    wrongs: string[];
  }, { minValue, maxValue, chart, password }: {
    minValue: number;
    maxValue: number;
    chart: string;
    password: string;
  }) => {
    const chartCount = password.split(chart).length - 1;
    const isCorrect = chartCount >= minValue && chartCount <= maxValue;
    return {
      corrects: isCorrect ? [...corrects, password] : [...corrects],
      wrongs: isCorrect ? [...wrongs] : [...wrongs, password],
    };
  };

  const text = readFile(`./data/${fileName}`);
  const tableRows = text.split("\n");
  const tableInfo = tableRows.map(parseText);
  const infoSorted = tableInfo.reduce(groupByVulnerability, {
    corrects: [],
    wrongs: [],
  });

  return infoSorted;
};

try {
  const answer = main("encryption_policies.txt");
  console.log(answer.corrects.length, answer.wrongs[42]);
} catch (error) {
  const errorMessage = errorMessages[error.name] || errorMessages.error;
  console.log(`%c⚠️ ${error.name}: ${errorMessage}`, "color:red");
}
