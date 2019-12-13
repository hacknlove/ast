import React, { useState } from 'react';
import './App.css';

const timer = {
  keyPressed () {}
}

const audio = new Audio('./app-30.mp3');

document.body.addEventListener('keypress', event => {
  timer.keyPressed(event.key.toLocaleLowerCase())
})

function App() {
  const [green, setgreen] = useState(3)
  const [status, setstatus] = useState('STOP')

  console.log(green)

  timer.keyPressed = key => {
    clearTimeout(timer.greenTimer)
    clearTimeout(timer.yellowTimer)
    clearTimeout(timer.redTimer)
    clearTimeout(timer.clapTimer)
    audio.pause();
    audio.currentTime = 0;

    switch (key) {
      case 'e':
        setstatus('STOP')
        break
      case 's':
        setstatus('ok')
        break
      case 'g':
        setstatus('green')
        break
      case 'r':
        setstatus('red')
        break
      case 'y':
        setstatus('yellow')
        break
      case 'f':
        document.getElementById('root').requestFullscreen()
        return
      case 'c':
        audio.play();
        setstatus('CLAPS')    
        break
      default:
        console.log(key)
        return
    }
  }

  function start (e) {
    e.preventDefault()
    if (!green) {
      return startRed()
    }
    timer.greenTimer = setTimeout(() => setstatus('green'), green * 60 * 1000)
    timer.yellowTimer = setTimeout(() => setstatus('yellow'), (+green + 1) * 60 * 1000)
    timer.redTimer = setTimeout(() => setstatus('red'), (+green + 2) * 60 * 1000)
    timer.clapTimer = setTimeout(() => {
      audio.play();
      setstatus('CLAPS')
    }, (+green + 2.5) * 60 * 1000)

    document.getElementById('root').requestFullscreen()
    setstatus('ok')
  }

  function startRed () {
    timer.redTimer = setTimeout(() => setstatus('red'), 60 * 1000)
    timer.clapTimer = setTimeout(() => {
      audio.play();
      setstatus('CLAPS')
    }, 90 * 1000)

    document.getElementById('root').requestFullscreen()
    setstatus('ok')
  }

  function stopClap () {
    audio.pause();
    audio.currentTime = 0;
    setstatus('STOP')
  }


  function stop () {
    clearTimeout(timer.greenTimer)
    clearTimeout(timer.yellowTimer)
    clearTimeout(timer.redTimer)
    clearTimeout(timer.clapTimer)
    setstatus('STOP')
  }

  switch (status) {
    case 'STOP':
      return (
        <form id="app" className="form" onSubmit={start}>
          <div>
            <img src="/logo.png"/>
            <input type="number" value={green.toFixed(0)} onChange={e => setgreen(+e.target.value % 100)}/>
            <span>Minutes</span>
          </div>
        </form>
      );
    case 'CLAPS':
      return (
        <div onClick={stopClap} id="app" className="CLAPS">
          STOP NOW!
        </div>
      );
    default:
      return (
        <div onClick={stop} id="app" className={status}>
          {status}
        </div>
      )
  }
}

export default App;
