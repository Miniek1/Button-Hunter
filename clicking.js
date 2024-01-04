var clicks = 0;
var totalclicks = 0;
var ui = "false";

function setCookie(cname,cvalue,exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var ui = getCookie("ui")
var clicks = getCookie("clicks")

if (ui === "true") {
    ShowTheGoods();
    console.log("Showing the UI...");
};

if (clicks != 0) { 
    document.getElementById('clicks').innerHTML = clicks;
}
function clicking() {
    clicks++;
    totalclicks++
    document.getElementById('clicks').innerHTML = clicks;

    setCookie("clicks", clicks, 999999)

    if (totalclicks === 50) {
        setCookie("ui", true, 999999)
        ShowTheGoods();
        console.log("Showing the UI...");
    };
};

function ShowTheGoods() {
    document.getElementById('shop').style.transform = "translate(0, 0)";
    document.getElementById('hamburger').style.transform = "translate(0, 0)";
    document.getElementById('checkbox1').style.transform = "translate(0, 0)";
    document.getElementById('checkbox2').style.transform = "translate(0, 0)";
};

function Hamburger() {

}