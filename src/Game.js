import React from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001'
console.log('API_URL', API_URL)

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guild: 'thailand',
      count: 0, // unused for now
      pops: [

      ]
    }
  }

  refreshPops() {
    fetch(`${API_URL}/v1/pop`)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          pops: data
        })
        console.log(this.state)
      })
      .catch(console.log)
  }

  componentDidMount() {
    this.refreshPops()
  }

  handleClick() {
    // update server
    fetch(`${API_URL}/v1/pop/add`, {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          guild: this.state.guild,
          count: 1,
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log('data', data)

        // reset
        this.setState({
          count: 0
        })

        // refresh data
        this.refreshPops()
      })
      .catch(console.log)
  }

  render() {
    return (
      <div>
        <button
          onClick={() => this.handleClick()}>
          Pop Me
        </button>
        <div>
          <label>Guild:</label> <span>{this.state.guild}</span><br />
          <label>Count:</label> <span>{this.state.count}</span>
        </div>

        <ul>
          {this.state.pops.map(pop => {
            return <li key={pop.id}>{pop.guild}: {pop.count}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default Game;
