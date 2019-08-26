import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'

class Movement extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div>
                <p>Movement</p>

                <Table variant="dark" responsive size="sm">
                    <thead>
                        <th>
                            A
                        </th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>B</td>
                        </tr>
                    </tbody>

                </Table>
            </div>
        )
    }
}

export default Movement
