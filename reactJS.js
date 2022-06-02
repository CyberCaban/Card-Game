class CreateCardBtn extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            archive:[
                {
                    cardType:"Magician",
                    cardTitle:"Example"
                }
            ],
            cardTypes:["Magician", "Hermit"],
            value: "",
            typeValue: "Magician",
            deleteValue:' '
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
            console.log(this.state.archive);
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
        // console.log(this.state.value);
    }

    typeChange(event){
        this.setState({
            typeValue: event.target.value
        })
    }

    sayHello(){
        console.log("hello");
    }

    render(){
        const typeMap = this.state.cardTypes.map((type)=>{
            return <option value={type}>{type}</option>
        })
        const existingCards = this.state.archive.map((title)=>{
            return <option value={title.cardTitle}>{title.cardTitle}</option>
        })
        const creation = this.state.archive.map(card=>{
            if (card.cardType === "Magician") {
                return <ColCard name={card.cardTitle} />
            }
            if (card.cardType === "Hermit") {
                return <FatCard name={card.cardTitle} />
            }
        })
        const titleInput = this.state.value
        const typeInput = this.state.typeValue
        // console.log(typeMap);
        return <div id="cards">
            <div className="cardContainer">
                {creation}
            </div>
            <div className="createCardBox">
                <button onClick={()=>this.addToArchive(typeInput, titleInput)} className="createCardBtn">Create Card</button>
                <input onChange={this.handleChange} className="cardNameInput" type="text" placeholder={this.state.value} autoFocus></input>
                <select onChange={this.typeChange} name="cardType" id="createcardType">{typeMap}</select>
                <div className="deleteCard">
                    <button onClick={this.deleteFromArchive} className="deleteCardBtn">Delete Card</button>
                    <select onChange={this.sayHello} name="deleteCardType" id="deleteCardType">{existingCards}</select>
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
        this.cardname = props.name
        this.state = {
            isDragging: false,
            initialPos: {left: 0, top: 0}
        }
    }

    onDragStart = (event) => {
        if (event.type === "mousedown") {
            this.setState({isDragging: true})
            // console.log(this.state.isDragging);
            // console.log(event);
        }
    }

    onDrag = (event) => {
        if (this.state.isDragging === true) {
            this.setState({
                initialPos:{
                    left: event.clientX - 55,
                    top: event.clientY - 75
                }
            })  
            // console.log(this.state.isDragging);
            // console.log(event.clientY);
        }
    }

    onDragStop = (event) => {
        if (event.type === "mouseup") {
            if (this.state.isDragging === true) {
                this.setState({isDragging: false})
            }
            // console.log(this.state.isDragging);
        }
    }

    createCard(){
        return <div className={`cardholder cardholder-${this.cardname}`}>
            <div style={this.state.initialPos} className={`card Mg card-${this.cardname}`} onMouseDown={this.onDragStart} onMouseMove={this.onDrag} onMouseUp={this.onDragStop}>
                <h2 unselectable="on">{this.cardname}</h2>
            </div>
        </div>
    }

    render(){
        return this.createCard()
    }
}

class FatCard extends ColCard{
    createCard(){
        return <div className={`cardholder cardholder-${this.cardname}`}>
            <div style={this.state.initialPos} className={`card Hm card-${this.cardname}`} onMouseDown={this.onDragStart} onMouseMove={this.onDrag} onMouseUp={this.onDragStop}>
                <h2 unselectable="on">{this.cardname}</h2>
            </div>
        </div>
    }
}


const root = ReactDOM.createRoot(document.getElementById('down'));
// root.render(<FatCard name="s" />);
// root.render(<ColCard name="s" />);
root.render(<CreateCardBtn />);
