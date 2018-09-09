document.addEventListener("DOMContentLoaded", function (event) {
    // Your code to run since DOM is loaded and ready

    initLand();
});

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const state = {
    overview: {
        umsatz: 0,
        herstellung: 0,
        lager: {
            aktuellerStand: 95,
            maximalerStand: 0
        }
    },
    land: [
        {id: 5, level: 1, typ: 'brauerei'},
        {id: 6, level: 1, typ: 'lager'}
    ]

};

const getLager = () => {
    return $('#lager');
};

const getHerstellung = () => {
    return $('#herstellung');
};

const getUmsatz = () => {
    return $('#umsatz');
};

// const initOverview = () => {
//     updateLagerbestand(0);
//     getHerstellung().innerHTML = state.overview.herstellung;
//     getUmsatz().innerHTML = state.overview.umsatz;
// };

const updateBeer = () => {
    updateLagerbestand(getAmountInLager() + 1);
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
      if(landInState) {
          item.innerHTML = 'DA IST WAS';
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

