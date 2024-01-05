var clicks = 0;
var totalclicks = 0;
var clickperclick = 1;
var ui = false;
var shop = false;

// Don't touch this, it somehow works
function setCookie(cname,cvalue,exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Lax";
}
// Don't touch this, it somehow works
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

var totalclicks = getCookie("totalclicks")
if (totalclicks > 0) {
    var ui = getCookie("ui")
    var clicks = getCookie("clicks")
}

if (ui === "true") {
    ShowTheGoods();
    console.log("Showing the UI...");
}

if (clicks != "0") { 
    document.getElementById('clicks').innerHTML = parseInt(clicks);
}
function clicking() {
    clicks = parseInt(clicks) + parseInt(clickperclick);
    totalclicks++;
    document.getElementById('clicks').innerHTML = clicks;

    setCookie("clicks", clicks, 999999)
    setCookie("totalclicks", totalclicks, 999999)

    if (totalclicks === 50) {
        setCookie("ui", true, 999999)
        ShowTheGoods();
        console.log("Showing the UI...");
    }
}

function ShowTheGoods() {
    document.getElementById('shop-button').style.transform = "translate(0, 0)";
    document.getElementById('hamburger-button').style.transform = "translate(0, 0)";
    document.getElementById('checkbox1').style.transform = "translate(0, 0)";
    document.getElementById('checkbox2').style.transform = "translate(0, 0)";
}

function HamburgerMenu() {

}

function ShopMenu() {
    if (shop === false) {
        document.getElementById('shop-menu').style.transform = "translate(0, 0)";
        document.getElementById('shop-menu').style.transition = "transition: transform 0.3s ease-in;";
        console.log("Showing the shop");
        shop = true;
    } else if (shop) {
        document.getElementById('shop-menu').style.transform = "translate(100%, 0)";
        document.getElementById('shop-menu').style.transition = "transition: transform 0.3s ease-out;";
        shop = false;
    }
}

document.getElementById("button").addEventListener('click', clicking);
document.getElementById("shop-button").addEventListener('click', ShopMenu);