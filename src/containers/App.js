import React, { Component } from 'react'
import CardList from '../components/cardList'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import './App.css'
import { robots } from '../robots'

// const state = {
//     robots: robots,
//     searchfield: ''
// }

// const App = () => {
class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    //to fetch from local storage
    componentDidMount() {
        this.setState({robots: robots})
    }

    //to fetch from server
    // componentDidMount() {
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //         .then(response=> {
    //             return response.json();
    //         })
    //         .then(users => {
    //             this.setState({robots: users})
    //         })
    // }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
    }

    render() {
        const { robots, searchfield } = this.state;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        if (robots.length === 0) {
            return <h1>Loading</h1>
        } else {
        return (
            <div className="tc pa4">
                <h1 className="f1">Robot Avatars</h1>
                <SearchBox searchChange={this.onSearchChange}/><br></br>
                <Scroll>
                    <CardList robots={filteredRobots} />
                </Scroll>
            </div>
        );
        }
    }
}

export default App;