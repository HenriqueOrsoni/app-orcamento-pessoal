class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {
        let despesas = Array()

        let id = localStorage.getItem('id')

        //recuperar as despesas
        for (let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i))

            if (despesa === null) {
                continue
            }

            despesa.id = i
            despesas.push(despesa)
        }
        return despesas
    }

    pesquisar(despesa) {
        let despesasFiltradas = Array()
        
        despesasFiltradas = this.recuperarTodosRegistros()

        //ano
        if (despesa.ano != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        
        //mes
        if (despesa.mes != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }  
        
        //dia
        if (despesa.dia != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }  

        //tipo
        if (despesa.tipo != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }  

        //descricao
        if (despesa.descricao != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }  

        //valor
        if (despesa.valor != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }  

        return despesasFiltradas
    }
}

let bd = new Bd()

function cadastrarDespesa() {

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)

    if (despesa.validarDados()) {
        bd.gravar(despesa)
        document.getElementById('exampleModalLabel').innerHTML = 'Sucesso no registro'
        document.getElementById('exampleModalLabel').className = 'modal-title text-primary'
        document.getElementById('texto-modal').innerHTML = 'Despesa cadastrada com sucesso!'
        document.getElementById('fecharModal').innerHTML = 'Voltar'
        document.getElementById('fecharModal').className = 'btn btn-primary'
        $('#modalRegistraDespesa').modal('show')
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
    } else {
        document.getElementById('exampleModalLabel').innerHTML = 'Erro no registro'
        document.getElementById('exampleModalLabel').className = 'modal-title text-danger'
        document.getElementById('texto-modal').innerHTML = 'Existem campos obrigatórios que não foram preenchidos.'
        document.getElementById('fecharModal').innerHTML = 'Voltar e corrigir'
        document.getElementById('fecharModal').className = 'btn btn-danger'
        $('#modalRegistraDespesa').modal('show')
    }
}

function carregaListaDespesas() {

    let despesas = Array()
    despesas = bd.recuperarTodosRegistros()

    var listaDespesas = document.getElementById('listaDespesas')

    despesas.forEach(function (d) {

        let linha = listaDespesas.insertRow()

        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        switch (parseInt(d.tipo)) {
            case 1:
                linha.insertCell(1).innerHTML = 'Alimentação'
                break

            case 2:
                linha.insertCell(1).innerHTML = 'Educação'
                break

            case 3:
                linha.insertCell(1).innerHTML = 'Lazer'
                break

            case 4:
                linha.insertCell(1).innerHTML = 'Saúde'
                break

            case 5:
                linha.insertCell(1).innerHTML = 'Transporte'
                break

            case 6:
                linha.insertCell(1).innerHTML = 'Outro'
                break
        }

        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
        linha.insertCell(4).innerHTML = `<button class="btn btn-danger" onclick="removerDespesa(${d.id})"> <i class="fa-solid fa-trash" style="color: #ffffff;"></i>`
    })
}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    var listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''

    let despesasFiltradas = bd.pesquisar(despesa)

    despesasFiltradas.forEach(function (d) {

        let linha = listaDespesas.insertRow()

        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        switch (parseInt(d.tipo)) {
            case 1:
                linha.insertCell(1).innerHTML = 'Alimentação'
                break

            case 2:
                linha.insertCell(1).innerHTML = 'Educação'
                break

            case 3:
                linha.insertCell(1).innerHTML = 'Lazer'
                break

            case 4:
                linha.insertCell(1).innerHTML = 'Saúde'
                break

            case 5:
                linha.insertCell(1).innerHTML = 'Transporte'
                break
            
            case 6:
                linha.insertCell(1).innerHTML = 'Outro'
                break
        }

        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
        linha.insertCell(4).innerHTML = `<button class="btn btn-danger" onclick="removerDespesa(${d.id})"> <i class="fa-solid fa-trash" style="color: #ffffff;"></i>`
    })
}

function removerDespesa(id) {
    localStorage.removeItem(id)
    window.location.reload()
}