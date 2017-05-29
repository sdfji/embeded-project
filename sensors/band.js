
const util = require('../lib/util')
const send = require('../lib/send')

console.log(util.rand(0, 1))

let OnoFF; //C#의 var 

/*if(OnOff == true)
    send('/event/fire')
if(OnOff == false)
    send('/event/fire')*/

send('/security/on') //on 요청 보냄. off는 on만 off로.

let OnOff = send('/security') // 보안 상태를 받음.

if (OnOff == true) //OnOff의 판단 여부를 가림.
{
    send('/security/off')
}

let prevValue = 0;
let Count = 0;


/*const tossAndTurnData = {
    tossCount: 0
}*/

const gpio = require('wiring-pi')
const BALLTILT = 29
const TOUCHED = 28
//const util = require()

gpio.wiringPiSetup()
gpio.pinMode(BALLTILT, gpio.INPUT)
gpio.pinMode(TOUCHED, gpio.INPUT)
/*setInterval(() => {
    const data = gpio.digitalRead(BALLTILT)
console.log(data)
}, 500)*/

setInterval(TossAndTurn, 500)
setInterval(SecurityRequest, 500)

function TossAndTurn() {
    prevValue = data
    const data = gpio.digitalRead(BALLTILT)

    if(prevValue != data)
        Count++
    //console.log(data)
}

function SecurityRequest() {
    const data = gpio.digitalRead(TOUCHED)

    if(data)
    {
        if("보안 온")
        {
            send('/security/off')
        }
        else {
            send('/security/on')
        }
    }
}


///////////////////////////////////////////////////////
