class CreateCardBtn extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            archive:[],
            cardTypes:["Magician", "Hermit"],
            value: "",
            typeValue: "Magician"
        }
        this.handleChange = this.handleChange.bind(this);
        this.typeChange = this.typeChange.bind(this);
        this.addToArchive = this.addToArchive.bind(this);
    }

    addToArchive(type, title){
        const arr = this.state.archive
        arr.push({
            cardType: type,
            cardTitle: title
        })
        this.setState({archive: arr})
        console.log(this.state.archive);
    }

    // deleteFromArchive(){
    //     console.log(2);
    // }

    handleChange(event){
        this.setState({value: event.target.value})
        console.log(this.state.value);
    }

    typeChange(event){
        this.setState({
            typeValue: event.target.value
        })
        return typeValue
    }

    createCard(){
        switch (this.state.typeValue) {
            case "Magician":
                
                break;
            case "Hermit":
                
                break;
            default:
                break;
        }
    }

    render(){
        const typeMap = this.state.cardTypes.map((type)=>{
            return <option value={type}>{type}</option>
        })
        // const existingCards = this.state.archive.cardTitle
        const titleInput = this.state.value
        const typeInput = this.state.typeValue
        // console.log(typeMap);
        return <div className="createCardBox">
            <button onClick={()=>this.addToArchive(typeInput, titleInput)} className="createCardBtn">Create Card</button>
            <input onChange={this.handleChange} className="cardNameInput" type="text"></input>
            <select onChange={this.typeChange} name="cardType" id="createcardType">{typeMap}</select>
            <div className="deleteCard">
                <button className="deleteCardBtn">Delete Card</button>
                <select name="deleteCardType" id="deleteCardType"></select>
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
                <h1 unselectable="on">{this.cardname}</h1>
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
                <h1 unselectable="on">{this.cardname}</h1>
            </div>
        </div>
    }
}


const root = ReactDOM.createRoot(document.getElementById('cards'));
// root.render(<ColCard name="s" />);
// root.render(<FatCard name="s" />);
root.render(<CreateCardBtn name="s" />);
