// const card = document.querySelector(".card")
const cards = document.querySelector("#cards")
const createCardBox = document.querySelector(".createCardBox")
const cardTypeOp = document.querySelector("#createcardType")
const createCardBtn = document.querySelector(".createCardBtn")
const cardNameInput = document.querySelector(".cardNameInput")
const deleteCardBtn = document.querySelector(".deleteCardBtn")
const deleteCardType = document.querySelector("#deleteCardType")
const item_1 = document.querySelector(".item_1")
const item_2 = document.querySelector(".item_2")
// const item_3 = document.querySelector(".item_3")
// const item_4 = document.querySelector(".item_4")
const info = document.querySelector(".info")
const cardTypo = ["Magician","Hermit"]

let data;
let cardIndex = 0
let archive = []

for (let i = 0; i < cardTypo.length; i++) {
    cardTypeOp.insertAdjacentHTML('beforeend', `<option value="${cardTypo[i]}">${cardTypo[i]}</option>`)
}

createCardBtn.addEventListener('click', ()=>{
    if (archive.find(card => card.cardTitle === `${cardNameInput.value}`)) {
        alert('You cant create cards with the same names')
        cardNameInput.value = ""
        return
    }
    if (`${cardNameInput.value}`.includes(' ')) {
        alert('You cant use space while naming your card')
        cardNameInput.value = ""
        return
    }
    else{
        switch (cardTypeOp.value) {
            case "Magician":
                let cardIndexMg = new ColCard(`${cardNameInput.value}`)
                cardIndexMg.createCard()
                cardIndexMg.cardMove()
                archive.push({
                    type:"Magician",
                    cardTitle: `${cardNameInput.value}`,
                })
                console.log(archive);
                break;
                
            case "Hermit":
                let cardIndexHm = new FatCard(`${cardNameInput.value}`)
                cardIndexHm.createCard()
                cardIndexHm.cardMove()
                archive.push({
                    type:"Hermit",
                    cardTitle: `${cardNameInput.value}`,
                })
                break;
        }
        deleteCardType.insertAdjacentHTML('beforeend',
            `<option value="${cardNameInput.value}">${cardNameInput.value}</option>`
        )
        cardNameInput.value = ""
    }

})

deleteCardBtn.addEventListener('click', ()=>{
    archive.splice(archive.findIndex(card => card.cardTitle == `${deleteCardType.value}`), 1)
    console.log(archive);
})
            
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
        this.card.style.backgroundImage = "url(/img/00.png)"
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
            console.log(e);
        })
                
        this.card.addEventListener("mousemove", e=>{
            if (this.isDragging === true) {
                this.x = e.clientX - 55 + 'px'
                this.y = e.clientY - 75 + 'px'
                this.card.style.left = this.x
                this.card.style.top = this.y
                // console.log(x,y,isDragging);
                info.innerHTML = `<h1>card in ${this.x},${this.y}, in ${data}</h1>`
                this.collision()
            }
        })
        
        this.card.addEventListener("mouseup", e=>{
            if (this.isDragging === true) {
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
        this.card.style.backgroundImage = "url(/img/01.png)"
    }
}
