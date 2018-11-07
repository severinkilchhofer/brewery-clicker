let counter = 0;
let year = 2018;
const monthCountup = () => {
    setInterval(function () {
        counter++;
        document.getElementById('month').innerHTML = counter + '.';
        if (counter > 12) {
            counter = 1;
            year++;
            document.getElementById('year').innerHTML = year;
            document.getElementById('month').innerHTML = counter + '.';
        }
    }, 5000);
};
