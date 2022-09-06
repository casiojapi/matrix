const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;


window.addEventListener('resize', function(event) {
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    maxColumns = width / fontSize;
    console.log(width, height);

}, true);

let charArray = [
    "c",
    "a",
    // "sio",
    // "ja",
    "s",
    "i",
    "o",
    "j",
    "a",
    "p",
    "i",
    "casiojapi"
];

let maxCharCount = 100;
let fallingCharArray = [];
let fontSize = 14;
let maxColumns = width / fontSize;
let frames = 0;

class FallingChar {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(context) {
        this.value = charArray[Math.floor(Math.random() * (charArray.length - 1))];
        this.speed = (Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 5 - 5;

        context.fillStyle = "rgba(150, 255, 222)";
        context.font = fontSize + "px times";
        context.fillText(this.value, this.x, this.y);
        this.y += this.speed;

        if (this.y > height) {
            this.y =  (Math.random() * height) / 2 - 50;
            this.x = Math.floor(Math.random() * maxColumns) * fontSize;
            this.speed = (-Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;
        
        }
    }
}
      
let update = () => {
    if (fallingCharArray.length < maxCharCount) {
        let fallingChar = new FallingChar(
            Math.floor(Math.random() * maxColumns) * fontSize,
            (Math.random() * height) / 2 - 50
        );

        fallingCharArray.push(fallingChar);
    }

    context.fillStyle = "rgba(0,0,0,0.125)";
    context.fillRect(0, 0, width, height);
    for (let i = 0; i < fallingCharArray.length && frames % 2 == 0; i++) {
        fallingCharArray[i].draw(context);
    }

    requestAnimationFrame(update);
    frames++;
};

update();