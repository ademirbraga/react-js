import React, { Component, Fragment } from 'react';
// import logo from './logo.svg';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css'
import Tabela from './components/Tabela'
import Form from './components/Formulario'
import Header from './components/Header'
import PopUp from './popup'
import ApiService from './services/Api'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = { autores: [] }
  }

  submitListner = autor => {
    autor.id = this.state.autores.length + 1

    ApiService.CriaAutor(autor)
      .then(res => {
        if (res.status === 'success') {
          this.setState({ autores: [...this.state.autores, ...res.data] })
          PopUp.exibirMensagem('success', 'Autor adicionado com sucesso.')
        }
      })
      .catch(err => PopUp.exibirMensagem('errors', 'Não foi possível inserir o autor.'))
  }

  removeAutor = id => {
    const { autores } = this.state

    const autoresAtualizados = autores.filter(autor => {
      return autor.id !== id
    })

    ApiService.RemoverAutor(id)
      .then(res => {
        if (res.status === 200) {
          this.setState({ autores: [...autoresAtualizados] })
          PopUp.exibirMensagem('error', 'Autor removido com sucesso.')
        }
      })
      .catch(err => PopUp.exibirMensagem('error', 'Erro ao tentar remover o autor.'))
  }

  componentDidMount() {
    ApiService.ListaAutores()
      .then(res => {
        if (res.status === 'success') {
          this.setState({ autores: [...this.state.autores, ...res.data] })
        }
      })
      .catch(() => PopUp.exibirMensagem('error', 'Erro ao tentar listar os autores.'))
  }

  // ao sair de function e passar para class component,
  // deve-se utilizar o método obrigatório render
  render() {
    return (
      <Fragment>
        <Header />
        <div className="container mb-10">
          <h1>Casa do Código</h1>
          {/* passando pros para o component tabela */}
          <Tabela autores={this.state.autores} removeAutor={this.removeAutor} />
          <Form submitListner={this.submitListner} />
        </div>
      </Fragment>
    )
  }
}

export default App
