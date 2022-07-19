import '../css/Image.css';

export default function ImageDisplay(props) {
    return (
        <div className= "element">
            <div className="img-container">
                <img src={props.img} className="image"/>
                <div className="hovertext"> - {props.hovertext} - </div>
            </div>
            <div> 
                <span className="title">{props.title}</span> <br/>
                <span className="desc">{props.desc}</span>
            </div>
        </div>
    )
}