#!/usr/bin/env node
import {getArgs} from './helpers/args.js';
import {printHelp, printSuccess, printError, printWeather} from "./services/log.service.js";
import {getKeyValue, saveKeyValue, TOKEN_DICTIONARY} from "./services/storage.service.js";
import {getWeather, getIcon} from "./services/api.service.js";

const saveToken = async (token) => {
    if (!token.length){
        printError('Token has not been passed');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Token is saved');
    } catch (e) {
        printError(e.message);
    }
}
const saveCity = async (city) => {
    if (!city.length){
        printError('City name has not been passed');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('City is saved');
    } catch (e) {
        printError(e.message);
    }
}

const getForecast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
        const weather = await getWeather(city);
        const icon = getIcon(weather.weather[0].icon);
        printWeather(weather, icon);
    } catch (e) {
        if (e?.response?.status === 404) {
            printError('The city does not exist');
        } else if (e?.response?.status === 401) {
            printError('Incorrect token');
        } else {
            printError(e.message);
        }
    }
};

const initCli = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        return printHelp();
    }
    if (args.s) {
        return saveCity(args.s);
    }
    if (args.t) {
        return saveToken(args.t);
    }
    return getForecast();
};

initCli();