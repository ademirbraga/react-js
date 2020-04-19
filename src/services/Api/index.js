const ApiService = {
    ListaAutores: () => {
        return fetch('http://dummy.restapiexample.com/api/v1/employees')
            .then(res => res.json())
            .then(res => ApiService.TrataErros(res))
    },

    CriaAutor: (autor) => {
        const data = mockDataCreate(autor)
        return fetch('http://dummy.restapiexample.com/api/v1/create', { method: 'POST', headers: { 'content-type': 'application/json' }, body: data })
            .then(() => ({
                id: autor.id,
                employee_name: autor.nome,
                employee_age: autor.preco
            }))
            .then(res => ApiService.TrataErros({ data: [res], status: 'success' }))
    },

    RemoverAutor: (id) => {
        return fetch(`http://dummy.restapiexample.com/api/v1/delete/${id}`, { method: 'DELETE' })
            .then(res => ApiService.TrataErros(res))
    },

    ListaNomes: () => {
        return fetch('http://dummy.restapiexample.com/api/v1/employees')
            .then(res => res.json())
            .then(mockData)
    },

    TrataErros: (res) => {
        if (res.status !== 'success' && res.status !== 200) {
            throw Error(res.responseText)
        }
        const data = mockData(res)
        return data
    }
}

const mockDataCreate = (autor) => {
    return {
        id: autor.id,
        name: autor.nome,
        salary: autor.preco,
        age: autor.preco
    }
}

const mockData = (autores) => {
    let result = []
    if (autores && autores.data) {
        autores.data.forEach((element) => {
            result.push({
                id: element.id,
                nome: element.employee_name,
                livro: `Livro ${element.employee_name}`,
                preco: element.employee_age
            })
        })
    }
    return { data: result, status: autores.status }
}

export default ApiService