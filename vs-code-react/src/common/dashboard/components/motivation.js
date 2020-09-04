import React from 'react';
import YouTube from 'react-youtube';







const opts = {
    height: '550',
    width: '1000',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

class motivation extends React.Component {
  
  constructor(props) {
    super(props);
    //state 
 this.state = {

   }

  }


 componentDidUpdate(prevProps, prevState) {
  
 
 }

 
render() {

  

    return (
      <React.Fragment>
     <YouTube videoId="SESuctdE9vM" opts={opts} onReady={this.onReady} />;
  
     </React.Fragment>            
    );
  };
}
export default motivation;
       