import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'

export class CustomTable extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        const { root, personalData } = this.props
        return (
            <Table striped bordered hover >
                <thead>
                    <tr>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>Estado Civil</th>
                    <th>CPF</th>
                    <th>Cidade</th>
                    <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                {
                    personalData.map((data, i) => {
                        return (
                            <tr
                                onClick = { e => root.editRowInfo(i) }
                                key = {i}>
                                <td>{ data.name }</td>
                                <td>{ data.age }</td>
                                    <td>{ data.civilState }</td>
                                <td>{ data.cpf }</td>
                                <td>{ data.city }</td>
                                <td>{ data.state }</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
        )
    }
}

export default CustomTable
