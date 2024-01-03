var clicks = 0;
const start = 50;

function clicking() {
    clicks++;
    document.getElementById('clicks').innerHTML = clicks;

    if (clicks === start) {
        ShowTheGoods();
        console.log("Showing the UI...")
    };
};

function ShowTheGoods() {
    document.getElementById('shop').style.transform = "translate(0, 0)";
    document.getElementById('hamburger').style.transform = "translate(0, 0)";
    document.getElementById('checkbox1').style.transform = "translate(0, 0)";
    document.getElementById('checkbox2').style.transform = "translate(0, 0)";
};