import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedImage: '',
      content: ''
    };

  }

  onChange = (ev) => {
    this.setState({
      selectedImage: ev.target.files[0]
    });
  }

  onSubmit = (ev) => {
    ev.preventDefault();
    const data = new FormData();
    data.append('image', this.state.selectedImage);
    axios.post('http://localhost:8000/api/images/', data, {}).then(res => {
      if (res.data && res.data.result) {
        const finalResult = res.data.result.map(ele => ele.description).join('');
        this.setState({
          content: finalResult
        });
      } 
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Slot Machine Reader
        </header>
        <div className="file-selection">
          <form onSubmit={this.onSubmit}>
              <h3>Choose File</h3>
              <div className="form-group choice">
                  <input type="file" capture="environment" accept="image/png, image/jpg, image/jpeg" onChange={this.onChange}/>
              </div>
              <div className="form-group">
                  <button className="btn btn-primary" type="submit">Read Text</button>
              </div>
              <div className="text-box">
                <h3>{this.state.content ? 'Text in Image:' : null}</h3>
                {this.state.content}
              </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
