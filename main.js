img = "";
objects = [];
status = "";

function preload(){
  alert = loadSound("alert.mp3");
}

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  //canvas.position(278, 130);
  video = createCapture(VIDEO);
  video.hide();
  video.size(380, 380);
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw() {
  image(video, 0, 0, 380, 380);

  if(status != ""){
    objectDetector.detect(video, gotResult);

    r = random(255);
    g = random(255);
    b = random(255);

    for(i = 0; i < objects.length; i++){
        if(objects[i].label == "person"){
          document.getElementById("status").innerHTML = "Objects Detected";
          document.getElementById("status_baby").innerHTML = "Baby Detected";
          alert.stop();
          fill(r,g,b);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 10, objects[i].y + 15);
          noFill();
          stroke(r,g,b);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        else{
          document.getElementById("status").innerHTML = "Objects Detected";
          document.getElementById("status_baby").innerHTML = "Baby Detected";
          alert.play();
        }
    }
    if(objects.length < 0){
      document.getElementById("status_baby").innerHTML = "Baby NOT Detected!!"
      alert.play();
    }
  }
}