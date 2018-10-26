document.addEventListener("DOMContentLoaded", function (event) {
    initLand();
});

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const state = {
    overview: {
        umsatz: 0,
        herstellung: {
            aktuelleHerstellung: 0,
            maximaleHerstellung: 0
        },
        lager: {
            aktuellesLager: 0,
            maximalesLager: 0
        }
    },
    land: [
        {id: 0, level: 0, typ: 'brauerei'},
        {id: 1, level: 0, typ: 'lager'}
    ]

};

const getLager = () => {
    return $('#lagerCounter');
};

const getHerstellung = () => {
    return $('#herstellungCounter');
};

const getUmsatz = () => {
    return $('#umsatzCounter');
};

const updateBeer = () => {
    updateLagerbestand(getAmountInLager() + 1);
};

const getAmountInLager = () => {
    return state.overview.lager.aktuellesLager;
};

const getAmountInHerstellung = () => {
    return state.overview.herstellung.aktuelleHerstellung;
};

const setHerstellungInGange = () => {
    // if (state.overview.herstellung.maximaleHerstellung === 1) {
        setInterval(() => {
            updateHerstellung(getAmountInHerstellung() + 1);
        }, 1000);
    // }
};

const updateLagerbestand = (newValue) => {
    let lager = state.overview.lager;
    if (lager.maximalesLager < newValue) {
        return;
    }
    lager.aktuellesLager = newValue;
    getLager().innerHTML = `${lager.aktuellesLager}/${lager.maximalesLager}`;
};

const updateHerstellung = (newValue) => {
    let herstellung = state.overview.herstellung;
    if (herstellung.maximaleHerstellung < newValue) {
        return;
    }
    herstellung.aktuelleHerstellung = newValue;
    getHerstellung().innerHTML = `${herstellung.aktuelleHerstellung}<br>${herstellung.maximaleHerstellung}/sec`;
};

const updateUmsatz = (newValue) => {
    let umsatz = state.overview.umsatz;
    if (umsatz < newValue) {
        return;
    }
    umsatz = newValue;
    getUmsatz().innerHTML = `${umsatz}`;
};

const initLand = () => {
    updateMaxLagerBestand();
    updateHerstellungInSec();
    updateLagerbestand(state.overview.lager.aktuellesLager);
    updateHerstellung(state.overview.herstellung.aktuelleHerstellung);

    for (const item of $('#land').children) {
        const dataId = item.dataset.id;
        const landInState = state.land.find(landItem => landItem.id === +dataId);
        console.log(dataId, landInState);
    }
};

const updateMaxLagerBestand = () => {
    state.overview.lager.maximalesLager = state.land
        .filter(item => item.typ === 'lager')
        .map(item => getAmountForLevel(item))
        .reduce((acc, cur) => acc + cur);
};

const updateHerstellungInSec = () => {
    state.overview.herstellung.maximaleHerstellung = state.land
        .filter(item => item.typ === 'brauerei')
        .map(item => getAmountForLevel(item))
        .reduce((acc, cur) => acc + cur);
};

const getAmountForLevel = (item) => scores[item.typ][item.level];