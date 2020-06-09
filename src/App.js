import React, { Component } from 'react'
import CardList from './cardList'
import SearchBox from './SearchBox'
import { robots } from './robots'
import './App.css'

// const state = {
//     robots: robots,
//     searchfield: ''
// }

// const App = () => {
class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: robots,
            searchfield: ''
        }
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
    }

    render() {
        const filteredRobots = this.state.robots.filter(robots =>{
            return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        return (
            <div className="tc pa4">
                <h1 className="f1">Robot Avatars</h1>
                <SearchBox searchChange={this.onSearchChange}/><br></br>
                <CardList robots={filteredRobots} />
            </div>
        );
    }
}

export default App;