const tasks = []
let time = 0
let timer = null
let timerBreak = null
let current = null

const bAdd = document.querySelector('#bAdd')
const itTasks = document.querySelector('#itTasks')
const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if(itTasks.value == ''){
        createTasks(itTasks.value)
        itTasks.value = ''
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