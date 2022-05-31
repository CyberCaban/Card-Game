class ColCard extends React.Component{
    constructor(props){
        super(props)
        this.x
        this.y
        this.cardname = props.name
        this.state = {
            isDragging: false,
            initialPos: {x: 0, y: 0},
            rel: null
        }
    }

    createCard(){
        return <div className={`cardholder cardholder-${this.cardname}`}>
            <div onClick={this.cardMove} className={`card card-${this.cardname}`} onMouseDown={this.cardMove}>
                <h1>{this.cardname}</h1>
            </div>
        </div>
    }

    cardMove = (event) => {
        onmousedown(console.log(event))
    }

    render(){
        return this.createCard()
    }
}




const root = ReactDOM.createRoot(document.getElementById('cards'));
root.render(<ColCard name="salami" />);