import React, {Component} from "react";
import "./Tile.css";



// const Tile = props => {
//
//     console.log("ha");
//
//     return <div onClick={(event) => props.tileClicked(props.id, event)} className="card">
//         <div className="img-container">
//             <img alt={props.name} src={props.image}/>
//         </div>
//     </div>;
// };
let position=0;
let solved=false;

class Tile extends Component {

    state = {
        position,
        solved
    };

    victoryQ = () => {
        let modPosition = position%4;
        if (this.props.solution===(modPosition)){
            solved = true;
            this.setState({solved});
            console.log("tile solved");
        } else{
            console.log("not solved");
            solved = false;
        }


    };

    tileClicked = (id,event) => {
        console.log(event.target.style);
        let div = event.target;
        console.log(id);
        console.log("~~~~");

        console.log(this.state.position);
        position=this.state.position;
        position++;
        this.setState({position});
        console.log(position);
        // this.setState((prevState) => {
        //     return {position: prevState.position+1};
        // });

        console.log(this.state.position);
        this.victoryQ();


        // componentDidUpdate(console.log(this.state.position));



        const angle = 90*position;
        div.style.webkitTransform = 'rotate('+ angle +'deg)';


    };

    render() {
        return( <div
            onClick={(event) => this.tileClicked(this.props.id, event)}
            className="card">
            <div className="img-container">
                <img alt={this.props.name} src={this.props.image}/>
            </div>
        </div>);

    }

}
export default Tile;


// onClick={() => props.setClicked(props.id)}

