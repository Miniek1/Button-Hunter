var clicks = 0;
var totalclicks = 0;
var clickperclick = 1;
var shop = false;
var OneClickUpgrade = 0;
var OneClickPrice = 50;


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
    var clicks = getCookie("clicks");
    var clickperclick = getCookie("clickperclick");
    var OneClickUpgrade = getCookie("OneClickUpgrade");
    var OneClickPrice = getCookie("OneClickPrice");

    document.getElementById('buy-button').innerHTML = abbrNum(parseInt(OneClickPrice), 1);
}

if (totalclicks >= 50) {
    ShowTheGoods();
}

if (clicks != "0") { 
    document.getElementById('clicks').innerHTML = abbrNum(parseInt(clicks), 1);
}

// Absolutely stole this function from stackoverflow but i dont care anymore
function abbrNum(number, decPlaces) {
    // 2 decimal places => 100, 3 => 1000, etc
    decPlaces = Math.pow(10, decPlaces);

    // Enumerate number abbreviations
    var abbrev = ["k", "m", "b", "t", "q", "Q", "s", "S", "o", "n", "d", "u", "D", "T"];

    // Go through the array backwards, so we do the largest first
    for (var i = abbrev.length - 1; i >= 0; i--) {

        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10, (i + 1) * 3);

          // If the number is bigger or equal do the abbreviation
        if (size <= number) {
            // Here, we multiply by decPlaces, round, and then divide by decPlaces.
            // This gives us nice rounding to a particular decimal place.
            number = Math.round(number * decPlaces / size) / decPlaces;

            // Handle special case where we round up to the next abbreviation
            if ((number == 1000) && (i < abbrev.length - 1)) {
                number = 1;
                i++;
            }

            // Add the letter for the abbreviation
            number += abbrev[i];

            // We are done... stop
            break;
        }
    }

    return number;
}

function clicking() {
    clicks = parseInt(clicks) + parseInt(clickperclick);
    totalclicks++;
    document.getElementById('clicks').innerHTML = abbrNum(clicks, 1);

    setCookie("clicks", clicks, 999999)
    setCookie("totalclicks", totalclicks, 999999)

    if (totalclicks === 50) {
        ShowTheGoods();
    }
}

function ButtonEffects() {
    document.getElementById("button").style.transform = "scale(0.9)";
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
        shop = true;
    } else if (shop) {
        document.getElementById('shop-menu').style.transform = "translate(100%, 0)";
        document.getElementById('shop-menu').style.transition = "transition: transform 0.3s ease-out;";
        shop = false;
    }
}

function UpgradeFormula(basePrice, priceMultiplyer, level) {
    price = basePrice * Math.pow(level, (1 + priceMultiplyer));
    return price;
}

function BuyButtonEffect() {
    document.getElementById("buy-button").style.filter = "brightness(90%)"
    setTimeout(() => {
        document.getElementById("buy-button").style.filter = "brightness(100%)"
    }, 50);
}

function UpgradeOneClick() {
    if (clicks >= OneClickPrice) {

        parseInt(clickperclick++);
        parseInt(OneClickUpgrade++)
        setCookie("clickperclick", clickperclick, 999999);
        setCookie("clicks", clicks, 999999)

        clicks = clicks - OneClickPrice;
        document.getElementById('clicks').innerHTML = abbrNum(parseInt(clicks), 1);
        OneClickPrice = UpgradeFormula(50, 0.8, OneClickUpgrade)

        setCookie("OneClickUpgrade", parseInt(OneClickUpgrade), 999999)
        setCookie("OneClickPrice", OneClickPrice, 999999)
        document.getElementById('buy-button').innerHTML = abbrNum(parseInt(OneClickPrice), 1);
    }
}

function UpgradeClick(price) {
    console.log(price)

    BuyButtonEffect()    
}

document.getElementById("button").addEventListener('click', clicking);
document.getElementById("button").addEventListener('click', ButtonEffects);
document.getElementById("shop-button").addEventListener('click', ShopMenu);
document.getElementById("buy-button").addEventListener('click', BuyButtonEffect);
document.getElementById("buy-button").addEventListener('click', UpgradeOneClick);