const tasks = []
let time = 0
let timer = null
let timerBreak = null
let current = null

const bAdd = document.querySelector('#bAdd')
const itTasks = document.querySelector('#itTasks')
const form = document.querySelector('form')
const tasksName = document.querySelectorAll('#time #taskName')


form.addEventListener('submit', (e) => {
    e.preventDefault()
    if(itTasks.value !== ''){
        createTasks(itTasks.value)
        itTasks.value = ''
        renderTasks()
    }
})

function createTasks(value) {
    const newTasks = {
        id: Date.now(),
        value: value,
        completed: false
    }
    tasks.unshift(newTasks)
}

function renderTasks() {
    const html = tasks.map((task) => {
        return `
          <div class="task">
            <div class="completed">${task.completed ? `<span class="done">Done</span>` : `<button class="start-button" data-id="${task.id}">Start</button>`}</div>
            <div class="title">${task.value}</div>
          </div>
        `
    })

    const tasksContainer = document.querySelector('#tasks')
    tasksContainer.innerHTML = html.join('')

    const startButtons = document.querySelectorAll('.task .start-button')

    startButtons.forEach(button => {
        button.addEventListener('click', e => {
            if(!timer) {
                const id = button.getAttribute('data-id')
                startButtonHandler(id)
                button.textContent = 'In progress...'
            }
        })
    })
}

function startButtonHandler(id) {
    time = .1 * 60
    current = id
    const taskIndex = tasks.findIndex(task => task.id === Number(id))
    tasksName.textContent = tasks[taskIndex].title

    timer = setInterval(() => {
       timeHandler(id)
    }, 1000)
}

function timeHandler(id) {
    time--
    renderTime()

    if(time === 0) {
        clearInterval(timer)
        markCompleted(id)
        renderTasks()
        startBreak()
    }
}

function renderTime() {
    const timeDiv = document.querySelector('#time #value')
    const minutes = parseInt(time / 60)
    const seconds = parseInt(time % 60)
    timeDiv.textContent = `${minutes < 10 ? '0' + minutes: minutes}:${seconds < 10 ? '0' + seconds : seconds}`
}

function markCompleted(id) {
    const taskIndex = tasks.findIndex(task => task.id === Number(id))
    tasks[taskIndex].completed = true
}

function startBreak() {
    time = .1 * 60
    tasksName.textContent = 'Break'
    timerBreak = setInterval(() => {
        timeBreakHandler()
    }, 1000)
}

function timeBreakHandler() {
    time--
    renderTime()

    if(time === 0) {
        clearInterval(timerBreak)
        current = null
        tasksName.textContent = ''
        renderTasks()
    }
}
