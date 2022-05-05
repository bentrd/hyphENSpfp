const randomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const is3 = () => window.location.href.includes('x-y-z');

const urlString = window.location.href;
const url = new URL(urlString);
tailed = ['y', 'g', 'j', 'q'];
var params = { 'c1': 'x', 'c2': 'y', 'g1': randomColor(), 'g2': randomColor(), 'tc': randomColor() };
if (is3()) params.c3 = 'z';
for (let param of url.searchParams.entries()) {
    params[param[0]] = param[1];
}


var canvas = document.createElement("canvas");
canvas.style.boxShadow = "0px 0px 20px #00000088";
var ctx = canvas.getContext("2d");
var scale = 2;
canvas.width = 400 * scale;
canvas.height = 400 * scale;

const updateCanvas = () => {
    let offset = 0;
    if (is3()) {
        if (tailed.includes(params.c3)) offset = canvas.height * 0.05;
        fontSizes = [120, 46];
    } else fontSizes = [135, 46];
    fontSizes = fontSizes.map(x => x * scale);
    var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#' + params.g1);
    gradient.addColorStop(1, '#' + params.g2);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSizes[0] + "px HN";
    ctx.fillStyle = '#' + params.tc;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    if (is3())
        ctx.fillText(params.c1 + '-' + params.c2 + '-' + params.c3, canvas.width / 2, canvas.height * 3 / 8);
    else ctx.fillText(params.c1 + '-' + params.c2, canvas.width / 2, canvas.height * 3 / 8);
    ctx.fillStyle = '#' + params.tc + '66';
    ctx.font = fontSizes[1] + "px HN";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.fillText('.eth', canvas.width * 320 / 400, canvas.height * 255 / 400 + offset);
    updateURL();
}

const updateURL = () => {
    for (let param in params) {
        url.searchParams.set(param, params[param]);
        params[param] = domInputs[param].value;
    }
    window.history.replaceState({}, '', url.toString());
}

var domInputs = {};
for (let param in params) {
    domInputs[param] = document.getElementById(param);
    domInputs[param].value = params[param];
    domInputs[param].addEventListener('keydown', (e) => {
        if (e.keyCode === 13) domInputs[param].blur();
    });
    domInputs[param].addEventListener('blur', () => {
        if (!(domInputs[param].value.match(/^[a-zA-Z0-9]$/) || domInputs[param].value.match(/^[a-zA-Z0-9]{6}$/))) {
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
                picker.value = domInputs[param].value.substring(1);
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
    link.download = `${params.c1}-${params.c2}`(is3() ? `-${params.c3}` : '') + '.png';
    link.href = dataURL;
    link.click();
});

const info = document.createElement('div')
info.classList.add('info')
info.innerHTML = `
To customize the pfp you can edit the variables:<br>
c1: first character <br>
c2: second character <br>` +
    (is3() ? `c3: third character <br>` : '') + `
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