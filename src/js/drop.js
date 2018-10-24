class App {

    static init(ids) {

        App.boxes = ids.map(id => document.querySelector(id));


        App.boxes.forEach(box => box.addEventListener("dragstart", App.dragstart));
        App.boxes.forEach(box => box.addEventListener("dragend", App.dragend));

        const containers = document.getElementsByClassName('holder');

        for (const container of containers) {
            container.addEventListener("dragover", App.dragover);
            container.addEventListener("dragenter", App.dragenter);
            container.addEventListener("dragleave", App.dragleave);
            container.addEventListener("drop", App.drop)
        }
    }

    static dragstart() {
        this.className += " held";
        App.currentBox = App.boxes.find(box => box.id === this.id);
        setTimeout(() => this.className = "invisible", 0);
        const currentElement = state.land.findIndex(entry => entry.id == this.parentElement.dataset.id);
        if (currentElement > -1) {
            state.land.splice(currentElement, 1);
        }
    }

    static dragend() {
        this.className = "box";
        console.log($('#land').children);
        console.log('App.currentBox: ', App.currentBox);
    }

    static dragover(e) {
        e.preventDefault()
    }

    static dragenter(e) {
        e.preventDefault();
        this.className += " hovered"
    }

    static dragleave() {
        this.className += "holder"
    }

    static drop() {
        this.className += "holder";
        this.append(App.currentBox);

        state.land.push({id: +this.dataset.id, level: +App.currentBox.dataset.level, typ: App.currentBox.dataset.typ});


        updateMaxLagerBestand();
        updateLagerbestand(state.overview.lager.aktuellesLager);
        updateHerstellungInSec();
        updateHerstellung(state.overview.herstellung.aktuelleHerstellung);
        setHerstellungInGange();
    }

}

document.addEventListener("DOMContentLoaded", () => App.init(['#shop', '#lager', '#brauerei']));
