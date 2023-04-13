#!usr/bin/env node

import {getArgs} from './helpers/args.js'
import {printError, printHelp, printSuccess, renderWeather} from "./services/log.service.js";
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getWeather} from './services/api.service.js'

const saveToken = async (token) => {
    if (!token.length) {
        printError('Не передан токен')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Токен сохранен')

    } catch (e) {
        printError(e.message)
    }
}

const saveCity = async (city) => {
    try {
        const tokenExist = await getKeyValue(TOKEN_DICTIONARY.token)
        if(!tokenExist) throw new Error('Не задан ключ API,задайте его через команду -t [API_KEY]')
        const isExist = await getForcast(city)
        if(isExist) {
            await saveKeyValue(TOKEN_DICTIONARY.city, city)
            printSuccess('Город сохранен')
        }
    } catch(e) {
        printError(e.message)
    }
}


const getForcast = async (city) => {
    try {
        const res = process.env.CITY ?? city ?? await getKeyValue(TOKEN_DICTIONARY.city)
        if(!res) {
            printError('Город не задан')
            return
        }
        return await getWeather(res)
    } catch(e) {
        if(e?.response?.status === 404) {
            printError('Неверно указан город')
        } else if(e?.response?.status === 401) {
            printError('Неверно указан токен')
        } else {
            printError(e.message)
        }
    }
}

const initCLI = async () => {

    const args = getArgs(process.argv)

    if (args.h) {
        printHelp()
        return
    }

    if (args.t) {
        saveToken(args.t)
    }

    if (args.s) {
        saveCity(args.s)
    }

    if(!Object.keys(args).length) {
        const data = await getForcast()
        data && renderWeather(data)
    }

}



initCLI()