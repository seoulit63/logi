import React ,{Component} from "react";
import AstronomyCard from "common/dashboard/components/AstronomyCard";

class Astronomy extends Component {
constructor(props){

    super(props);

    this.state={
  datas :[]
    };
}

componentWillMount(){

    fetch(
        "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
    ).then(response =>response.json())  
    .then(data => this.setState({
        datas :data
    })
    )
    
}  

    
render(){
  
    const {datas}=this.state;
   
    return (
<div>
    <AstronomyCard datas={datas} />  
</div>

    );
}
}

export default Astronomy;