//get url GET parameter
const urlString = window.location.href;
const url = new URL(urlString);
var char1 = url.searchParams.get("c1");
var char2 = url.searchParams.get("c2");
var color1 = url.searchParams.get("g1");
var color2 = url.searchParams.get("g2");
var color3 = url.searchParams.get("txtColor");

if (char1 == null || char2 == null || color1 == null || color2 == null || color3 == null) {
    window.alert("Error: Missing parameters. Check the URL.");
    window.location.href = "index.html?c1=x&c2=y&g1=1078c2&g2=57b9ff&txtColor=ffffff";
}

var canvas = document.createElement("canvas");
canvas.style.borderRadius = "0%";
var ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;
document.body.appendChild(canvas);

var gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, '#'+color1);
gradient.addColorStop(1, '#'+color2);
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 400, 400);

const HNFont = new FontFace("HN", "url(HN.ttf)");
HNFont.load().then(function(loaded_face) {
    document.fonts.add(loaded_face);
    ctx.font = "144px Helvetica";
    ctx.fillStyle = '#'+color3;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(char1+'-'+char2, 200, 200);
    ctx.fillStyle = '#'+color3+'66';
    ctx.font = "64px Helvetica";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.fillText('.eth', 340,250)
});
