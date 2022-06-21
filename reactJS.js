class CollisionElements extends React.Component{
    constructor(props){
        super(props)
        this.place1Ref = React.createRef()
        this.place2Ref = React.createRef()
        this.place3Ref = React.createRef()
        this.state = {
            isDraggingCard:false,
            place1occ:'',
            place2occ:'',
            place3occ:'',
            hand:'',
        }
    }

    // collision(e){
    //     console.log(e.target.parentElement.parentElement.children[1].children[0].children[0].children); //массив кардхолдеров
    //     // console.log(e.target.parentElement.parentElement.children[1].children[0].children[0].children[0].children[0].getBoundingClientRect()); //обращение к конкретной карточке
    //                 // e.target.parentElement.parentElement.children[1].children[0].children[0].children.map(cardholder=>{
    //                 //     console.log(cardholder);
    //                 // })
    //     for (let i = 0; i < e.target.parentElement.parentElement.children[1].children[0].children[0].children.length; i++) {
    //         console.log(e.target.parentElement.parentElement.children[1].children[0].children[0].children[i]);
    //     }
    //     // if (isDraggingCard === true) {
            
    //     // }
    //     // React.Children.map(children=>{console.log(children);})
    // }
    
    updateData = (value, occupancy, cardName) => {
        this.setState({isDraggingCard: value})
        if (occupancy === "num1") {
            this.setState({place1occ:cardName})
        }if (occupancy === "num2") {
            this.setState({place2occ:cardName})
        }if (occupancy === "num3") {
            this.setState({place3occ:cardName})
        }if (occupancy === "hand") {
            this.setState({place3occ:cardName})
        }
        console.log(this.state.place1occ);
        console.log(this.state.place2occ);
        console.log(this.state.place3occ);
    }

    render(){
        const Places = <div id="CardPlaces">
            <div ref={this.place1Ref} className="place num1"><p unselectable="on">1</p></div>
            <div ref={this.place2Ref} className="place num2"><p unselectable="on">2</p></div>
            <div ref={this.place3Ref} className="place num3"><p unselectable="on">3</p></div>
        </div>
        return <div id="dragArea">
            <div id="up">
                <div className="item_1">1</div>
                <div className="info">
                    <ul><strong>Rules</strong>
                        <li>You cant use space while naming your card</li>
                        <li>You cant create cards with the same names</li>
                    </ul>
                </div>
                <div className="item_2" onClick={(e)=>this.collision(e)}>2</div>
            </div>
            <div id="down">
                {Places}
                <CreateCardBtn updateData={this.updateData} placeLoc={[this.place1Ref,this.place2Ref,this.place3Ref]} placeOccup={[this.state.place1occ,this.state.place2occ,this.state.place3occ]}/>
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
                    cardTitle:"Example"
                },
            ],
            count:1,
            cardTypes:["Magician", "Hermit"],
            value: "",
            typeValue: "Magician",
            deleteValue:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDeleteChange = this.handleDeleteChange.bind(this);
        this.typeChange = this.typeChange.bind(this);
        this.addToArchive = this.addToArchive.bind(this);
        this.deleteFromArchive = this.deleteFromArchive.bind(this);
    }

    addToArchive(type, title){
        if (this.state.value != "" && !this.state.value.includes(" ")) {
            this.setState({value:" "})
            const arr = this.state.archive
            arr.push({
                cardType: type,
                cardTitle: title
            })
            this.setState({archive: arr})
            this.createCard
        }else{
            return alert('Check the rules!')
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

    typeChange(event){
        this.setState({
            typeValue: event.target.value
        })
    }

    sayHello(){
        console.log('hello');
    }

    render(){
        const typeMap = this.state.cardTypes.map((type)=>{
            return <option value={type} key={type}>{type}</option>
        })
        const existingCards = this.state.archive.map((title)=>{
            return <option value={title.cardTitle} key={title.cardTitle}>{title.cardTitle}</option>
        })
        const creation = this.state.archive.map(card=>{
            if (card.cardType === "Magician") {
                this.state.count += 1
                return <ColCard name={card.cardTitle} key={card.cardTitle} updateData={this.props.updateData} placeLoc={this.props.placeLoc} placeOccup={this.props.placeOccup} cardsInHand={this.state.count}/>
            }
            if (card.cardType === "Hermit") {
                this.state.count += 1
                return <FatCard name={card.cardTitle} key={card.cardTitle} updateData={this.props.updateData} placeLoc={this.props.placeLoc} placeOccup={this.props.placeOccup} cardsInHand={this.state.count}/>
            }
        })
        const titleInput = this.state.value
        const typeInput = this.state.typeValue
        return <div id="cards">
            <div className="cardContainer">
                {creation}
            </div>
            <div className="createCardBox">
                <button onClick={()=>this.addToArchive(typeInput, titleInput)} className="createCardBtn">Create Card</button>
                <input onChange={this.handleChange} className="props.nameInput" type="text" placeholder={this.state.value} autoFocus></input>
                <select onChange={this.typeChange} name="cardType" id="createcardType">{typeMap}</select>
                <div className="deleteCard">
                    <button onClick={this.deleteFromArchive} className="deleteCardBtn">Delete Card</button>
                    <select onChange={this.handleDeleteChange} name="deleteCardType" id="deleteCardType">{existingCards}</select>
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
            isDragging: false,
            initialPos: {left: (window.innerWidth / 2)+(this.props.cardsInHand*10), top: window.innerHeight - 250},
            placeSelector: false,
            place: '',
        }
    }

    onDragStart = (event) => {
        if (event.type === "mousedown") {
            this.setState({isDragging: true})
        }
    }

    onDrag = (event) => {
        if (this.state.isDragging === true) {
            // this.setState({
            //     initialPos:{
            //         left: event.clientX - 66,
            //         top: event.clientY - 121
            //     }
            // })
            if (this.state.place === "num1") {
                this.setState({initialPos:{left: this.props.placeLoc[0].current.getBoundingClientRect().x, top: this.props.placeLoc[0].current.getBoundingClientRect().y}})
            }if (this.state.place === "num2") {
                this.setState({initialPos:{left: this.props.placeLoc[1].current.getBoundingClientRect().x, top: this.props.placeLoc[1].current.getBoundingClientRect().y}})
            }if (this.state.place === "num3") {
                this.setState({initialPos:{left: this.props.placeLoc[2].current.getBoundingClientRect().x, top: this.props.placeLoc[2].current.getBoundingClientRect().y}})
            }
            this.props.updateData(this.state.isDragging, this.state.place, this.props.name)
        }
    }

    // onDragStop = (event) => {
    //     if (event.type === "mouseup") {
    //         if (this.state.isDragging === true) {
    //             this.setState({isDragging: false})
    //             if (this.state.place === "num1") {
    //                 this.setState({initialPos:{left: this.props.placeLoc[0].current.getBoundingClientRect().x, top: this.props.placeLoc[0].current.getBoundingClientRect().y}})
    //             }if (this.state.place === "num2") {
    //                 this.setState({initialPos:{left: this.props.placeLoc[1].current.getBoundingClientRect().x, top: this.props.placeLoc[1].current.getBoundingClientRect().y}})
    //             }if (this.state.place === "num3") {
    //                 this.setState({initialPos:{left: this.props.placeLoc[2].current.getBoundingClientRect().x, top: this.props.placeLoc[2].current.getBoundingClientRect().y}})
    //             }
    //         }
    //     }
    // }

    CardPlaceSelect = (event) => {
        if (this.state.placeSelector === false) {
            this.setState({placeSelector: true})
        }else{
            this.setState({placeSelector: false})
        }
    }

    btnPlaceSelect = (place) => {
        if (place === "1") {
            if (this.props.placeOccup[0] === this.props.name) {
                return
            }if (this.props.placeOccup[0] != '') {
                return alert("Place is occupied")
            }
            this.setState({initialPos:{left: this.props.placeLoc[0].current.getBoundingClientRect().x, top: this.props.placeLoc[0].current.getBoundingClientRect().y}})
            this.props.updateData(null, this.state.place, '')
            this.setState({place: "num1"})
        }
        if (place === "2") {
            if (this.props.placeOccup[1] === this.props.name) {
                return
            }if (this.props.placeOccup[1] != '') {
                return alert("Place is occupied")
            }
            this.setState({initialPos:{left: this.props.placeLoc[1].current.getBoundingClientRect().x, top: this.props.placeLoc[1].current.getBoundingClientRect().y}})
            this.props.updateData(null, this.state.place, '')
            this.setState({place: "num2"})
        }
        if (place === "3") {
            if (this.props.placeOccup[2] === this.props.name) {
                return
            }if (this.props.placeOccup[2] != '') {
                return alert("Place is occupied")
            }
            this.setState({initialPos:{left: this.props.placeLoc[2].current.getBoundingClientRect().x, top: this.props.placeLoc[2].current.getBoundingClientRect().y}})
            this.props.updateData(null, this.state.place, '')
            this.setState({place: "num3"})
        } if (place === "Hand") {
            this.setState({initialPos:{left: window.innerWidth/2, top: window.innerHeight}})
            this.props.updateData(null, this.state.place, '')
            this.setState({place: "Hand"})
        }
    }

    sayHello = () => {
        console.log('hello');
    }

    render(){
        const chooseWindow = <div className="chooseWindow">
            <button onClick={()=>this.btnPlaceSelect("1")}>1</button>
            <button onClick={()=>this.btnPlaceSelect("2")}>2</button>
            <button onClick={()=>this.btnPlaceSelect("3")}>3</button>
            <button onClick={()=>this.btnPlaceSelect("Hand")}>Hand</button>
        </div>
        return <div className={`cardholder cardholder-${this.props.name}`}>
            <div style={this.state.initialPos} className={`card Mg card-${this.props.name} ${this.state.place} ${this.state.placeSelector?"active":""}`} onMouseDown={this.onDragStart} onMouseMove={this.onDrag} onMouseUp={this.onDragStop} onClick={this.CardPlaceSelect}>
                <h2 unselectable="on">{this.props.name}</h2>
                <img draggable="false" unselectable="on" src="/img/cardIMG0.png" alt="" />
                <p unselectable="on">Description</p>
                {this.state.placeSelector?chooseWindow:null}
            </div>
        </div>
    }
}

class FatCard extends ColCard{
    render(){
        const chooseWindow = <div className="chooseWindow">
            <button onClick={()=>this.btnPlaceSelect("1")}>1</button>
            <button onClick={()=>this.btnPlaceSelect("2")}>2</button>
            <button onClick={()=>this.btnPlaceSelect("3")}>3</button>
        </div>
        return <div className={`cardholder cardholder-${this.props.name}`}>
            <div style={this.state.initialPos} className={`card Hm card-${this.props.name} ${this.state.placeSelector?"active":''}`} onMouseDown={this.onDragStart} onMouseMove={this.onDrag} onMouseUp={this.onDragStop} onClick={this.CardPlaceSelect}>
                <h2 unselectable="on">{this.props.name}</h2>
                <img draggable="false" unselectable="on" src="/img/cardIMG1.png" alt="" />
                <p unselectable="on" draggable="false">Description</p>
                {this.state.placeSelector?chooseWindow:null}
            </div>
        </div>
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CollisionElements />);