import React from 'react';
import axios from 'axios';
import './styles.css';
import Input from './Input';
import Output from './Output';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      limitDate: '',
      dateSelected: false,
      baseUrl: 'https://api.nasa.gov/planetary/apod',
      apiKey: process.env.REACT_APP_API_KEY,
      error: false,
      loading: false,
      imgSource: '',
      altText: '',
      isVideo: false,
      explanation: ''
    };
    this.getPhoto = this.getPhoto.bind(this);
  }

  componentDidMount() {
    // Need to convert today's date to right
    // format for max date on input field
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const limited = `${year}-${month < 10 ? '0' : ''}${month}-${date}`;

    this.setState({limitDate: limited});
  }

  getPhoto(inputDate){
    // Do not call API if date input is cleared 
    if(inputDate === '') return;

    if(!this.state.dateSelected){
      this.setState({dateSelected: true});
    }

    this.setState({loading: true});

    const url = this.state.baseUrl +
        '?api_key=' + this.state.apiKey +
        '&date=' + inputDate;
    
    axios.get(url)
      .then(res => {
        this.setState({error: false});

        if(res.data.media_type === 'video') this.setState({isVideo:true});
        else this.setState({isVideo: false});

        const imgSource = res.data.url;
        this.setState({imgSource});

        const altText = res.data.title;
        this.setState({altText});

        const explanation = res.data.explanation;
        this.setState({explanation});

        this.setState({loading: false});
      })
      .catch(err => {
        this.setState({error: true});
      })

  }

  render() {
    return (
      <div id="page-container">
        <div id="content-wrap">
          <h1>NASA Photo of the Day</h1>
          
          <Input
            limitDate={this.state.limitDate}
            getPhoto={this.getPhoto}
          />

{/* Only load the output when an initial date has been selected */}
          { this.state.dateSelected &&    
            <Output
                error={this.state.error}
                loading={this.state.loading}
                isVideo={this.state.isVideo}
                imgSource={this.state.imgSource}
                altText={this.state.altText}
                explanation={this.state.explanation}
              />
          }

          <footer id="footer">{new Date().getFullYear()} — ThinkTink — <a href='https://github.com/ThinkTink/NASAPhotoAPI'> <FontAwesomeIcon icon={faGithub} /></a></footer>
        </div>
      </div>
    );
  }
}
