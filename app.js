const startBtn = document.querySelector('#start')
const screen = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const circle = document.querySelector('.circle')

const colors = ['red', 'blue', 'white', 'pink', 'purple', 'yellow']


let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  screen[0].classList.add('up')
})

timeList.addEventListener('click', event => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute( 'data-time'))
    screen[1].classList.add('up')
    startGame()
  }
})

board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
  }
})

function startGame(circle) {
  setInterval(decreaseTime, 1000)
  createRandomCircle()
  setTime(time)

}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  }else {
    let current = --time
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }
}
function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}
function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
  let circle = document.createElement('div')
  const color = getRandomColor()
  circle.style.background = color
  circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
  const size = getRandomNumber(10, 60)
  const {width, height} = board.getBoundingClientRect()
  let x = getRandomNumber(0, width - size)
  let y = getRandomNumber(0, height - size)
  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${x}px`
  circle.style.left = `${y}px`
  board.append(circle)

  function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
  }
}
function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}

