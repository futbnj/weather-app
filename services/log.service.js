import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
    console.log(chalk.bgRedBright(' ERROR ') + ' ' + error);
};

const printSuccess = (message) => {
    console.log(chalk.bgGreenBright(' SUCCESS ' + ' ' + message));
};

const printHelp = () => {
  console.log(
      dedent`${chalk.bgYellowBright(' HELP ')}
      Без параметров - вывод погоды
      -s [CITY] для установки города
      -h для вывода помощи
      -t [API_KEY] для сохранения токена
      `
  );
};

const tempBeautifier = (temp) => {
    return Number.parseFloat( parseFloat(temp) - 273.15).toFixed(2);
};

const printWeather = (response, icon) => {
    console.log(
      dedent`${chalk.bgMagentaBright(' CURRENT WEATHER IN ')} ${response.name}
      ${icon} ${response.weather[0].description}
      Temperature: ${tempBeautifier(response.main.temp)} (feels like ${tempBeautifier(response.main.feels_like)})
      Humidity: ${response.main.humidity}%
      Wind speed: ${response.wind.speed}
      `
    );
};

export {printSuccess, printError, printHelp, printWeather};