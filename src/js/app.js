document.addEventListener("DOMContentLoaded", function (event) {
    initLand();
});

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const state = {
    overview: {
        umsatz: 0,
        herstellung: 0,
        lager: {
            aktuellerStand: 0,
            maximalerStand: 0
        }
    },
    land: [
        {id: 5, level: 1, typ: 'brauerei'},
        {id: 11, level: 1, typ: 'lager'}
    ]

};

const getLager = () => {
    return $('#lagerCounter');
};

const getHerstellung = () => {
    return $('#herstellung');
};

const getUmsatz = () => {
    return $('#umsatz');
};

const updateBeer = () => {
    updateLagerbestand(getAmountInLager() + 1);
    initLand();
};

const getAmountInLager = () => {
    return state.overview.lager.aktuellerStand;
};

const updateLagerbestand = (newValue) => {
    let lager = state.overview.lager;
    if (lager.maximalerStand < newValue) {
        return;
    }
    lager.aktuellerStand = newValue;
    getLager().innerHTML = `${lager.aktuellerStand}/${lager.maximalerStand}`;
};

const initLand = () => {
    updateMaxLagerBestand();
    updateLagerbestand(state.overview.lager.aktuellerStand);

    for (const item of $('#land').children) {
        const dataId = item.dataset.id;
        const landInState = state.land.find(landItem => landItem.id === +dataId);
        console.log(dataId, landInState);
        if (landInState) {
            item.innerHTML = 'Element Objekt';
        }
    }
};

const updateMaxLagerBestand = () => {
    state.overview.lager.maximalerStand = state.land
        .filter(item => item.typ === 'lager')
        .map(item => getAmountForLevel(item))
        .reduce((acc, cur) => acc + cur);
};

const getAmountForLevel = (item) => scores[item.typ][item.level];

