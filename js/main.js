// ========== Global variables ==========

const main = document.querySelector('main')
const root = document.querySelector(':root')
const input = document.querySelector('input')
const resultInput = document.querySelector('#result')
const buttons = document.querySelectorAll('.charKey')
const clearBtn = document.querySelector('#clear')
const equalBtn = document.querySelector('#equal')
const themeSwitcher = document.querySelector('#themeSwitcher')
const copyBtn = document.querySelector('#copyToClipboard')

//keys that the user can type
const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%",  " "]


// ========== events ==========

input.addEventListener('keydown', function(ev) {
    ev.preventDefault()
    if(allowedKeys.includes(ev.key)) {
        input.value += ev.key
        return
    }

    if (ev.key === 'Backspace') {
        input.value = input.value.slice(0, -1)
    }

    if (ev.key === 'Enter') {
        calculate()
    }
})

buttons.forEach(function (button) {
    button.addEventListener('click', function (ev) {
        ev.preventDefault()
        const value = button.dataset.value
        input.value += value
    })
})

clearBtn.addEventListener('click', function(ev) {
    ev.preventDefault()
    input.value = ""
    resultInput.value = ''
    if (resultInput.classList.contains("error")) {
        resultInput.classList.remove("error");
      }
    input.focus()
})

equalBtn.addEventListener('click', calculate)

themeSwitcher.addEventListener('click', function(ev) {
    ev.preventDefault();

    if (main.dataset.theme === 'dark') {
        root.style.setProperty('--bg-color', '#f1f5f9');
        root.style.setProperty('--border-color', '#aaa');
        root.style.setProperty('--font-color', '#212529');
        root.style.setProperty('--primary-color', '#26834a');
        main.dataset.theme = 'light';
    } else {
        root.style.setProperty('--bg-color', '#212529');
        root.style.setProperty('--border-color', '#666');
        root.style.setProperty('--font-color', '#f1f5f9');
        root.style.setProperty('--primary-color', '#4dff91');
        main.dataset.theme = 'dark';
    }
})

copyBtn.addEventListener('click', function(ev) {
    ev.preventDefault()
    const button = ev.currentTarget
    if(button.innerText === 'Copy') {
        button.innerText = 'Copied'
        button.classList.add('success')
        navigator.clipboard.writeText(resultInput.value)
    } else {
        button.innerText = 'Copy'
        button.classList.remove('success')
    }
})

// ========== functions ==========

function calculate() {
    try {
        copyBtn.disabled = false
        resultInput.value = ''
        if (resultInput.classList.contains("error")) {
            resultInput.classList.remove("error");
          }
        const result = eval(input.value)
        resultInput.value = result 
    } catch (error) {
        resultInput.value = error.message
        resultInput.classList.add('error')
        copyBtn.disabled = true
    }
   
}