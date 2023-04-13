import chalk from 'chalk'
import dedent from 'dedent-js'

const printError = (error) => {
    console.log(chalk.bgRed('ERROR') + ' ' + error)
}

const printSuccess = (text) => {
    console.log(chalk.bgGreenBright('SUSSESS') + ' ' + text)
}

const printHelp = () => {
    console.log(
        dedent`
        ${chalk.bgCyan(`HELP`)}
        Без параметров - вывод погоды 
        -s [CITY] для установки погоды
        -h для вывода помощи
        -t [API_KEY] для сохранения токена 
        `
    )
}

const renderWeather = (data) => {
    console.log(chalk.bgMagenta('Сводка погоды на сегодня'))
    console.log(dedent`
        температура: ${data?.main?.temp}
        ощущается как: ${data?.main?.feels_like}
        скорость ветра: ${data?.wind?.speed}
    `)
}

export {printError, printHelp, printSuccess, renderWeather}