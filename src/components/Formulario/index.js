import React, { Component } from 'react'
import Button from '../Button'
import FormValidator from '../../validators/FormValidator'
import PopUp from '../../popup'

class Formulario extends Component {
    constructor(props) {
        super(props)

        this.validador = new FormValidator([
            {
                campo: 'nome',
                metodo: 'isEmpty',
                validoQuando: false,
                mensagem: 'Enrte com um nome'
            }, {
                campo: 'livro',
                metodo: 'isEmpty',
                validoQuando: false,
                mensagem: 'Enrte com um livro'
            }, {
                campo: 'preco',
                metodo: 'isInt',
                args: [{ min: 0, max: 99999 }],
                validoQuando: true,
                mensagem: 'Enrte com um valor numérico'
            }
        ])

        this.stateInicial = {
            nome: '',
            livro: '',
            preco: '',
            validcao: this.validador.valido()
        }
        this.state = this.stateInicial
    }

    // necessario porque senao nao seria possivel escrever nos inputs
    inputListner = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    submitForm = () => {
        const validacao = this.validador.valida(this.state)

        if (validacao.isValid) {
            this.props.submitListner(this.state)
            this.setState(this.stateInicial)
        } else {
            const { nome, livro, preco} = validacao
            const campos = [nome, livro, preco]

            const camposInvalidos = campos.filter(elem => {
                return elem.isInvalid
            })

            camposInvalidos.forEach(campo => {
                PopUp.exibirMensagem('error', campo.message)
            })
        }
    }

    render() {
        const { nome, livro, preco } = this.state

        return (
            <form>
                <div className="row">
                    <div className="input-field col s4">
                        <label className="input-field" htmlFor="nome" >Nome</label>
                        <input
                            className="validate"
                            id="nome"
                            type="text"
                            name="nome"
                            value={nome}
                            onChange={this.inputListner}
                        />
                    </div>
                    <div className="input-field col s4">
                        <label className="input-field" htmlFor="livro">Livro</label>
                        <input
                            className="validate"
                            id="livro"
                            type="text"
                            name="livro"
                            value={livro}
                            onChange={this.inputListner}
                        />
                    </div>
                    <div className="input-field col s4">
                        <label className="input-field" htmlFor="preco">Preço</label>
                        <input
                            className="validate"
                            id="preco"
                            type="text"
                            name="preco"
                            value={preco}
                            onChange={this.inputListner}
                        />
                    </div>
                    <Button type="button" onClick={this.submitForm} className="waves-effect waves-light btn indigo lighten-2">Salvar</Button>
                </div>
            </form>
        )
    }
}

export default Formulario