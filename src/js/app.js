document.addEventListener("DOMContentLoaded", function (event) {
    initLand();
    modalAnfang.style.display = "block";
});

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const state = {
    interval: {
        currentInterval: false,
        counterInterval: false,
    },
    overview: {
        mieteinnahmen: 0,
        geld: 0,
        einwohner: 0,
    },
    land: [
        {id: 0, typ: 'cafe', einwohner: 0, miete: 0, kosten: 0}
    ],
    gamePlay: {
        gebaudeAufLand: 0,
        finished: false,
    }

};

const getMieteinnahmen = () => {
    return $('#mieteinnahmenCounter');
};

const getEinwohner = () => {
    return $('#einwohnerCounter');
};

const updateKostenAbzug = () => {
    const lastAddedGebaude = state.land.map(item => +item.kosten);
    const kostenLastAdded = lastAddedGebaude.pop();

    let geld = state.overview.geld;
    geld -= kostenLastAdded;
    state.overview.geld = geld;
    getMieteinnahmen().innerHTML = `${geld}$`;
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
            if (!state.interval.counterInterval) {
                monthCountup();
                state.interval.counterInterval = true;
            }
        }, 3000);
        // }, 5000);
    }
};

const updateMonatsmiete = () => {
    updateKostenAbzug();
    const geld = state.land.map(item => +item.miete);
    const add = (a, b) => a + b;
    state.overview.mieteinnahmen = geld.reduce(add);
    updateGesamtesGeld();
};

const updateEinwohner = () => {
    const anzahl = state.land.map(item => +item.einwohner);
    const add = (a, b) => a + b;
    state.overview.einwohner = anzahl.reduce(add);
    getEinwohner().innerHTML = `${state.overview.einwohner} / 10'000`;
    checkIsFinished();
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

const checkIsFinished = () => {
    state.gamePlay.gebaudeAufLand = state.land.length;
    if (state.gamePlay.gebaudeAufLand === 17) {
        state.gamePlay.finished = true;
        stopwatch.stop();
        stopwatch2.stop();
        modalEnde.style.display = "block";
    } else if (state.overview.einwohner > 10000) {
        state.gamePlay.finished = true;
        stopwatch.stop();
        stopwatch2.stop();
        modalEnde.style.display = "block";
    }
};

const initLand = () => {
    updateEinwohner();
    // updateMonatsmiete();
    updateGebaudeCards();
};

const displayNone = (selectedId) => {
    for (const item of $('#gebaudeSammlung').children) {

        const element = +item.dataset.id;

        if (selectedId === element) {
            item.classList.add('displayNone');
        }
    }
};

const startGame = () => {
    modalAnfang.style.display = "none";
    stopwatch.start();
    stopwatch2.start();
};
