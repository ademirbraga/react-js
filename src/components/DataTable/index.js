import React from 'react'

const DataTable = props => {
    let linhas = props.dados.map((item, index) =>
        <tr key={index}>
            {props.colunas.map((coluna) =>
                <td key={`${index}${item[coluna]}`}>{item[coluna]}</td>)}
        </tr>)
    return (
        <table className='centered highlight'>
            <thead>
                <tr>
                    <th>{props.titulo}</th>
                </tr>
            </thead>
            <tbody>
                {linhas}
            </tbody>
        </table>
    )

}
export default DataTable