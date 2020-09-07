function centered_clock() {
    setInterval(() => {
        let d = new Date()
        arrow(canvas.width/2,canvas.height/2,2*Math.PI*d.getSeconds()/(60),200)
        console.log(d.getSeconds())
    }, 1000);
}

function general_clock() {
setInterval(() => {
    let d = new Date()
    for (let i = 0; i < canvas.width/10; i++) {
        for (let j = 0; j < canvas.height/10; j++) {
            arrow(10*i,10*j,2*Math.PI*d.getSeconds()/(60),10)
        }
    }            
    }, 1000);
}

let xclick; let yclick; const rect = canvas.getBoundingClientRect(); min_radius =35

canvas.addEventListener('mousedown', function(e) {
    const rect = canvas.getBoundingClientRect()
  xclick = event.clientX - rect.left
  yclick = event.clientY - rect.top
  holdstart = Date.now()
  grow_anim = setInterval(() => {
    ctx.moveTo(xclick,yclick)
    ctx.arc(xclick,yclick,((Date.now()-holdstart)/100)**2,0,2*Math.PI,false)
    ctx.fillStyle = 'white'
    ctx.fill()
  }, 50);
})
canvas.addEventListener('mouseup', function(e) {
    clearInterval(grow_anim)
    const xlift = e.clientX - rect.left
    const ylift = e.clientY - rect.top
    holdtime = Date.now() - holdstart
    charges.push(new Particle(xclick,yclick,-1,(holdtime/100)**2 > min_radius ? (holdtime/100)**2 : min_radius))
    redrawStart = Date.now()
    canvas.height = window.innerHeight;
    fieldVectors(10)
    charges.forEach( (c) => c.draw())
    squares()
    redrawEnd = Date.now()-redrawStart; //console.log(redrawEnd)
})
function arrow(x,y,angle,length) {
    cnorm = 10
    ctx.beginPath()
    ctx.strokeStyle = multicolorLI(colors,length/cnorm)//heatmap(length) //red, "blue", pink, yellow, magenta, lightblue
    ctx.moveTo(x,y)
    head = {"x":x+Math.cos(angle)*length,"y":y+Math.sin(angle)*length}
    ctx.lineTo(head["x"],head["y"])
    ctx.moveTo(head["x"],head["y"])
    ctx.lineTo(head["x"]-length/10*Math.cos(angle-Math.PI/7),head["y"]-length/10*Math.sin(angle-Math.PI/7));
    ctx.moveTo(head["x"],head["y"])
    ctx.lineTo(head["x"]-length/10*Math.cos(angle+Math.PI/7),head["y"]-length/10*Math.sin(angle+Math.PI/7));
    ctx.stroke()
    ctx.closePath();
}

function coulombs(x,y) {
    E_x = 0
    E_y = 0
    for (let c = 0; c < charges.length; c++) {
        r = Math.hypot(charges[c].x-x,charges[c].y-y)
        if(r<=charges[c].r) {return [0,0]}
        E_f = -k * charges[c].q / Math.hypot(charges[c].x-x,charges[c].y-y)**2
        if(E_f>min_radius) {return [0,0]}
        E_angle = Math.atan2(charges[c].y-y,charges[c].x-x)
        E_x += E_f*Math.cos(E_angle)
        E_y += E_f*Math.sin(E_angle)
    }
    return [Math.hypot(E_x,E_y),Math.atan2(E_y,E_x)]
}

// function heatmap(length) {
//     length /= 10
//     let r = 255*Math.E**(-30*(length-0.75)**2)*0.18
//     let g = 255*0.025*Math.E**(3.7*length)-0.011
//     let b = 255*0.1*Math.E**(2.3*length)
//     return `rgb(${r},${g},${b})`
// }
// {
//     '0.0': 'rgb(0, 0, 0)',
//     '0.6': 'rgb(24, 53, 103)',
//     '0.75': 'rgb(46, 100, 158)',
//     '0.9': 'rgb(23, 173, 203)',
//     '1.0': 'rgb(0, 250, 250)'
//   }
function createColors(n) {
    colors = []
    for (let z = 0; z < n; z++) {
        colors.push({pos:z/(n-1),r:255*Math.random(),g:255*Math.random(),b:255*Math.random()})
    }
    return colors
}
colors = colors = [{pos:0,r:0,g:0,b:128},{pos:0.25,r:0,g:0,b:255},{pos:0.5,r:0,g:128,b:0},{pos:0.75,r:255,g:255,b:0},{pos:1,r:255,g:0,b:0}]
// THE DEEP SEA //colors = [{pos:0,r:0,g:0,b:0},{pos:0.6,r:24,g:53,b:103},{pos:0.75,r:46,g:100,b:158},{pos:0.9,r:23,g:173,b:203},{pos:1,r:0,g:250,b:250}]
//createColors(3) // 
// Limes {pos: 0, r: 220.2555605764494, g: 230.2238824926048, b: 173.90893376849738} {pos: 0.5, r: 54.90989578912338, g: 94.27180985182585, b: 68.58766260088424} {pos: 1, r: 88.22963197958657, g: 202.17550324333436, b: 78.89412885326719}
// Hot Metal {pos: 0, r: 29.86072861803282, g: 113.85218851308274, b: 215.9310046106617}, {pos: 1, r: 233.41059977908586, g: 20.219479643362824, b: 149.01537026253223}
// Low Light {pos: 0, r: 36.17625669443393, g: 131.52737723744187, b: 177.09895342564502}, {pos: 1, r: 131.3450201032622, g: 223.72663911943567, b: 197.34461900009273}
// Burning Marshmellow {pos: 0, r: 42.98276128814366, g: 48.76525980818683, b: 216.14172749778896}, {pos: 1, r: 249.25656475119, g: 133.89902818459726, b: 125.98892774186332}
//Auburn Sky {pos: 0, r: 42.53466139880456, g: 130.75566924868707, b: 162.00254515226962}, {pos: 1, r: 247.41371770768376, g: 177.51491988366612, b: 5.739008698156539}
// Blue to Purple {pos: 0, r: 101.77830042769926, g: 193.57369274420654, b: 202.19111562770658}, {pos: 1, r: 224.7362324332808, g: 120.50941864165283, b: 247.5619259529917}
// Purple to Pink {pos: 0, r: 56.39638437380586, g: 34.5212426799729, b: 127.77445481256902}, {pos: 1, r: 151.28010308562617, g: 38.44819710368858, b: 153.04746278862075}
// Purple Lanterns {pos: 0, r: 61.25897806464936, g: 10.064433636328467, b: 99.21797569522501}, {pos: 1, r: 185.43037901348532, g: 62.27853361484391, b: 245.36932403136538}

function linearInterpolation(colors,length) {

    let r = (colors[1]["r"]-colors[0]["r"])/(colors[1]["pos"]-colors[0]["pos"])*length + colors[0]["r"]
    let g = (colors[1]["g"]-colors[0]["g"])/(colors[1]["pos"]-colors[0]["pos"])*length + colors[0]["g"]
    let b = (colors[1]["b"]-colors[0]["b"])/(colors[1]["pos"]-colors[0]["pos"])*length + colors[0]["b"]

    return `rgb(${r},${g},${b})`
}

// colors = [{pos:0,r:0,g:0,b:128},{pos:0.25,r:0,g:0,b:255},{pos:0.5,r:0,g:128,b:0},{pos:0.75,r:255,g:255,b:0},{pos:255,r:0,g:0,b:0}]
// {
//     '0': 'Navy', #000080
//     '0.25': 'Blue', #0000ff
//     '0.5': 'Green', #008000
//     '0.75': 'Yellow', #ffff00
//     '1': 'Red' #ff0000
//   }

function multicolorLI(colors,length) {
    //length /= 10 //20
    for (let c = colors.length-2; c >= 0; c--) {
        if(length>colors[c]["pos"]) {
            //console.log(colors[c]["pos"])
            return linearInterpolation(colors.slice(c,c+2),length-colors[c]["pos"])
        }
        
    }

}

h=0
function palette(func) {
    //colors = createColors(3)
    for(i=canvas.width;i>0;i--){
        ctx.fillStyle=func(colors,i/canvas.width)
        ctx.fillRect(0,100*h,i,100)
        }
        h++
}

function squares() {
    for(i=0;i<colors.length;i++){
        ctx.fillStyle = `rgb(${colors[i]["r"]},${colors[i]["g"]},${colors[i]["b"]})`
        ctx.fillRect(100*i,0,100,100)
        }
}

function drawGradientBorder() {
    for(i=canvas.width;i>0;i--){
        ctx.fillStyle=multicolorLI(colors,10*i/canvas.width)
        ctx.fillRect(canvas.width-100,0,100,i)
        }
    for(i=canvas.width;i>0;i--){
        ctx.fillStyle=multicolorLI(colors,10*i/canvas.width)
        ctx.fillRect(0,0,100,i)
        }
    for(i=canvas.width;i>0;i--){
        ctx.fillStyle=multicolorLI(colors,10*i/canvas.width)
        ctx.fillRect(0,canvas.height-100,i,100)
        }
    for(i=canvas.width;i>0;i--){
        ctx.fillStyle=multicolorLI(colors,10*i/canvas.width)
        ctx.fillRect(0,0,i,100)
        }
}