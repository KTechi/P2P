// ================ Function Definition ================ //

'use strict'

function setting() {
    if (connect_window.style.visibility === 'visible')
         connect_window.style.visibility = 'hidden'
    else connect_window.style.visibility = 'visible'
    
    const button = document.getElementById('setting')
    if (button.style.backgroundImage === 'url("image/down.png")')
         button.style.backgroundImage = 'url(image/up.png)'
    else button.style.backgroundImage = 'url(image/down.png)'
}

function initialize_Peer() {
    // Open
    peer.on('open', function(id) {
        Alice_id.innerHTML = id
    })

    // Error
    peer.on('error', function() {
        const message = document.createElement('div')
        messages.append(message)
        message.classList = 'system-message'
        message.innerHTML = 'Error'
    })

    // Receive
    peer.on('connection', function(connection) {
        connection.on('data', function(data) {
            const message = document.createElement('div')
            messages.append(message)
            message.classList = 'receive-message'
            message.innerHTML = String(data)
            messages.scrollTop = messages.scrollHeight

            console.log('from:', connection.peer)
            message.style.backgroundColor = color_palette[
                cyrb53(connection.peer) % color_palette.length
            ]
        })
    })
}

function add_connection(connection_id) {
    Bob_id.value = ''

    if (connection_id.split(' ')[0] == 'me') {
        peer = new Peer(connection_id.split(' ')[1])
        initialize_Peer()
        return
    }

    const connection = peer.connect(connection_id)
    connections.push(connection)
    connection.on('open', function() {
        const message = document.createElement('div')
        messages.append(message)
        message.classList = 'system-message'
        message.innerHTML = 'Connect with [' + connection.peer + ']'
    })
}

function cyrb53(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed
    let h2 = 0x41c6ce57 ^ seed
    for (let i = 0; i < str.length; i++) {
      let ch = str.charCodeAt(i)
      h1 = Math.imul(h1 ^ ch, 2654435761)
      h2 = Math.imul(h2 ^ ch, 1597334677)
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)
    return 4294967296 * (2097151 & h2) + (h1 >>> 0)
}
