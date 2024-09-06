function cadastrarCarroBD() {
    const placa = $('#fplaca').val();
    const marca = $('#fmarca').val();
    const modelo = $('#fmodelo').val();

    const carroJson = {
        placa: placa,
        marca: marca,
        modelo: modelo,
        action: "cadastro"
    };

    console.log(carroJson)

    if (placa != '' && marca != '' && modelo != '') {
        $.ajax({
            url: 'db/crudCarro.php',
            type: 'POST',
            data: carroJson,
            dataType: "json",
            success: function (response) {
                if (!response.success) {
                    return alert("Error: " + response.message);
                }
                $('#fplaca').val('');
                $('#fmarca').val('');
                $('#fmodelo').val('');
                $('#cadastrarModal').modal('hide');
                atualizarTabela();
                alert("Veículo cadastrado com sucesso!");
            },
            error: function (erro) {
                console.error(erro);
                alert("Ocorreu um erro ao cadastrar o veículo.");
            }
        });
    } else {
        alert("Não pode haver campos vazios!");
    }
}

async function getCarrosBD(action, placa = null) {
    // console.log(action)
    try {
        // Use fetch to make the request
        var body = new FormData();
        // const body = {action: action, placa: placa};
        body.append("action", action);
        body.append("placa", placa);
        // console.log(JSON.stringify(body))
        const response = await fetch('db/crudCarro.php', {
            method: 'POST',
            body: body,
            dataType: "json",
        });

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON data from the response
        const data = await response.json();
        return data; // Properly return the data
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error to be caught in the calling function
    }
}

function editarCarro(carro) {
    console.log(carro)

    $('#modalPlaca').val(carro['placa'])
    $('#modalMarca').val(carro['marca'])
    $('#modalModelo').val(carro['modelo'])
}

async function salvarEdicaoCarro() {
    const placa = $('#modalPlaca').val()
    const marca = $('#modalMarca').val()
    const modelo =  $('#modalModelo').val()

    console.log(placa, marca, modelo)

    if (placa != '' && marca != '' && modelo != '') {

        try {
            var body = new FormData();
            body.append("action", "update");
            body.append("placa", placa);
            body.append("marca", marca);
            body.append("modelo", mode  lo);
            console.log(body);
            const response = await fetch('db/crudCarro.php', {
                method: 'POST',
                body: body,
            });

            // Check if the response is ok (status in the range 200-299)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error to be caught in the calling function
        }
        $('#myModal').modal('hide')
        atualizarTabela()
        alert("Veículo editado com sucesso!")
    } else {
        alert("Não pode haver campos vazios!")
    }
}

async function excluirCarroBD(placa) {
    try {
        var body = new FormData();
        body.append("action", "delete");
        body.append("placa", placa);
        const response = await fetch('db/crudCarro.php', {
            method: 'POST',
            body: body,
        });

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error to be caught in the calling function
    }
    atualizarTabela()
}

function limparFiltro() {
    $("#filter").val('');
    atualizarTabela();
}

async function atualizarTabela(filter = "getAll") {
    const tabela = document.querySelector("#tabelaCarro tbody");
    tabela.innerHTML = ''; // Clear the table body

    try {

        let valorFiltro = document.getElementById("filter").value;

        if (valorFiltro != null && valorFiltro != '') {
            filter = "filtro";
        }

        const dados = await getCarrosBD(filter, valorFiltro);
        console.log(dados);

        const fragment = document.createDocumentFragment();

        dados.forEach(carro => {
            const row = document.createElement("tr");

            // Create table cells for each property in the object
            for (const value of Object.values(carro)) {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            }

            // Create action buttons cell
            const actionCell = document.createElement("td");
            actionCell.appendChild(createButton("Excluir", "red-button", () => excluirCarroBD(carro['placa'])));
            actionCell.appendChild(createButton("Editar", "gray-button", () => editarCarro(carro), {
                type: "button",
                "data-toggle": "modal",
                "data-target": "#myModal"
            }));

            row.appendChild(actionCell);
            fragment.appendChild(row);
        });

        tabela.appendChild(fragment); // Append the fragment to the table body

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Helper function to create a button with specified properties
function createButton(text, className, onClick, attributes = {}) {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add(className);
    button.onclick = onClick;

    for (const [key, value] of Object.entries(attributes)) {
        button.setAttribute(key, value);
    }

    return button;
}


jQuery(document).ready(async function () { atualizarTabela() })

