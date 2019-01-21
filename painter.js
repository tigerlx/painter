(function (win) {
    var Painter = Painter || {}
    win.Painter = Painter
    Painter.lines = []
    Painter._options = {
        width: 1024,
        height: 864,
        lineWidth: 1
    }
    Painter.init = function (id) {
        if (!id) {
            throw 'missing id of element'
        }
        Painter.canvas = document.getElementById(id)
        Painter.canvas.width = Painter._options.width
        Painter.canvas.height = Painter._options.height

        Painter.ctx = Painter.canvas.getContext("2d")
        Painter.ctx.lineWidth = Painter._options.lineWidth

        Painter.canvas.addEventListener('mousedown', function (e) {
            if (e.target.id !== Painter.canvas.id) {
                return
            }
            startPaint = true
            Painter.ctx.moveTo(e.clientX, e.clientY);
            Painter.lines.push([{x: e.clientX, y: e.clientY}])
            document.addEventListener('mousemove', move)
        })
        document.addEventListener('mouseup', function () {
            document.removeEventListener('mousemove', move)
        })
    }
    Painter.undo = function () {
        Painter.lines.pop()
        Painter.canvas.width = Painter._options.width
        Painter.canvas.height = Painter._options.height
        Painter.lines.forEach((value) => {
            Painter.ctx.moveTo(value[0].x, value[0].y);
            value.forEach((val) => {
                Painter.ctx.lineTo(val.x, val.y)
                Painter.ctx.stroke();
            })
        })
    }
    function move(e) {
        if (e.clientX < 0 || e.clientY < 0) {
            return
        }
        var index = Painter.lines.length - 1
        Painter.lines[index].push({x: e.clientX, y: e.clientY})
        Painter.ctx.lineTo(e.clientX, e.clientY);
        Painter.ctx.stroke();
    }

})(window)

module.exports = {
    Painter
}