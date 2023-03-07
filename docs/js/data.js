// ================ Data Definition ================ //

'use strict'

window.addEventListener('load', function() {
    connect_window = document.getElementById('connect-baseline')
    messages = document.getElementById('messages')
    Alice_id = document.getElementById('Alice-id')
    Bob_id   = document.getElementById('Bob-id')
    initialize_Peer()
})

let peer = new Peer()
let connections = []
let messages
let connect_window
let Alice_id
let Bob_id
let color_palette = [
    '#980089', '#540073',
    '#360073', '#0067c7',
    '#008da3', '#01894a',
    '#12b800', '#7b8f13',
    '#a57f00', '#a54200',
    '#7d0400', '#91293c',
]