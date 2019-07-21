import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCharacters } from '../../actions/characterActions'

export class Testcharacterlist extends Component {

    componentWillMount() {
        this.props.getCharacters()
    }
    componentDidMount() {
        
        console.log(this.props.characters)
    }
    render() {
        const Characters = this.props.characters.characters.map(character => (
            <div key={character.Id}>
                Name: {character.Name}
            </div>
        ))
        return (
            <div>
                {Characters}

            </div>

        )

    }
}

const mapStateToProps = state => ({
    characters: state.characters
})

export default connect(mapStateToProps, { getCharacters })(Testcharacterlist)
