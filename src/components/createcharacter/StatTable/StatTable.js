import React, { Component } from 'react'
import "./StatTable.css";
import Table from 'react-bootstrap/Table'
class StatTable extends Component {
    render() {
        return (
            <div className="CreateCharacterStatTable">
                <Table bordered responsive variant="dark">
                    <thead>
                        <tr>
                            <th>Strength</th>
                            <th>Agility</th>
                            <th>Stamina</th>
                            <th>Intellect</th>
                            <th>Spirit</th>
                        </tr>

                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.props.Strength}</td>
                            <td>{this.props.Agility}</td>
                            <td>{this.props.Stamina}</td>
                            <td>{this.props.Intellect}</td>
                            <td>{this.props.Spirit}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default StatTable
