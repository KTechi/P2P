// ================ Command ================ //

'use strict'

const input = document.createElement('input')

window.addEventListener('load', function() {
    input.addEventListener('focus' , event => {
        input.style.opacity = 1
        input.style.backdropFilter = 'blur(5px)'
    })
    input.addEventListener('blur'  , event => {
        input.style.opacity = .3
        input.style.backdropFilter = 'blur(0px)'
    })
    input.addEventListener('change', event => {})
    input.style.opacity = .3

    const form = document.createElement('form')
    document.body.append(form)
    form.addEventListener('submit', submit)
    form.append(input)
})

function submit(event) {
    event.preventDefault()
    if (input.value === '') return

    const message = document.createElement('div')
    messages.append(message)
    message.classList = 'send-message'
    message.innerHTML = input.value
    messages.scrollTop = messages.scrollHeight

    for (const conn of connections)
        conn.send(input.value)
    input.value = ''
}

document.addEventListener('keydown', keydown_command, false)
function keydown_command(event) {
    if (event.key === 'Enter') {
        if (document.activeElement === input) {
            if (input.value === '') input.blur()
        } else if (document.activeElement === Bob_id) {
            add_connection(Bob_id.value)
        } else {
            event.preventDefault()
            input.focus()
        }
        return
    }
}
