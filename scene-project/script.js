const canvas = document.getElementById("sceneCanvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let imagesLoaded = 0;
const totalImages = 3;

const bg = new Image();
const fg1 = new Image();
const fg2 = new Image();

bg.src = "background.jpg";
fg1.src = "fg1.png";
fg2.src = "fg2.png";

bg.onload = imageLoaded;
fg1.onload = imageLoaded;
fg2.onload = imageLoaded;

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
      document.fonts.ready.then(() => {
        drawScene();
      });
    }
  }

function drawScene() {
  context.drawImage(bg, 0, 0, canvas.width, canvas.height);
  context.drawImage(fg1, 10, canvas.height -300, 300, 300);
  context.drawImage(fg2, canvas.width - 300, canvas.height - 300, 300, 300);
  context.font = "30px Tahoma";
  context.fillStyle = "#FFFFFF";
  context.fillText("Fardin Ahmed", 30, 40);
  context.fillText("F1 - McLaren", 30, 80);
  context.font = "30px tektur";
  context.fillStyle = "#FFFFFF";
  context.fillText("Oscar Piastri", 230, canvas.height - 160);
  context.fillText("Lando Norris", canvas.width - 390, canvas.height - 160);
}
