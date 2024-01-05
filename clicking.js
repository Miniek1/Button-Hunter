var clicks = 0;
var totalclicks = 0;
var clickperclick = 1;
var ui = false;
var shop = false;
var OneClickPrice = "50";

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
    var ui = getCookie("ui");
    var clicks = getCookie("clicks");
    var clickperclick = getCookie("clickperclick");
    var OneClickPrice = getCookie("OneClickPrice");
}

if (ui === "true") {
    ShowTheGoods();
    console.log("Showing the UI...");
}

if (clicks != "0") { 
    document.getElementById('clicks').innerHTML = parseInt(clicks);
}

if (OneClickPrice != 50) {
    document.getElementById('buy-button').innerHTML = parseInt(OneClickPrice);
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

function ButtonEffects() {
    document.getElementById("button").style.transform = "scale(0.9)";
    console.log("Changed Scale.");
    setTimeout(() => {
        document.getElementById("button").style.transform = "scale(1.0)";
    }, 50);
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

function BuyButtonEffect() {
    document.getElementById("buy-button").style.filter = "brightness(90%)"
    setTimeout(() => {
        document.getElementById("buy-button").style.filter = "brightness(100%)"
    }, 50);
}

function OneClickUpgrade() {
    if (clicks >= OneClickPrice) {
        parseInt(clickperclick++);
        setCookie("clickperclick", clickperclick, 999999);
        setCookie("clicks", clicks, 999999)

        clicks = clicks - OneClickPrice;
        document.getElementById('clicks').innerHTML = parseInt(clicks);
        OneClickPrice = OneClickPrice * 1.5;
        setCookie("OneClickPrice", parseInt(OneClickPrice), 999999)
        document.getElementById('buy-button').innerHTML = parseInt(OneClickPrice);
    }
}

document.getElementById("button").addEventListener('click', clicking);
document.getElementById("button").addEventListener('click', ButtonEffects);
document.getElementById("shop-button").addEventListener('click', ShopMenu);
document.getElementById("buy-button").addEventListener('click', BuyButtonEffect);
document.getElementById("buy-button").addEventListener('click', OneClickUpgrade);