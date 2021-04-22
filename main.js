var song = "";
var leftWristY = 0;
var rightWristY = 0;
var leftWristX = 0;
var rightWristX = 0;
var ScoreLeftWrist = 0;
var ScoreRightWrist =0;
function preload()
{
 song = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses);
}
function draw(){
    image(video, 0, 0, 400, 400);

    fill("red");
    stroke("red");
   
    if (ScoreRightWrist > 0.2){
    circle(rightWristX-50, rightWristY-50, 20);
    if(rightWristY >= 0 && rightWristY <= 100)
    {
        document.getElementById("output_speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY >= 100 && rightWristY <= 200)
    {
        document.getElementById("output_speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if(rightWristY >= 200 && rightWristY <= 300)
    {
        document.getElementById("output_speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY >= 300 && rightWristY <= 400)
    {
        document.getElementById("output_speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else{
        document.getElementById("output_speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5); 
    }
}
if (ScoreLeftWrist > 0.2)
{
    circle(leftWristX-150, leftWristY-50, 20);
    NumberLeftWrist = Number(leftWristY);
    floored_number = floor(NumberLeftWrist);
    volume = floored_number / 500;
    document.getElementById("output_volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
}
}
function play()
{
 song.play();
 song.setVolume(1);
 song.rate(1);
}
function modelLoaded()
{
    console.log("Posenet is successfully initialized.");
}
function gotPoses(results)
{
    if (results.length > 0)
    {   console.log(results);
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;
        ScoreLeftWrist = results[0].pose.keypoints[9].score;
        ScoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score Of RightWrist = " + ScoreRightWrist + " Score Of LeftWrist = " + ScoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        leftWristX = results[0].pose.leftWrist.x;
    }
}