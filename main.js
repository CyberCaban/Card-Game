// const card = document.querySelector(".card")
const cards = document.querySelector(".cards")
const item_1 = document.querySelector(".item_1")
const item_2 = document.querySelector(".item_2")
const item_3 = document.querySelector(".item_3")
const item_4 = document.querySelector(".item_4")
const info = document.querySelector(".info")


let data;
// let key = card.getBoundingClientRect().x && card.getBoundingClientRect().y

class ColCard {
    constructor(name){
        this.isDragging = false
        this.x
        this.y
        this.cardname = name
    }
    
    createCard(){
        cards.insertAdjacentHTML('beforeend', `<div class="cardholder cardholder${this.cardname}">
            <div class="card card${this.cardname}">
                <h1>${this.cardname}</h1>
            </div>
        </div>`)
        this.card = document.querySelector(`.card${this.cardname}`)
        this.card.style.backgroundImage = "url(/img/card.png)"
    }

    collision(){
        if (item_1.getBoundingClientRect().left + item_1.getBoundingClientRect().width >= this.card.getBoundingClientRect().left &&
        item_1.getBoundingClientRect().top + item_1.getBoundingClientRect().height >= this.card.getBoundingClientRect().top &&
        item_1.getBoundingClientRect().bottom - item_1.getBoundingClientRect().height <= this.card.getBoundingClientRect().bottom &&
        item_1.getBoundingClientRect().right - item_1.getBoundingClientRect().width <= this.card.getBoundingClientRect().right) {
            data = '1'
        }else{
            data = 'Field'
        }
        if (item_2.getBoundingClientRect().left + item_2.getBoundingClientRect().width >= this.card.getBoundingClientRect().left &&
        item_2.getBoundingClientRect().top + item_2.getBoundingClientRect().height >= this.card.getBoundingClientRect().top &&
        item_2.getBoundingClientRect().bottom - item_2.getBoundingClientRect().height <= this.card.getBoundingClientRect().bottom &&
        item_2.getBoundingClientRect().right - item_2.getBoundingClientRect().width <= this.card.getBoundingClientRect().right) {
            data = '2'
        }
        // if (item_3.getBoundingClientRect().left + item_3.getBoundingClientRect().width >= this.card.getBoundingClientRect().left &&
        // item_3.getBoundingClientRect().top + item_3.getBoundingClientRect().height >= this.card.getBoundingClientRect().top &&
        // item_3.getBoundingClientRect().bottom - item_3.getBoundingClientRect().height <= this.card.getBoundingClientRect().bottom &&
        // item_3.getBoundingClientRect().right - item_3.getBoundingClientRect().width <= this.card.getBoundingClientRect().right) {
        //     data = '3'
        // }
        // if (item_4.getBoundingClientRect().left + item_4.getBoundingClientRect().width >= this.card.getBoundingClientRect().left &&
        // item_4.getBoundingClientRect().top + item_4.getBoundingClientRect().height >= this.card.getBoundingClientRect().top &&
        // item_4.getBoundingClientRect().bottom - item_4.getBoundingClientRect().height <= this.card.getBoundingClientRect().bottom &&
        // item_4.getBoundingClientRect().right - item_4.getBoundingClientRect().width <= this.card.getBoundingClientRect().right) {
        //     data = '4'
        // }
    }

    cardMove(){
        this.card.addEventListener("mousedown", e=>{
            this.isDragging = true
            console.log("pickedUP");
        })
        
        this.card.addEventListener("mousemove", e=>{
            if (this.isDragging === true) {
                this.x = e.clientX - 55 + 'px'
                this.y = e.clientY - 75 + 'px'
                this.card.style.left = this.x
                this.card.style.top = this.y
                // console.log(x,y,isDragging);
                info.innerHTML = `<h1>card in ${this.x},${this.y}, in ${data}</h1>`
            }
        })
        
        this.card.addEventListener("mouseup", e=>{
            if (this.isDragging === true) {
                this.collision()
                this.isDragging = false
            }
        })
    }
    
}

class FatCard extends ColCard{
    createCard(){
        cards.insertAdjacentHTML('beforeend', `<div class="cardholder cardholder${this.cardname}">
            <div class="card card${this.cardname}">
                <h1>${this.cardname}</h1>
            </div>
        </div>`)
        this.card = document.querySelector(`.card${this.cardname}`)
        this.card.style.backgroundImage = "url(/img/fatcard.png)"
    }
}

let Mycard = new ColCard("pa")
Mycard.createCard()
Mycard.cardMove()

let macard = new ColCard('ma')
macard.createCard()
macard.cardMove()

let fatCard = new FatCard('sdsd')
fatCard.createCard()
fatCard.cardMove()