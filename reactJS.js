class createCardBtn extends React.Component{
    constructor(props){
        super(props)
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
            initialPos: {left: 1, top: 1},
            archive:[]
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
            <div style={this.state.initialPos} className={`card card-${this.cardname}`} onMouseDown={this.onDragStart} onMouseMove={this.onDrag} onMouseUp={this.onDragStop}>
                <h1 unselectable="on">{this.cardname}</h1>
            </div>
        </div>
    }

    render(){
        return this.createCard()
    }
}




const root = ReactDOM.createRoot(document.getElementById('cards'));
root.render(<ColCard name="s" />);
