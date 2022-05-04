//get url GET parameter
const urlString = window.location.href;
const url = new URL(urlString);
var char1 = url.searchParams.get("c1");
var char2 = url.searchParams.get("c2");
var color1 = url.searchParams.get("g1");
var color2 = url.searchParams.get("g2");
var color3 = url.searchParams.get("tc");
var offset = 0;

if (char1 == null || char2 == null || color1 == null || color2 == null || color3 == null) {
    window.alert("Error: Missing parameters. Check the URL.");
    window.location.href = "index.html?c1=x&c2=y&g1=1078c2&g2=57b9ff&tc=ffffff";
}

var char1Input = document.getElementById("char1");
char1Input.value = char1;
var char2Input = document.getElementById("char2");
char2Input.value = char2;
var color1Input = document.getElementById("color1");
color1Input.value = color1;
var color2Input = document.getElementById("color2");
color2Input.value = color2;
var color3Input = document.getElementById("color3");
color3Input.value = color3;

var inputs = document.getElementsByTagName("input");
for (let input of inputs) {
    input.addEventListener("blur", () => {
        if (checkInput(input)) {
            input.style.border = "2px solid #00000000";
            switch (input.id) {
                case "char1":
                    char1 = input.value;
                    break;
                case "char2":
                    char2 = input.value;
                    break;
                case "color1":
                    color1 = input.value;
                    break;
                case "color2":
                    color2 = input.value;
                    break;
                case "color3":
                    color3 = input.value;
                    break;
            }
        } else {
            input.style.border = "red solid 2px";
        }
        updateCanvas();
    });
}

const checkInput = (input) => {
    if (input.value.match(/^\w$/g)) return true;
    if (input.value.match(/^[0-9a-fA-F]{6}$/g)) return true;
    return false;
}

var canvas = document.createElement("canvas");
canvas.style.borderRadius = "0%";
canvas.style.boxShadow = "0px 0px 20px #00000088";
var ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;
document.body.appendChild(canvas);

const HNFont = new FontFace("HN", "url(./HN.ttf)");
HNFont.load().then((loaded_face) => {
    document.fonts.add(loaded_face);
    updateCanvas();
});

const updateCanvas = () => {
    if (['y','g','j','q'].includes(char2)) offset = 20;
    else offset = 0;
    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#'+color1);
    gradient.addColorStop(1, '#'+color2);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 400);
    ctx.font = "135px HN";
    ctx.fillStyle = '#'+color3;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(char1+'-'+char2, 200, 150);
    ctx.fillStyle = '#'+color3+'66';
    ctx.font = "46px HN";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.fillText('.eth', 320, 255 + offset);
    window.history.replaceState(null, null, "?c1="+char1+"&c2="+char2+"&g1="+color1+"&g2="+color2+"&tc="+color3);
}

const downloadButton = document.createElement("button");
downloadButton.innerHTML = "Download";
downloadButton.addEventListener("click", () => {
    var dataURL = canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.download = `${char1}-${char2}.png`;
    link.href = dataURL;
    link.click();
});

document.body.appendChild(downloadButton);

const info = document.createElement('div')
info.classList.add('info')
info.innerHTML = `
To change the parameters you can edit the variables contained within the url:<br>
c1: first character <br>
c2: second character <br>
g1: top gradient color <br>
g2: bottom gradient color <br>
tc: text color
<br><br>
colors must be in hexadecimal format without the '#' symbol (e.g. 1078c2)<br>
type 'color picker' in google
`
document.body.appendChild(info);

const randomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const randomizeColors = () => {
    color1 = randomColor();
    color2 = randomColor();
    color3 = randomColor();
    color1Input.value = color1;
    color2Input.value = color2;
    color3Input.value = color3;
    updateCanvas();
}