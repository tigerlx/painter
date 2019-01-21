// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const { ipcRenderer } = require('electron')
const { Painter } = require('./painter.js')
window.onload = function () {

    // const canvas = document.getElementById('painter')
    // const ctx = canvas.getContext("2d")
    const saveBtn = document.getElementById('save')
    // const backBtn = document.getElementById('back')
    Painter.init('painter')
    const menus = {
        undo: Painter.undo
    }

    // let lines = []
    // let width = document.body.clientWidth
    // let height = document.body.clientHeight

    saveBtn.onclick = function () {
        ipcRenderer.send('save', Painter.canvas.toDataURL())
    }

    // function undo () {
    //     lines.pop()
    //     canvas.width = width
    //     canvas.height = height
    //     lines.forEach((value) => {
    //         ctx.moveTo(value[0].x, value[0].y)
    //         value.forEach((val) => {
    //             ctx.lineTo(val.x, val.y)
    //             ctx.stroke()
    //         })
    //     })
    // }

    ipcRenderer.on('menu', (event, data) => {
        data && menus[data] && menus[data]()
    })

    // canvas.width = width
    // canvas.height = height
    // ctx.lineWidth = "2";
    // ctx.fillStyle = "#FF0000"
    // ctx.strokeStyle = "green"; // Green path

    // let startPaint = false
    // let move = function (e) {
    //     if (e.clientX < 0 || e.clientY < 0) {
    //         return
    //     }
    //     let index = lines.length - 1
    //     lines[index].push({x: e.clientX, y: e.clientY})
    //     ctx.lineTo(e.clientX, e.clientY);
    //     ctx.stroke();
    // }
    // document.addEventListener('mousedown', function (e) {
    //     if (e.target.id !== 'painter') {
    //         return
    //     }
    //     startPaint = true
    //     ctx.moveTo(e.clientX, e.clientY);
    //     lines.push([{x: e.clientX, y: e.clientY}])
    //     document.addEventListener('mousemove', move)
    // })
    // document.addEventListener('mouseup', function () {
    //     document.removeEventListener('mousemove', move)
    // })

    window.onresize = function() {
        // width = painter.canvas.width = document.body.clientWidth
        // height = painter.canvas.height = document.body.clientHeight
    }
}
