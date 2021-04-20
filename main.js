var song = "";
var leftWristY = 0;
var rightWristY = 0;
var leftWristX = 0;
var rightWristX = 0;
var ScoreLeftWrist = 0;

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

    fill("#FF000");
    stroke("#FF000");
if (ScoreLeftWrist > 0.2)
{
    circle(leftWristX, leftWristY, 20);
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

        rightWristX = results[0].pose.rightWrist.x;
        leftWristX = results[0].pose.leftWrist.x;
    }
}