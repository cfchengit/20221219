var colors = "ffcbf2-f3c4fb-ecbcfd-e5b3fe-e2afff-deaaff-d8bbff-d0d1ff-c8e7ff-c0fdff".split("-").map(a=>"#"+a)

var colors_r = "f72585-7209b7-3a0ca3-4361ee-4cc9f0".split("-").map(a=>"#"+a)

//宣告所有花的資訊，需要使用list紀錄

var positionListX =[]  //所有花的X軸位置，List串列，array陣列
var positionListY =[]  //所有花的Y軸位置
var clrList=[]      //所有花瓣顏色
var clr_rList = []  //所有花圓心顏色
var sizeList =[]  //所有花的大小

//+++++++++++++++++++++++++++++++++
let handpose;
let video;
let predictions = [];
let pointerX, pointerY, pointerZ;
let pointerX8,pointerY8,pointerZ8,pointerX4,pointerY4,d
let pointerX14,pointerY14,pointerX16,pointerY16

//+++++++++++++++++++++++++++++++++


function setup() {
  createCanvas(windowWidth, windowHeight);
  for(var j =0;j<10;j++){

    //紀錄資料
    positionListX.push(random(width)) //把花X位置存入到positionListX list資料內
    positionListY.push(random(height)) //把花Y位置存入到positionListY list資料內
    clrList.push(colors[int(random(colors.length))])
    clr_rList.push(colors_r[int(random(colors_r.length))]) //花圓心顏色放到list
    sizeList.push(random(0.5,1.5))
    
    //畫圖
    push()
      translate(positionListX[j],positionListY[j])
      // var clr = colors[int(random(colors.length))]
      // var clr_r = colors_r[int(random(colors_r.length))]
      // drawFlower(clr,clr_r,random(0.5,1.5)) 
      drawFlower(clrList[j], clr_rList[j], sizeList[j]) 
    pop()    
  }
  //++++++++++++++++++++++++++++++++
  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", (results) => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
  //++++++++++++++++++++++++++++++++
}

function modelReady() {
  console.log("Model ready!");
}


function draw() {
  translate(width, 0);
  scale(-1, 1);
  background(255);
  drawKeypoints();
  d= dist(pointerX8,pointerY8,pointerX4,pointerY4)

  // background(255);

  for(var k=0;k<positionListX.length;k++)
  {
    // push()
    //   translate(positionListX[k],positionListY[k])
    //   rotate(frameCount/50)      
    //   drawFlower(clrList[k], clr_rList[k], map(mouseX,0,width,sizeList[k],sizeList[k]+1))
    // pop() 
    r_Flower(clrList[k], clr_rList[k],sizeList[k],positionListX[k],positionListY[k])
  }
  

}

function r_Flower(F_clr,F_clr_r,F_size,F_x,F_y){
	push()
		translate(F_x,F_y);
	if(pointerY14<pointerY16){
		drawFlower(F_clr,F_clr_r,map(d,0,600,F_size,F_size+1))
	}else
	{
		rotate(frameCount/20)
		drawFlower(F_clr,F_clr_r,F_size)
			
	}
	pop()
}

function drawFlower(clr,clr_r,size=1){ 
  push()
    // fill(255,211,33) //中間的圓顏色
    scale(size) //縮放比率，1:100%，size<1代表縮小，size>1代表放大
    fill(clr_r)
    ellipse(0,0,50)  //圓以中心點為座標點
    ellipseMode(CORNER) //往後執行ellipse指令，以左上角為座標點
    for(var i =0;i<16;i++){  
      // rect(30,-20,100,30)
      // fill(255,90,61)      //花瓣的顏色
      fill(clr)
      ellipse(30,-20,100,30)       
      line(45,-5,115,-5)    //x軸請在30與30+100之間，y軸... 
      rotate(PI/8) //PI代表180，
    }
  pop()
    
}

// function mousePressed()
// {
//   positionListX.push(mouseX) //把花X位置存入到positionListX list資料內
//   positionListY.push(mouseY) //把花Y位置存入到positionListY list資料內
//   clrList.push(colors[int(random(colors.length))])
//   clr_rList.push(colors_r[int(random(colors_r.length))]) //花圓心顏色放到list
//   sizeList.push(random(0.5,1.5))
//   let data_total = positionListX.length //目前資料筆數
//   push()
//     translate(positionListX[data_total-1],positionListY[data_total-1])
//     drawFlower(clrList[data_total-1], clr_rList[data_total-1], sizeList[data_total-1]) 
//   pop() 

// }

function R_draw(handX,handY)
{
  positionListX.push(handX) //把花X位置存入到positionListX list資料內
  positionListY.push(handY) //把花Y位置存入到positionListY list資料內
  clrList.push(colors[int(random(colors.length))])
  clr_rList.push(colors_r[int(random(colors_r.length))]) //花圓心顏色放到list
  sizeList.push(random(0.5,1.5))
  let data_total = positionListX.length //目前資料筆數
  push()
    translate(positionListX[data_total-1],positionListY[data_total-1])
    drawFlower(clrList[data_total-1], clr_rList[data_total-1], sizeList[data_total-1]) 
  pop() 

}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      // noStroke();
      if (j == 8) {				
				pointerX8 = map(keypoint[0],0,640,0,width)
				pointerY8 = map(keypoint[1],0,480,0,height)
        pointerZ8 = map(keypoint[2],0,480,0,height)
        console.log(pointerZ8)
        if(pointerZ8<-150)
        {
          R_draw(pointerX8,pointerY8)
        }
				ellipse(pointerX8, pointerY8, 30, 30);
      } else
      if (j == 4) {   
		fill(255,0,0)
        pointerX4 = map(keypoint[0],0,640,0,width)
        pointerY4 = map(keypoint[1],0,480,0,height)
				// pointerZ = keypoint[2]
				// print(pointerZ)
        ellipse(pointerX4, pointerY4, 30, 30);
		
      } else
      if (j == 14) {
        pointerX14 = keypoint[0];
        pointerY14 =  keypoint[1];
      } else
      if (j == 16) {
        pointerX16 = keypoint[0];
        pointerY16 =  keypoint[1];
      }
			
    }
  
  }
}