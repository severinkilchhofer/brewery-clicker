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
        setTimeout(() => this.className = "invisible", 0)
    }

    static dragend() {
        this.className = "box";
        console.log($('#land').children);
        console.log('state.land.id: ', state.land.id);

    }

    static dragover(e) {
        e.preventDefault()
    }

    static dragenter(e) {
        e.preventDefault();
        this.className += " hovered"
    }

    static dragleave() {
        this.className = "holder"
    }

    static drop() {
        this.className = "holder";
        this.append(App.currentBox)
    }

}

document.addEventListener("DOMContentLoaded", () => App.init(['#shop1', '#lager1', '#brewery1']));
