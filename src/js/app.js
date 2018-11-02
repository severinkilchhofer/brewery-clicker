document.addEventListener("DOMContentLoaded", function (event) {
    initLand();
});

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const state = {
    interval: {
        currentInterval: false,
    },
    overview: {
        mieteinnahmen: 0,
        geld: 0,
        einwohner: 0,
    },
    land: [
        {id: 0, typ: 'cafe', einwohner: 0, miete: 0, kosten: 0},
        {id: 1, typ: 'brauerei', einwohner: 0, miete: 0, kosten: 0}
    ]
};

const getMieteinnahmen = () => {
    return $('#mieteinnahmenCounter');
};

const getEinwohner = () => {
    return $('#einwohnerCounter');
};

const updateGesamtesGeld = () => {
    if (!state.interval.currentInterval) {
        setInterval(function () {
            let geld = state.overview.geld;
            geld += state.overview.mieteinnahmen;
            state.overview.geld = geld;
            state.interval.currentInterval = true;
            updateGebaudeCards();
            getMieteinnahmen().innerHTML = `${geld}$`;
        }, 1000);
        // }, 5000);
    }
};

const updateMonatsmiete = () => {
    const geld = state.land.map(item => +item.miete);
    const add = (a, b) => a + b;
    state.overview.mieteinnahmen = geld.reduce(add);

    updateGesamtesGeld();
};

const updateEinwohner = () => {
    const anzahl = state.land.map(item => +item.einwohner);
    const add = (a, b) => a + b;
    state.overview.einwohner = anzahl.reduce(add);
    getEinwohner().innerHTML = `${state.overview.einwohner}`;
};

const updateGebaudeCards = () => {
    for (const item of $('#gebaudeSammlung').children) {
        const gebaudeKosten = +item.dataset.preis;

        if (state.overview.geld < gebaudeKosten) {
            item.classList.add('disabled')
        } else {
            item.classList.remove('disabled')
        }
    }
};

const initLand = () => {
    updateEinwohner();
    updateMonatsmiete();
    updateGebaudeCards();
};
