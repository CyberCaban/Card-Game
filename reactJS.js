class CollisionElements extends React.Component{
    constructor(props){
        super(props)
        this.place1Ref = React.createRef()
        this.opp1Ref = React.createRef()
        this.place2Ref = React.createRef()
        this.opp2Ref = React.createRef()
        this.place3Ref = React.createRef()
        this.opp3Ref = React.createRef()
        this.state = {
            place1occ:'',
            place2occ:'',
            place3occ:'',
            hand:'',
            opponent:false
        }
    }
    
    updateData = (occupancy, cardName) => {
        if (occupancy === "num1") {
            this.setState({place1occ:cardName})
        }if (occupancy === "num2") {
            this.setState({place2occ:cardName})
        }if (occupancy === "num3") {
            this.setState({place3occ:cardName})
        }if (occupancy === "hand") {
            this.setState({hand:cardName})
        }
    }

    opponent = () => {
        {!this.state.opponent?this.setState({opponent:true}):this.setState({opponent:false})}
        console.log(this.state.opponent);
    }

    render(){
        const Places = <div id="CardPlaces">
            <div ref={this.place1Ref} className="place num1"><p unselectable="on">1</p></div>
            <div ref={this.place2Ref} className="place num2"><p unselectable="on">2</p></div>
            <div ref={this.place3Ref} className="place num3"><p unselectable="on">3</p></div>
        </div>
        const opponentField = <div id="opponentField">
            <div ref={this.opp3Ref} className="place num3"><p unselectable="on">3</p></div>
            <div ref={this.opp2Ref} className="place num2"><p unselectable="on">2</p></div>
            <div ref={this.opp1Ref} className="place num1"><p unselectable="on">1</p></div>
        </div>
        return <div id="dragArea">
            <div id="up">
                <div className="navbar">
                    <div className="item_1">1</div>
                    <div className="info">
                        <ul><strong>Rules</strong>
                            <li>You cant use space while naming your card</li>
                            <li>You cant create cards with the same names</li>
                        </ul>
                    </div>
                    <div className="item_2" onClick={this.opponent}>2</div>
                </div>
                <div className="wrapper">
                    <div className="filler"></div>
                    {this.state.opponent?opponentField:null}
                </div>
            </div>
            <div id="down">
                <CreateCardBtn updateData={this.updateData} placeLoc={[this.place1Ref,this.place2Ref,this.place3Ref]} placeOccup={[this.state.place1occ,this.state.place2occ,this.state.place3occ]}/>
                {Places}
            </div>
        </div>
    }
}

class CreateCardBtn extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            archive:[
                {
                    cardType:"Magician",
                    cardTitle:"Example",
                    atk:1,
                    def:1,
                },
            ],
            cardTypes:["Magician", "Hermit"],
            value: "",
            typeValue: "Magician",
            deleteValue:'',
            atkValue:1,
            defValue:1,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDeleteChange = this.handleDeleteChange.bind(this);
        this.typeChange = this.typeChange.bind(this);
        this.addToArchive = this.addToArchive.bind(this);
        this.deleteFromArchive = this.deleteFromArchive.bind(this);
        this.handleAtkChange = this.handleAtkChange.bind(this);
        this.handleDefChange = this.handleDefChange.bind(this);
    }

    addToArchive(type, title, atk, def){
        if (this.state.value != "" && !this.state.value.includes(" ")) {
            if (this.state.archive.find(card => card.cardTitle) == undefined && !this.state.archive) {
                return
                alert("Check the rules!")
            }
            this.setState({value:" "})
            const arr = this.state.archive
            arr.push({
                cardType: type,
                cardTitle: title,
                atk: atk,
                def:def
            })
            this.setState({archive: arr})
        }else{
            return
            alert("Check the rules!")
        }
    }

    deleteFromArchive(){
        const arr = this.state.archive
        arr.splice(arr.findIndex(card => card.cardTitle === this.state.deleteValue), 1)
        this.setState({
            archive:arr
        })
    }

    handleDeleteChange(event){
        this.setState({
            deleteValue: event.target.value
        })
    }

    handleChange(event){
        this.setState({
            value: event.target.value
        })
    }

    handleAtkChange(event){
        this.setState({
            atkValue: event.target.value
        })
    }

    handleDefChange(event){
        this.setState({
            defValue: event.target.value
        })
    }

    typeChange(event){
        this.setState({
            typeValue: event.target.value
        })
    }

    render(){
        const typeMap = this.state.cardTypes.map((type)=>{
            return <option value={type} key={type}>{type}</option>
        })
        const existingCards = this.state.archive.map((title)=>{
            return <option value={title.cardTitle} key={title.cardTitle}>{title.cardTitle}</option>
        })
        const creation = this.state.archive.map((card, index)=>{
            if (card.cardType === "Magician") {
                // return <ResizeHandler name={card.cardTitle} atk={card.atk} def={card.def} key={card.cardTitle} updateData={this.props.updateData} placeLoc={this.props.placeLoc} placeOccup={this.props.placeOccup} cardsInHand={index*20}/> 
                return <ColCard name={card.cardTitle} atk={card.atk} def={card.def} key={card.cardTitle} updateData={this.props.updateData} placeLoc={this.props.placeLoc} placeOccup={this.props.placeOccup} cardsInHand={index*20}/>
            }
            if (card.cardType === "Hermit") {
                return <FatCard name={card.cardTitle} atk={card.atk} def={card.def} key={card.cardTitle} updateData={this.props.updateData} placeLoc={this.props.placeLoc} placeOccup={this.props.placeOccup} cardsInHand={index*20}/>
            }
        })
        const titleInput = this.state.value
        const typeInput = this.state.typeValue
        const atkInput = this.state.atkValue
        const defInput = this.state.defValue
        return <div id="cards">
            <div className="cardContainer">
                {creation}
            </div>
            <div className="createCardBox">
                <p className="CCBText">Name The Card</p>
                <input onChange={this.handleChange} className="props.nameInput" type="text" placeholder={this.state.value} autoFocus></input>
                <p className="CCBText">ATKPower</p>
                <input onChange={this.handleAtkChange} type="number" min="0" max="99" placeholder="1"></input>
                <p className="CCBText">DEFPower</p>
                <input onChange={this.handleDefChange} type="number" min="0" max="99" placeholder="1"></input>
                <p className="CCBText">Card Type</p>
                <select onChange={this.typeChange} name="cardType" id="createcardType">{typeMap}</select>
                <button onClick={()=>this.addToArchive(typeInput, titleInput, atkInput, defInput)} className="createCardBtn">Create Card</button>
                <div className="deleteCard">
                    <select onChange={this.handleDeleteChange} name="deleteCardType" id="deleteCardType">{existingCards}</select>
                    <button onClick={this.deleteFromArchive} className="deleteCardBtn">Delete Card</button>
                </div>
            </div>
        </div>   
    }
}

class ColCard extends React.Component{
    constructor(props){
        super(props)
        this.x
        this.y
        this.state = {
            initialPos: {left: (window.innerWidth * 0.15)+(this.props.cardsInHand), top: window.innerHeight - 250},
            placeSelector: false,
            place: '',
            canAtk: false,
            placeAttackSelector:false,
        }
    }

    onDrag = (event) => {
        this.props.updateData(this.state.place, this.props.name)
        this.setState({
            initialPos:{
                left: (window.innerWidth * 0.15)+(this.props.cardsInHand),
                top: window.innerHeight - 250
            }
        })
        if (this.state.place === "num1") {
            this.setState({initialPos:{left: this.props.placeLoc[0].current.getBoundingClientRect().x, top: this.props.placeLoc[0].current.getBoundingClientRect().y}})
        }if (this.state.place === "num2") {
            this.setState({initialPos:{left: this.props.placeLoc[1].current.getBoundingClientRect().x, top: this.props.placeLoc[1].current.getBoundingClientRect().y}})
        }if (this.state.place === "num3") {
            this.setState({initialPos:{left: this.props.placeLoc[2].current.getBoundingClientRect().x, top: this.props.placeLoc[2].current.getBoundingClientRect().y}})
        }
    }

    CardPlaceSelect = (event) => {
        if (this.state.placeSelector === false) {
            this.setState({placeSelector: true})
        }else{
            this.setState({placeSelector: false})
        }
        // this.setState({placeAttackSelector:false})
    }

    btnPlaceSelect = (place) => {
        if (place === "move1") {
            if (this.props.placeOccup[0] === this.props.name) {
                return
            }if (this.props.placeOccup[0] != '') {
                return 
                alert("Place is occupied")
            }
            this.setState({initialPos:{left: this.props.placeLoc[0].current.getBoundingClientRect().x, top: this.props.placeLoc[0].current.getBoundingClientRect().y}})
            this.props.updateData(this.state.place, '')
            this.setState({place: "num1", canAtk:true})
        }
        if (place === "move2") {
            if (this.props.placeOccup[1] === this.props.name) {
                return
            }if (this.props.placeOccup[1] != '') {
                return
                alert("Place is occupied")
            }
            this.setState({initialPos:{left: this.props.placeLoc[1].current.getBoundingClientRect().x, top: this.props.placeLoc[1].current.getBoundingClientRect().y}})
            this.props.updateData(this.state.place, '')
            this.setState({place: "num2", canAtk:true})
        }
        if (place === "move3") {
            if (this.props.placeOccup[2] === this.props.name) {
                return
            }if (this.props.placeOccup[2] != '') {
                return 
                alert("Place is occupied")
            }
            this.setState({initialPos:{left: this.props.placeLoc[2].current.getBoundingClientRect().x, top: this.props.placeLoc[2].current.getBoundingClientRect().y}})
            this.props.updateData(this.state.place, '')
            this.setState({place: "num3", canAtk:true})
        } if (place === "Hand") {
            this.setState({initialPos:{left: (window.innerWidth * 0.15)+(this.props.cardsInHand), top: window.innerHeight - 250}})
            this.props.updateData(this.state.place, '')
            this.setState({place: "Hand", canAtk:false})
        }if (place === "Attack") {
            this.setState({placeAttackSelector:true})
        }if (place === "Back") {
            this.setState({placeAttackSelector:false})
        }
    }

    render(){
        const chooseWindow = <div className="chooseWindow">
            <button onClick={()=>this.btnPlaceSelect("move1")}>1</button>
            <button onClick={()=>this.btnPlaceSelect("move2")}>2</button>
            <button onClick={()=>this.btnPlaceSelect("move3")}>3</button>
            {this.state.canAtk?<button onClick={()=>this.btnPlaceSelect("Attack")}>Attack</button>:null}
            <button onClick={()=>this.btnPlaceSelect("Hand")}>Hand</button>
        </div>
        const attackWindow = <div className="attackWindow">
            <button onClick={()=>this.btnPlaceSelect("atk1")}>Attack 1</button>
            <button onClick={()=>this.btnPlaceSelect("atk2")}>Attack 2</button>
            <button onClick={()=>this.btnPlaceSelect("atk3")}>Attack 3</button>
            <button onClick={()=>this.btnPlaceSelect("Back")}>Back</button>
        </div>
        return <div className={`cardholder cardholder-${this.props.name}`}>
            <div style={this.state.initialPos} className={`card Mg card-${this.props.name} ${this.state.place} ${this.state.placeSelector?"active":""}`} onMouseDown={this.onDragStart} onMouseMove={this.onDrag} onMouseUp={this.onDragStop} onClick={this.CardPlaceSelect}>
                <h2 unselectable="on">{this.props.name}</h2>
                <img draggable="false" unselectable="on" src="/img/cardIMG0.png" alt="" />
                <div className="cardProperties">
                    <p unselectable="on">Description</p>
                    <div className="powers">
                        <div className="atkPower">
                            <p>{this.props.atk}</p>
                        </div>
                        <div className="defPower">
                            <p>{this.props.def}</p>
                        </div>
                    </div>
                </div>
                {this.state.placeSelector?chooseWindow:null}
                {this.state.placeAttackSelector?attackWindow:null}
            </div>
        </div>
    }
}

class FatCard extends ColCard{
    render(){
        const chooseWindow = <div className="chooseWindow">
            <button onClick={()=>this.btnPlaceSelect("move1")}>1</button>
            <button onClick={()=>this.btnPlaceSelect("move2")}>2</button>
            <button onClick={()=>this.btnPlaceSelect("move3")}>3</button>
            {this.state.canAtk?<button onClick={()=>this.btnPlaceSelect("Attack")}>Attack</button>:null}
            <button onClick={()=>this.btnPlaceSelect("Hand")}>Hand</button>
        </div>
        const attackWindow = <div className="attackWindow">
            <button onClick={()=>this.btnPlaceSelect("atk1")}>Attack 1</button>
            <button onClick={()=>this.btnPlaceSelect("atk2")}>Attack 2</button>
            <button onClick={()=>this.btnPlaceSelect("atk3")}>Attack 3</button>
            <button onClick={()=>this.btnPlaceSelect("Back")}>Back</button>
        </div>
        return <div className={`cardholder cardholder-${this.props.name}`}>
            <div style={this.state.initialPos} className={`card Hm card-${this.props.name} ${this.state.place} ${this.state.placeSelector?"active":""}`} onMouseDown={this.onDragStart} onMouseMove={this.onDrag} onMouseUp={this.onDragStop} onClick={this.CardPlaceSelect}>
                <h2 unselectable="on">{this.props.name}</h2>
                <img draggable="false" unselectable="on" src="/img/cardIMG1.png" alt="" />
                <div className="cardProperties">
                    <p unselectable="on">Description</p>
                    <div className="powers">
                        <div className="atkPower">
                            <p>{this.props.atk}</p>
                        </div>
                        <div className="defPower">
                            <p>{this.props.def}</p>
                        </div>
                    </div>
                </div>
                {this.state.placeSelector?chooseWindow:null}
                {this.state.placeAttackSelector?attackWindow:null}
            </div>
        </div>
    }
}



// function debounce(fn, ms) {
//     let timer
//     return _ => {
//         clearTimeout(timer)
//         timer = setTimeout(_ => {
//             timer = null
//             fn.apply(this, arguments)
//         }, ms)
//     };
// }
// function ResizeHandler(card) {
//     React.useEffect(() => {
//         const debouncedHandleResize = debounce(function handleResize() {
//             console.log(card.name);
//         }, 100)
//         window.addEventListener('resize', debouncedHandleResize)
//         return _ => {
//             window.removeEventListener('resize', debouncedHandleResize)
//         }
//     })
//     return <ColCard name={card.name} atk={card.atk} def={card.def} key={card.key} updateData={card.updateData} placeLoc={card.placeLoc} placeOccup={card.placeOccup} cardsInHand={card.cardsInHand}/>
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CollisionElements />);