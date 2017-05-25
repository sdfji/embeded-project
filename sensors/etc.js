/**
 * author:  hyerim k
 *   note:  external sensor modules
 *          of sleep monitoring service 'croissant'
 */

const gpio = require('wiring-pi')
let sleepMode = false
let securityMode = false



const fire = {
  //member variables
  PIN: 23,

  //function
  read() {
    const data = gpio.digitalWrite( this.PIN )
    if( !data ){
      buzzer_act.write()
    }
    return data
  }
}

const buzzer_act = {
  //member variables
  PIN: 4,
  time: 1500,

  //function
  init() {
    gpio.pinMode( this.PIN, gpio.OUTPUT )
  },
  write() {
    gpio.digitalWrite( this.PIN, 1 )
    gpio.delay( this.time )
    gpio.digitalWrite( this.PIN, 0 )
  },

}

const buzzer_pas = {
  //member variables
  PIN: 5,
  time: 200,

  //function
  init() {
    gpio.pinMode( this.PIN, gpio.OUTPUT )
  },
  write() {
    gpio.digitalWrite( this.PIN, 1 )
    gpio.delay( this.time )
    gpio.digitalWrite( this.PIN, 0 )
  },
}

const button = {
  //member variables
  PIN: 1,

  //function
  init() {
    gpio.pinMode( this.PIN, gpio.OUTPUT )
  },
  readStart() {
    setInterval( () => {
      const data = gpio.digitalRead( this.PIN )
      if( !data ){
        sleepMode = sleepMode ? false : true
        securityMode = sleepMode
      }
    }, 500)
  }

}

const led = {
  //member variables
  RED: 0,
  GREEN: 2,
  BLUE: 3,

  //function
  init() {
    gpio.pinMode( this.RED, gpio.OUTPUT )
    gpio.pinMode( this.GREEN, gpio.OUTPUT )
    gpio.pinMode( this.BLUE, gpio.OUTPUT )
  },
  quit() {
    gpio.digitalWrite(this.RED, 0)
    gpio.digitalWrite(this.GREEN, 0)
    gpio.digitalWrite(this.BLUE, 0)
  },
  off() {
    gpio.digitalWrite(this.RED, 1)
    gpio.digitalWrite(this.GREEN, 0)
    gpio.digitalWrite(this.BLUE, 0)
  },
  on() {
    gpio.digitalWrite(this.RED, 0)
    gpio.digitalWrite(this.GREEN, 1)
    gpio.digitalWrite(this.BLUE, 0)
  },
}


module.exports = {
  setModeStatus(sleep, security) {
    sleepMode = sleep
    securityMode = security
  },

  init() {
    gpio.wiringPiSetup()
    fire.init()
    buzzer_pas.init()
    buzzer_act.init()
    button.init()
    led.init()

    button.readStart()
    setInterval( () => {
      if( sleepMode && securityMode ) {
        fire.read()
      }
    }, 500)
  },
}
