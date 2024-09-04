var array = [["asd8f00", "VW", "Polo"],["oiu8j12", "Renaut", "Kicks"], ["flj3o12", "Honda", "Civic"]]

function cadastrarCarro(){
    const placa = document.getElementById('fplaca')
    const marca = document.getElementById('fmarca')
    const modelo = document.getElementById('fmodelo')

    if (placa.value != '' && marca.value != '' && modelo.value != ''){
        array.push([placa.value,marca.value,modelo.value])
        
        placa.value = ''
        marca.value = ''
        modelo.value = ''
        $('#cadastrarModal').modal('hide')
        atualizarTabela()
        alert("Veículo cadastrado com sucesso!")
    }else{
        alert("Não pode haver campos vazios!")
    }
}

function editarCarro(carro){
    document.getElementById('modalPlaca').value = carro[0]
    document.getElementById('modalMarca').value = carro[1]
    document.getElementById('modalModelo').value = carro[2]
}

function salvarEdicaoCarro(){
    const placa = document.getElementById('modalPlaca').value
    const marca = document.getElementById('modalMarca').value 
    const modelo = document.getElementById('modalModelo').value

    if (placa != '' && marca != '' && modelo != ''){
        for (let i = 0; i < array.length; i++){
            if (array[i][0] == placa){
                array[i][1] = marca
                array[i][2] = modelo
                break
            }
        }

        $('#myModal').modal('hide')
        atualizarTabela()
        alert("Veículo editado com sucesso!")
    }else{
        alert("Não pode haver campos vazios!")
    }
}

function excluirCarro(placa){
    for (let i = 0; i < array.length; i++){
        if (array[i][0] == placa){
            array.splice(i, 1)
            break
        }
    }
    atualizarTabela()
}


function atualizarTabela(){

    $('#tabelaCarro tbody').empty();
    
    const tabela = document.querySelector("#tabelaCarro tbody")
    console.log(tabela)
    for (let i = 0; i < array.length; i++){
        const row = document.createElement("tr")

        for (let j = 0; j < array[0].length; j++){
            const collum = document.createElement("td")
            collum.textContent = array[i][j]
            row.appendChild(collum)
        }

        const deleteCell = document.createElement("td")
        const deleteButton = document.createElement("button")
        deleteButton.textContent = "Excluir"
        deleteButton.onclick = function(){excluirCarro(array[i][0])}
        deleteCell.appendChild(deleteButton)
        row.appendChild(deleteCell)

        const editCell = document.createElement("td")
        const editButton = document.createElement("button")
        editButton.textContent = "Editar"
        editButton.type = "button";
        editButton.setAttribute("data-toggle", "modal");
        editButton.setAttribute("data-target", "#myModal");
        editButton.onclick = function(){editarCarro(array[i])}
        editCell.appendChild(editButton)
        row.appendChild(editCell)

        tabela.appendChild(row)
        
    }
}

jQuery(document).ready(function(){atualizarTabela()})
