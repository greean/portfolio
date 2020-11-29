let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// adjust the canvas size as the window is resized
window.addEventListener('resize', function() {	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

let c = canvas.getContext('2d');

// class for each horizontal line
class Lines {
    constructor(x, y, length, rgb, opacity, fadeRate, direction) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.rgb = rgb;
        this.opacity = opacity;
        this.fadeRate = fadeRate;
        this.direction = direction;

        this.draw = function () {
            c.beginPath();
            c.moveTo(this.x, this.y);
            if(this.direction == 0){
                // draw a horizontal line
                c.lineTo(this.x + this.length, this.y);
            }else{
                
                // draw a horizontal line
                c.lineTo(this.x, this.y  + this.length);
            }
            c.strokeStyle = `rgba(${this.rgb}, ${this.opacity}`;
            c.stroke();
        };

        this.update = function () {
            // makes line fade
            if (this.opacity > 0.00) {
                this.opacity = this.opacity - this.fadeRate;
            }
            // once line has faded, move line to new location and reset opacity
            if (this.opacity < fadeRate) {
                this.x = Math.floor(Math.random() * canvas.width);
                this.y = Math.floor(Math.random() * canvas.height);
                this.length = Math.floor(Math.random() * 300) + 10;
                this.opacity = Math.random();
            }
            this.draw();
        };
    }
};

let lineArray = [];
for(let i = 0; i < 600; i++){
    let randX = Math.floor(Math.random()*canvas.width);
    let randY = Math.floor(Math.random()*canvas.height);
    let randLength = Math.floor(Math.random()*300)+10;
    let rgb = '97,137,47';
    let opacity = Math.random();
    let fadeRate = Math.floor(Math.random()*4+1)/7000;
    let direction = Math.floor(Math.random()*2);
    lineArray.push(new Lines(randX,randY, randLength, rgb, opacity, fadeRate, direction));
};

// animate function
let animate = () => {
    requestAnimationFrame(animate);
    c.clearRect(0,0, canvas.width, canvas.height);

    for(let i = 0; i < lineArray.length; i++){
        lineArray[i].update();
    }    
}

animate();


// let drawHorizLines = () => {
//     for(let i = 0; i<5; i++) {
//         animate();
//     }
// };
// drawHorizLines();



// ORIGINAL STATIC LINES
// let drawHorizLines = () => {
//     // green lines at different opacities
//     for(let i = 0; i<300; i++) {
//         let randX = Math.floor(Math.random()*canvas.width);
//         let randY = Math.floor(Math.random()*canvas.height);
//         let randLength = Math.floor(Math.random()*300)+10;
//         let opacity = Math.random();
//         horizLine(randX,randY, randLength, `rgba(97,137,47, ${opacity})`);
//     }
// }
// let drawVertLines = () => {
//     for(let i = 0; i<300; i++) {
//         let randX = Math.floor(Math.random()*canvas.width);
//         let randY = Math.floor(Math.random()*canvas.height);
//         let randLength = Math.floor(Math.random()*250)+10;
//         vertLine(randX,randY, randLength, 'rgba(97,137,47, 0.5)');
//     }
// }

// drawHorizLines();
// drawVertLines();