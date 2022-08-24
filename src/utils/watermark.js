let watermark = {}

let setWatermark = (str) => {
    let id = '1.23452384164.123412415'

    if (document.getElementById(id) !== null) {
        document.body.removeChild(document.getElementById(id))
    }

    let can = document.createElement('canvas')
    can.width = 200
    can.height = 120

    let cans = can.getContext('2d')
    cans.rotate(-20 * Math.PI / 180)
    cans.font = '15px Vedana'
    cans.fillStyle = 'rgba(170, 170, 170, 0.50)'
    cans.textAlign = 'middle'
    cans.textBaseline = 'Middle'
    cans.fillText(str, can.width / 20, can.height)

    let div = document.createElement('div')
    div.id = id
    div.style.pointerEvents = 'none'
    div.style.top = '3px'
    // div.style.left = '220px'
    div.style.position = 'fixed'
    div.style.zIndex = '100000'
    div.style.width = document.documentElement.clientWidth * 1 + 'px'
    div.style.height = document.documentElement.clientHeight + 'px'
    div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
    document.body.appendChild(div)
    return id
}

// 该方法只允许调用一次
watermark.set = (str) => {
    let id = setWatermark(str)
    setInterval(() => {
        if (document.getElementById(id) === null) {
            id = setWatermark(str)
        }
    }, 500)
    window.onresize = () => {
        setWatermark(str)
    }
}

const outWatermark = (id) =>{
    if(document.getElementById(id) !== null){
        const div = document.getElementById(id);
        div.style.display = 'none'
    }
}

watermark.out = () =>{
    const str = '1.23452384164.123412415'
    outWatermark(str)
}

export default watermark