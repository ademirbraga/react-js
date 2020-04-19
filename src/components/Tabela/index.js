import React, { Component } from 'react'

// componente thead
const TableHead = () => {
    return (
        <thead>
            <tr>
                <th>Autores</th>
                <th>Livros</th>
                <th>Preços</th>
                <th>Remover</th>
            </tr>
        </thead>
    )
}
// compoenente tbody
const Tablebody = props => {
    const linhas = props.autores.map((linha) => {
        return (
            <tr key={linha.id}>
                <td>{linha.nome}</td>
                <td>{linha.livro}</td>
                <td>{linha.preco}</td>
                <td><button onClick={() => props.removeAutor(linha.id)} className="waves-effect waves-light btn indigo lighten-2">Remover</button></td>
            </tr>
        )
    })

    return (
        <tbody>
            {linhas}
        </tbody>
    )
}

class Tabela extends Component {
    render() {
        const { autores, removeAutor } = this.props
        return (
            <table className="centered hightlight">
                <TableHead />
                {/* passando props para o tbody */}
                <Tablebody autores = { autores } removeAutor = {removeAutor} />
            </table>
        )
    }
}

export default Tabela