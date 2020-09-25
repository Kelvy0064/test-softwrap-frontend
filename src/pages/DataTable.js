import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ManageResponse from './common/ManageResponse'
import Toast from 'react-bootstrap/Toast'
import Pagination from 'react-bootstrap/Pagination'
import CustomTable from './common/CustomTable'
import CustomForm from './common/CustomForm'
import validateCPF from './common/validateCPF'

export class DataTable extends Component {
    constructor (props) {
        super(props)
        this.state = {
            toast: { open: false, mensage: '' },
            isLoaded: false,
            buttonName: 'Salvar',
            personalData: [],
            test: 0,
            checkCPF: true,
            amountPages: 1,
            page: 1,
            people: { name: '', age: '', civilState: '', cpf: '', city: '', state: '' }
        }
    }

    componentDidMount () {
        this.setState({ personalData: [] }, () => { this.getDatas() })
    }

    getDatas () {
        const p = this.state.page
        fetch(`https://softwrap-test.herokuapp.com/api/table?page=${p}&limit=5`, {
            method: 'GET'
        })
        .then(res => {
            return res.json()
        })
        .then(
            result => {
                const NUMBER_OF_LINES_PER_PAGES = 5
                const amountPages =
                        (result.amount % NUMBER_OF_LINES_PER_PAGES === 0 ? result.amount / NUMBER_OF_LINES_PER_PAGES : (result.amount / NUMBER_OF_LINES_PER_PAGES) + 1)
                this.setState({ amountPages: amountPages })
                if (result.user.length) {
                    this.setState({ personalData: result.user })//, () => { this.getDatas() })
                } else {
                    this.setState({ isLoaded: true })
                }
            },
            () => { this.handleResult() }
        )
    }

    render () {
        const paginas = []
        for (let number = 1; number <= this.state.amountPages; number++) {
            paginas.push(
                <Pagination.Item active = { number === this.state.page } onClick = { () => this.helper(number)}>
                    {number}
                </Pagination.Item>
            )
        }
        const root = this
        return (
            <section className="table">
                <section className="form">
                    <CustomForm
                        checkCPF = {this.state.checkCPF}
                        root = {this}
                        people = {this.state.people}
                        button = {this.state.buttonName}/>
                </section>
                <CustomTable
                    root = {this}
                    personalData = { this.state.personalData }/>
                <Pagination className="pagination">
                    {paginas}
                </Pagination>
                <Toast
                    className="alert"
                    show = {root.state.toast.open}
                    onClose={() => this.closeToast()}
                    adelay={3000} autohide>
                        <Toast.Body>{root.state.toast.message}</Toast.Body>
                </Toast>
            </section>
        )
    }

    helper (key) {
        this.setState({ page: key })
        this.getDatas()
        this.componentDidMount()
    }

    updateData () {
        fetch('https://softwrap-test.herokuapp.com/api/table', {
            method: 'PUT',
            body: JSON.stringify(this.state.people),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            return ManageResponse.checkStatusCode(res)
        })
        .then(
            result => {
                this.setState({ buttonName: 'Salvar' })
                this.handleResult(result)
            },
            () => { this.handleResult() }
        )
    }

    setModalShow (key) {
        this.setState({ modalShow: key })
    }

    setProduct (key, e) {
        const people = this.state.people
        people[key] = e.target.value
        this.setState({ people: people })
        if (key === 'cpf') {
            const cpf = this.state.people.cpf.replace(/[-/.,]/g, '')
            this.setState({ checkCPF: validateCPF(cpf) })
            people[key] = cpf
            this.setState({ people: people })
        }
    }

    checkData () {
        const people = this.state.people
        if (people.civilState === '' || people.civilState === null ||
            people.state === '' || people.state === null ||
            people.city === '' || people.city === null ||
            people.name === '' || people.name === null ||
            people.age === '' || people.age === null ||
            people.cpf === '' || people.cpf === null) {
                const toast = this.state.toast
                toast.open = true
                toast.message = 'Preencha todos os campos.'
                this.setState({ toast: toast })
        } else { this.state.buttonName === 'Salvar' ? this.saveData() : this.updateData() }
    }

    closeToast () {
        const toast = this.state.toast
        toast.open = false
        toast.mensage = ''
        this.setState({ toast: toast })
    }

    editRowInfo (i) {
        const people = this.state.personalData[i]
        if (this.state.personalData[i]) {
            this.setState({ people: people })
            this.setState({ buttonName: 'Atualizar' })
        }
    }

    deleteData () {
        fetch('https://softwrap-test.herokuapp.com/api/table', {
            method: 'DELETE',
            body: JSON.stringify(this.state.people),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            return ManageResponse.checkStatusCode(res)
        })
        .then(
            result => {
                this.setState({ buttonName: 'Salvar' })
                this.handleResult(result)
            },
            () => { this.handleResult() }
        )
    }

    saveData () {
        fetch('https://softwrap-test.herokuapp.com/api/table', {
            method: 'POST',
            body: JSON.stringify(this.state.people),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            return ManageResponse.checkStatusCode(res)
        })
        .then(
            (result) => { this.handleResult(result) },
            () => { this.handleResult() }
        )
    }

    cleanFields () {
        this.setState({ people: { name: '', age: '', civilState: '', cpf: '', city: '', state: '' }, checkCPF: true })
    }

    handleResult (result) {
        if (result) {
            const toast = this.state.toast
            toast.open = true
            toast.message = result.error ? result.error : result.success
            this.setState({ toast: toast })
            this.componentDidMount()
            this.clearState()
        } else {
            this.setState({ fetching: false })
            const toast = this.state.toast
            toast.open = true
            toast.message = 'Problemas na comunicação.'
            this.setState({ toast: toast })
            this.clearState()
        }
    }

    clearState () {
        this.setState({ people: { name: '', age: '', civilState: '', cpf: '', city: '', state: '' } })
    }
}

export default withRouter(DataTable)
