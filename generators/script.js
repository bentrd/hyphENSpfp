const randomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const isXY = () => window.location.href.includes('x-y.html');
const isXYZ = () => window.location.href.includes('x-y-z.html');
const isXXX = () => window.location.href.includes('xxx.html');
const isXXXX = () => window.location.href.includes('xxxx.html');
const isXXXXX = () => window.location.href.includes('xxxxx.html');

const urlString = window.location.href;
const url = new URL(urlString);
tailed = ['y', 'g', 'j', 'q'];
hyphens = '-';
var params = { 'c1': 'a', 'c2': 'b', 'c3': 'c', 'c4': 'd', 'c5': 'e', 'g1': randomColor(), 'g2': randomColor(), 'tc': randomColor(), 'dh': 'false' };

if (!isXXXXX()) delete params.c5;
if (!isXXXX()) delete params.c4;
if (!isXXX() && !isXYZ()) delete params.c3;
if (!isXY()) delete params.dh;

for (let param of url.searchParams.entries()) {
    params[param[0]] = param[1];
}

var canvas = document.createElement("canvas");
canvas.style.boxShadow = "0px 0px 20px #00000088";
var ctx = canvas.getContext("2d");
var scale = 2;
canvas.width = 400 * scale;
canvas.height = 400 * scale;

const updateURL = () => {
    for (let param in params) {
        url.searchParams.set(param, params[param]);
        if (param != 'dh')
            params[param] = domInputs[param].value;
    }
    window.history.replaceState({}, '', url.toString());
}

const updateCanvas = () => {
    let offset = 0;
    if (isXXXXX()) {
        fontSize = 100;
    } else if (isXXXX()) {
        fontSize = 120;
    } else if (isXXX()) {
        fontSize = 130;
    } else if (isXYZ()) {
        if (tailed.includes(params.c3)) offset = canvas.height * 0.05;
        fontSize = 120;
    } else {
        if (tailed.includes(params.c2))
            offset = canvas.height * 0.05;
        fontSize = 135;
    }
    fontSize *= scale;
    var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#' + params.g1);
    gradient.addColorStop(1, '#' + params.g2);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + "px HN";
    ctx.fillStyle = '#' + params.tc;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    if (isXXXXX())
        ctx.fillText(params.c1 + params.c2 + params.c3 + params.c4 + params.c5, canvas.width / 2, canvas.height * 3 / 8);
    else if (isXXXX())
        ctx.fillText(params.c1 + params.c2 + params.c3 + params.c4, canvas.width / 2, canvas.height * 3 / 8);
    else if (isXXX())
        ctx.fillText(params.c1 + params.c2 + params.c3, canvas.width / 2, canvas.height * 3 / 8);
    else if (isXYZ())
        ctx.fillText(params.c1 + hyphens + params.c2 + hyphens + params.c3, canvas.width / 2, canvas.height * 3 / 8);
    else ctx.fillText(params.c1 + hyphens + params.c2, canvas.width / 2, canvas.height * 3 / 8);
    ctx.fillStyle = '#' + params.tc + '66';
    ctx.font = 46 * scale + "px HN";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.fillText('.eth', canvas.width * 320 / 400, canvas.height * 255 / 400 + offset);
    updateURL();
}

const doubleHyphens = () => {
    if (params.dh == 'false') {
        params.dh = 'true';
        hyphens = '--';
    } else {
        params.dh = 'false';
        hyphens = '-';
    }
    updateCanvas();
}

var domInputs = {};
for (let param in params) {
    domInputs[param] = document.getElementById(param);
    if (param != 'dh')
        domInputs[param].value = params[param];
    domInputs[param].addEventListener('keydown', (e) => {
        if (e.keyCode === 13) domInputs[param].blur();
    });
    domInputs[param].addEventListener('blur', () => {
        if (!(domInputs[param].value.match(/^[a-zA-Z0-9]$/) || domInputs[param].value.match(/^[a-fA-F0-9]{6}$/))) {
            domInputs[param].value = params[param];
            return;
        }
        params[param] = domInputs[param].value;
        updateCanvas();
    });
    if (['g1', 'g2', 'tc'].includes(param)) {
        domInputs[param].addEventListener('focus', () => {
            if (navigator.userAgent.indexOf('Safari') != -1) {
                var picker = document.createElement("input");
                picker.type = "color";
                picker.value = '#' + domInputs[param].value;
                picker.addEventListener("change", () => {
                    domInputs[param].value = picker.value.substring(1);
                    params[param] = picker.value.substring(1);
                    updateCanvas();
                });
                picker.click();
            }
        });
    }
}

const HNFont = new FontFace("HN", "url(../HN.ttf)");
HNFont.load().then((loaded_face) => {
    document.fonts.add(loaded_face);
    updateCanvas();
});

const downloadButton = document.createElement("button");
downloadButton.innerHTML = "Download";
downloadButton.addEventListener("click", () => {
    var dataURL = canvas.toDataURL("image/png");
    var link = document.createElement("a");
    if (!isXY() && !isXYZ()) hyphens = '';
    else if (params.dh == 'true') hyphens = '--';
    let filename = params.c1;
    for (let param in params) {
        if (['c2', 'c3', 'c4', 'c5'].includes(param) && typeof params[param] == 'string')
            filename += hyphens + params[param];
    }
    link.download = filename + ".png";
    link.href = dataURL;
    link.click();
});

const info = document.createElement('div')
info.classList.add('info')
info.innerHTML = `
<b>Legend:</b><br>
c1: first character <br>
c2: second character <br>` +
    (isXYZ() || isXXX() ? `c3: third character <br>` : '') +
    (isXXXX() ? `c4: fourth character <br>` : '') +
    (isXXXXX() ? `c5: fifth character <br>` : '') +
    `
g1: top gradient color <br>
g2: bottom gradient color <br>
tc: text color
<br><br`
if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)
    info.innerHTML += `As Safari does not support the native html color picker,<br>
    you can either type the hex code or google 'color picker'.`


const randomizeColors = () => {
    for (let param in params) {
        if (['g1', 'g2', 'tc'].includes(param)) {
            params[param] = randomColor();
            domInputs[param] = document.getElementById(param);
            domInputs[param].value = params[param];
        }
        updateCanvas();
    }
}

document.body.appendChild(canvas);
document.body.appendChild(downloadButton);
document.body.appendChild(info);