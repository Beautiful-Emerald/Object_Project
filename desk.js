img="";
status="";
objects=[];

function preload(){
img= loadImage('https://www.thebalancesmb.com/thmb/kKEelOvAsmrcN4Znms34XwF58FE=/1136x639/smart/filters:no_upscale()/71Djm1b6iL._AC_SL1500_-b23ad3a38e6e47fb8006df4622ba4219.jpg');
}

function setup(){
canvas= createCanvas(380, 380);
canvas.position(320,100);
objectDetector=ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded(){
console.log("Model Loaded!!!!!")
status=true;
objectDetector.detect(img, gotResults);
}

function draw(){
image(img, 0, 0, 380, 380);

if(status!=""){
r=random(255);
g=random(255);
b=random(255);
for(i=0; i<objects.length; i++){
document.getElementById("status").innerHTML="Status: Objects Detected";
document.getElementById("number_of_objects").innerHTML="Number of objects detected="+objects.length;
fill(r,g,b);
percent=floor(objects[i].confidence*100);
text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
noFill();
stroke(r,b,g);
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

}
}
}

function gotResults(error, results){
if(error){
console.error(error);
}
else{
console.log(results);
objects=results;
}
}
