const circle = document.querySelector(".circle")
const item_1 = document.querySelector(".item_1")
const item_2 = document.querySelector(".item_2")
const item_3 = document.querySelector(".item_3")
const item_4 = document.querySelector(".item_4")
const info = document.querySelector(".info")

let isDragging = false
let x;
let y;
let data;
let key = circle.getBoundingClientRect().x && circle.getBoundingClientRect().y

circle.addEventListener("mousedown", e=>{
    isDragging = true
    // console.log(x,y,isDragging);
})

circle.addEventListener("mousemove", e=>{
    if (isDragging === true) {
        x = e.clientX - 50 + 'px'
        y = e.clientY - 50 + 'px'
        circle.style.left = x
        circle.style.top = y
        // console.log(x,y,isDragging);
        info.innerHTML = `<h1>Circle in ${x},${y}, in ${data}</h1>`
        collision()
        // console.log(item_4.getBoundingClientRect(), circle.getBoundingClientRect());
    }
})

circle.addEventListener("mouseup", e=>{
    if (isDragging === true) {
        isDragging = false
    }
})

function collision(){
    if (item_1.getBoundingClientRect().left + item_1.getBoundingClientRect().width >= circle.getBoundingClientRect().left &&
    item_1.getBoundingClientRect().top + item_1.getBoundingClientRect().height >= circle.getBoundingClientRect().top &&
    item_1.getBoundingClientRect().bottom - item_1.getBoundingClientRect().height <= circle.getBoundingClientRect().bottom &&
    item_1.getBoundingClientRect().right - item_1.getBoundingClientRect().width <= circle.getBoundingClientRect().right) {
        data = '1'
    }else{
        data = 'Field'
    }
    if (item_2.getBoundingClientRect().left + item_2.getBoundingClientRect().width >= circle.getBoundingClientRect().left &&
    item_2.getBoundingClientRect().top + item_2.getBoundingClientRect().height >= circle.getBoundingClientRect().top &&
    item_2.getBoundingClientRect().bottom - item_2.getBoundingClientRect().height <= circle.getBoundingClientRect().bottom &&
    item_2.getBoundingClientRect().right - item_2.getBoundingClientRect().width <= circle.getBoundingClientRect().right) {
        data = '2'
    }
    if (item_3.getBoundingClientRect().left + item_3.getBoundingClientRect().width >= circle.getBoundingClientRect().left &&
    item_3.getBoundingClientRect().top + item_3.getBoundingClientRect().height >= circle.getBoundingClientRect().top &&
    item_3.getBoundingClientRect().bottom - item_3.getBoundingClientRect().height <= circle.getBoundingClientRect().bottom &&
    item_3.getBoundingClientRect().right - item_3.getBoundingClientRect().width <= circle.getBoundingClientRect().right) {
        data = '3'
    }
    if (item_4.getBoundingClientRect().left + item_4.getBoundingClientRect().width >= circle.getBoundingClientRect().left &&
    item_4.getBoundingClientRect().top + item_4.getBoundingClientRect().height >= circle.getBoundingClientRect().top &&
    item_4.getBoundingClientRect().bottom - item_4.getBoundingClientRect().height <= circle.getBoundingClientRect().bottom &&
    item_4.getBoundingClientRect().right - item_4.getBoundingClientRect().width <= circle.getBoundingClientRect().right) {
        data = '4'
    }
}
