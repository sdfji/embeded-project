
const util = require('../lib/util')
const request = require('../lib/request')

let modeState = 'off';
let prevValue = 0;
let Count = 0;
let tossAndTurnData = 0;
let oldValue = 0;
let alpha = 0.75; 
let period = 100; //측정 주기.


const gpio = require('wiring-pi')
const BALLTILT = 29
const TOUCHED = 28
const HEARTBEAT = 25
//const util = require()

gpio.wiringPiSetup()
gpio.pinMode(BALLTILT, gpio.INPUT)
gpio.pinMode(TOUCHED, gpio.INPUT)
gpio.pinMode(HEARTBEAT, gpio.INPUT)
/*setInterval(() => {
    const data = gpio.digitalRead(BALLTILT)
console.log(data)
}, 500)*/

 setInterval(TossAndTurn, 500)
 setInterval(SecurityRequest, 100)
 setInterval(SetServer, 1000)
 setInterval(HeartBeatInfo, 100)

function TossAndTurn() {
    if(modeState == 'off')
	    return

    prevValue = tossAndTurnData
    const data = gpio.digitalRead(BALLTILT)
    tossAndTurnData = data


    if(prevValue != tossAndTurnData)
        Count++
    console.log('trunCount : ' +  Count)
}

function SecurityRequest() {
    const data = gpio.digitalRead(TOUCHED)

    if(data)
    {
        if(modeState == 'off')
        {
	//	console.log(modeState)
            request('post', '/security/on')
//	    console.log('securityState : ' + modeState)
	}
        else if(modeState == 'on') {
	//	console.log(modeSt`ate)
            request('post', '/security/off')
 //           console.log('securityState : ' + modeState)
	}
    }
    
}

function HeartBeatInfo()
{
    const rawValue = gpio.analogRead(HEARTBEAT)
    let value = alpha * oldValue + (1 - alpha) * rawValue;

    console.log(rawValue)
    console.log('VALUE : ' + value);
    oldValue = rawValue
}

function SetServer() {
	request('get', '/security')
	.then(onoff => {
		modeState = onoff
		console.log(modeState)
	})
}
///////////////////////////////////////////////////////
