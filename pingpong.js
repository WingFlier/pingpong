var scoreElement =  document.getElementById('score');
var canvas =  document.getElementById('canvas');
var context =  canvas.getContext('2d');
var delta = 5;

var wKey = 87;
var sKey = 83;
var arrowUpKey = 38;
var arrowDownKey = 40;

const defaultBallX = 500;
const defaultBallY = 300;

const rand = function(fromNum, toNum)
	{
		return Math.floor(Math.random() * toNum) + fromNum;
	};

const playerData = 
{
	player1 : 
	{
		y : 280,
		yDelta : 20
	}, 
	player2 :
	{
		y : 280,
		yDelta : 20
	}
};

const randomWay = function()
{
	return rand(0,2) === 0 ? delta : -delta;
};

const ballData = 
{	
	x: defaultBallX,
	y: defaultBallY,
	xDelta: randomWay(),
	yDelta: randomWay()
};

const drawPlayers = function()
{
	context.rect(20,playerData.player1.y,20,100);
	context.rect(960,playerData.player2.y,20,100);
	context.stroke(); 
};

const isInBorders = function(playerY)
{
	return playerY + 100 < canvas.height && playerY > 0
}

const winner = function(player)
{
	var score = scoreElement.textContent;
	
	if(player === 1)
	{
		var currentScore =  parseInt(score.split(' : ')[0]);
		scoreElement.innerHTML = ++currentScore + " : " + score.split(' : ')[1];
	} else if(player === 2)
	{
		var currentScore =  parseInt(score.split(' : ')[1]);
		scoreElement.innerHTML = score.split(' : ')[0] + " : " + ++currentScore;
	}
	
	if(score.split(' : ')[1] == '10' || score.split(' : ')[0] == '10')
	{
		alert('we have a winner');
		location.reload();
	}
};

document.addEventListener('keydown', function(e) {
		switch(e.keyCode)
		{
			case wKey:
				if(playerData.player1.y <= playerData.player1.yDelta)
					return;
				playerData.player1.y -= playerData.player1.yDelta;
			break;
			case sKey:
				if(playerData.player1.y + 100 >= canvas.height -  playerData.player1.yDelta)
					return;
				 playerData.player1.y += playerData.player1.yDelta;
			break;
			case arrowUpKey:
				if(playerData.player2.y <= playerData.player2.yDelta)
					return;
				 playerData.player2.y -= playerData.player2.yDelta;
			break;
			case arrowDownKey:
			
				if(playerData.player2.y + 100 >= canvas.height -  playerData.player2.yDelta)
					return;
				 playerData.player2.y += playerData.player2.yDelta;
			break;
		}
    }, false);
	
	const beginMovement = function() 
	{
		ballData.x += ballData.xDelta;
		ballData.y += ballData.yDelta;
		if(document.getElementById('checkbox').checked)
			playerData.player2.y = ballData.y - 50;
	};
	
	const  detectCollision = function()
	{
		if(ballData.y >= playerData.player1.y && ballData.y <= playerData.player1.y + 100 
			&& ballData.x <= 50)
		{
			ballData.xDelta = -ballData.xDelta;
		} else if(ballData.y >= playerData.player2.y && ballData.y <= playerData.player2.y + 100 
			&& ballData.x >= 950) 
		{
			ballData.xDelta = -ballData.xDelta;
		}
	};
	
	const updateData = function()
	{
		if(ballData.x - 10 === 0)
		{
			winner(2);
			ballData.y = defaultBallY;
			ballData.x = defaultBallX;
			ballData.xDelta = -ballData.xDelta;
		}
		if(ballData.y - 10 === 0)
		{
			ballData.yDelta = -ballData.yDelta;
		}
		 if(ballData.x + 10 === canvas.width)
		{
			winner(1);
			ballData.y = defaultBallY;
			ballData.x = defaultBallX;
			ballData.xDelta = -ballData.xDelta;
		}
		if(ballData.y + 10 === canvas.height)
		{
			ballData.yDelta = -ballData.yDelta;
		}
		detectCollision();
			
	};

    const draw = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = 'black';
        context.fillRect(20,playerData.player1.y,20,100);
		context.fillRect(960,playerData.player2.y,20,100);
		
		context.beginPath();
		context.arc(ballData.x, ballData.y, 10, 0,2 * Math.PI);
		context.stroke();
    };

    const animate = function() {
		beginMovement();
		updateData();
        draw();
        window.setTimeout(animate, 10);
    };
    animate();