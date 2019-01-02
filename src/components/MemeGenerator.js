import React,{Component} from 'react';

class MemeGenerator extends Component{
    constructor(){
        super()
        this.state = {
            topText:"",
            bottomText:"",
            randomImage:"http://i.imgflip.com/1bij.jpg",
            allMemeImages:[]
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then( dataObj=> {

            // const memeArr = dataObj.data.memes ;
              const{memes} = dataObj.data;
            
             this.setState({
                 allMemeImages: memes
             })
        });
    }

    handleChange(e){
        const{name,value} = e.target;
        this.setState({ [name]: value })
    }
    handleSubmit(e){
        e.preventDefault();
        const rnd = Math.floor(Math.random() * this.state.allMemeImages.length);
        const rndImg = this.state.allMemeImages[rnd].url;
        this.setState({randomImage:rndImg});
    }

    render() {
      return (
        <div>
            <form className="meme-form" onSubmit={this.handleSubmit}>
                        <input 
                            type="text"
                            name="topText"
                            placeholder="Top Text"
                            value={this.state.topText}
                            onChange={this.handleChange}
                        /> 
                        <input 
                            type="text"
                            name="bottomText"
                            placeholder="Bottom Text"
                            value={this.state.bottomText}
                            onChange={this.handleChange}
                        /> 
                
                    <button>Generate New Photo</button>
                </form> 
          <div className="meme">
          <img src={this.state.randomImage} alt={this.state.randomImage} />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
          </div>
        </div>
      )
    }
}

export default MemeGenerator