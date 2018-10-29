document.addEventListener("DOMContentLoaded", function (event) {
    initLand();
});

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const state = {
    overview: {
        mieteinnahmen: 0,
        einwohner: 0,
    },
    land: [
        {id: 0, typ: 'cafe', einwohner: 0, mieteinnahme: 0},
        {id: 1, typ: 'brauerei', einwohner: 0, mieteinnahme: 0}
    ]
};

const getMieteinnahmen = () => {
    return $('#mieteinnahmenCounter');
};

const getEinwohner = () => {
    return $('#einwohnerCounter');
};

const updateMieteinnahmen = () => {
    getMieteinnahmen().innerHTML = `${state.overview.mieteinnahmen}$`;
};

const updateEinwohner = () => {
    const anzahl = state.land.map(item => +item.einwohner);
    const add = (a, b) => a + b;
    state.overview.einwohner = anzahl.reduce(add);
    getEinwohner().innerHTML = `${state.overview.einwohner}`;
};


const initLand = () => {
    updateMieteinnahmen();
    updateEinwohner();

    for (const item of $('#land').children) {
        const dataId = item.dataset.id;
        const landInState = state.land.find(landItem => landItem.id === +dataId);
        console.log(dataId, landInState);
    }
};
