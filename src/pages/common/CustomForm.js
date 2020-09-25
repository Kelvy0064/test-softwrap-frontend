import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export class CustomForm extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        const { root, people, button, checkCPF } = this.props
        return (
                <Form>
                    <Form.Group className="name">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                        required
                        onChange = { e => root.setProduct('name', e) }
                        placeholder="Nome" value={people.name} />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group>
                            <Form.Label>Idade</Form.Label>
                            <Form.Control
                            required
                            type="number"
                            inputProps = {{ min: '0.01', step: '0.01' }}
                            onChange = { e => root.setProduct('age', e) }
                            placeholder="Idade" value={people.age}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Estado civil</Form.Label>
                                <Form.Control
                                required
                                onChange = { e => root.setProduct('civilState', e) }
                                as="select" value={people.civilState}>
                                <option value = ''>Escolha...</option>
                                <option>Solteiro(a)</option>
                                <option>Casado(a)</option>
                                <option>Divorciado(a)</option>
                                <option>Viúvo(a)</option>
                                <option>Separado(a)</option>
                                </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>CPF</Form.Label> <Form.Label srOnly={ checkCPF }> inválido!</Form.Label>
                            <Form.Control
                            className = { checkCPF ? 'cpfTrue' : 'cpfFalse' }
                            onChange = { e => root.setProduct('cpf', e) }
                            required
                            placeholder="CPF" value={people.cpf}/>
                        </Form.Group>
                    </Form.Row>

                        <Form.Row>
                            <Form.Group className="field_last_row">
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control
                                required
                                onChange = { e => root.setProduct('city', e) }
                                placeholder="Cidade" value={people.city}/>
                            </Form.Group>

                            <Form.Group className = "field_last_row">
                                <Form.Label>Estado</Form.Label>
                                <Form.Control
                                required
                                onChange = { e => root.setProduct('state', e) }
                                as="select" value={people.state} >
                                <option value = '' >Escolha...</option>
                                <option>Acre (AC)</option>
                                <option>Alagoas (AL)</option>
                                <option>Amapá (AP)</option>
                                <option>Amazonas (AM)</option>
                                <option>Bahia (BA)</option>
                                <option>Ceará (CE)</option>
                                <option>Distrito Federal (DF)</option>
                                <option>Espírito Santo (ES)</option>
                                <option>Goiás (GO)</option>
                                <option>Maranhão (MA)</option>
                                <option>Mato Grosso (MT)</option>
                                <option>Mato Grosso do Sul (MS)</option>
                                <option>Minas Gerais (MG)</option>
                                <option>Pará (PA)</option>
                                <option>Paraíba (PB)</option>
                                <option>Paraná (PR)</option>
                                <option>Pernambuco (PE)</option>
                                <option>Piauí (PI)</option>
                                <option>Rio de Janeiro (RJ)</option>
                                <option>Rio Grande do Norte (RN)</option>
                                <option>Rio Grande do Sul (RS)</option>
                                <option>Rondônia (RO)</option>
                                <option>Roraima (RR)</option>
                                <option>Santa Catarina (SC)</option>
                                <option>São Paulo (SP)</option>
                                <option>Sergipe (SE)</option>
                                <option>Tocantins (TO)</option>
                                </Form.Control>
                            </Form.Group>

                            <Button
                            variant="primary"
                            type="submit"
                            size="sm"
                            onClick = { () => { root.checkData() } } >
                                { button }
                            </Button>

                            <Button
                                variant="danger"
                                size="sm"
                                disabled={people.cpf === '' ? true : false}
                                onClick = { () => root.deleteData() } >
                                Deletar
                            </Button>

                            <Button
                                variant="secondary"
                                size="sm"
                                onClick = { () => root.cleanFields() } >
                                Limpar
                            </Button>
                        </Form.Row>
                    </Form>
        )
    }
}

export default CustomForm
