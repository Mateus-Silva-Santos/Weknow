// Endereço da API:
var api_url = "http://18.231.42.102:3000/api/produtos";
// Mostrar tabela com valores atuais da API:
construirTabela();

// Cadastrar Produto:
document.getElementById("form_cadastro").addEventListener("submit", (e) => {
    const descricaoProduto = document.querySelector("#prod_desc").value; // pega o valor do campo de descrição
    e.preventDefault() // Não recarrega a página
    try {
        fetch(api_url, // chama a API
            {
                method: 'POST', // Tipo de chamada
                headers: {
                    "Content-Type": "application/json; charset=UTF-8" // Configuração do tipo de conteúdo que deseja passar
                },
                body: JSON.stringify({
                    "descricao": descricaoProduto
                }) // Converte em objeto JSON
            }).then(response => response.json()).then(data => {
                console.log(data); // Exibe os dados no console log
                construirTabela();
            });
    } catch (error) {
        console.log(error)
    }

});

// Recuperar Produto:
document.getElementById("form_pesquisa").addEventListener("submit",(e) => {
    const codProduto = document.querySelector("#prod_id").value;
    e.preventDefault();
    try{
        fetch(api_url+"/"+codProduto,{
            method:"GET",
            headers:{
                "Content-Type": "application/json; charset=UTF-8",
            }
        }).then(response => response.json()).then((produto) => {
            const {_id,descricao} = produto;
            document.getElementById("result-table").innerHTML= `<tr><td>${_id}</td><td>${descricao}</td><td onClick="editarProduto('${_id}','${descricao}')"><i class="fa fa-pen" aria-hidden="true"></i></td><td onClick="deletarProduto('${_id}')"><i class="fa fa-trash"></i></td></tr>`;
            document.querySelector('#prod_id').value="";
        });
    }catch(error){
        console.log(error);
    }
});

// Editar Produto:
function editarProduto(_id,descricao){
    // Mostrar Valores Atuais nos Campos
    document.querySelector('#prod_cod_id').value = _id;
    document.querySelector('#prod_desc').value = descricao;
    // Botão Atualizar
    document.querySelector('#btn_atualizar').disabled = false;
    document.querySelector('#btn_atualizar').style.backgroundColor = "#8A60EB";
    // Botão cadastrar
    document.querySelector('#btn_cadastrar').disabled = true;
    document.querySelector('#btn_cadastrar').style.backgroundColor = "#7f8c8d";
}

function atualizarValores(){
    //Pegar Valores Atualizados
    const prod_id = document.querySelector('#prod_cod_id').value;
    const prod_desc = document.querySelector('#prod_desc').value;

        // Chamar API
        fetch(api_url+"/"+prod_id,{
            method:"PUT",
            headers:{
                "Content-Type": "application/json; charset=UTF-8"
            },
            body:JSON.stringify({
                "id":prod_id,
                "descricao":prod_desc,
                "__v":0
            })
        }).then(response => response.json()).then(produto => {
            // Botão Atualizar
                document.querySelector('#btn_atualizar').disabled = true;
                document.querySelector('#btn_atualizar').style.backgroundColor = "#7f8c8d";
            // Botão cadastrar
                document.querySelector('#btn_cadastrar').disabled = false;
                document.querySelector('#btn_cadastrar').style.backgroundColor = "#8A60EB";
            // Atualizar Tabela
                construirTabela();
        });
}

// Deletar Produto:
function deletarProduto(_id){
    console.log(_id);
    fetch(api_url+"/"+_id,{
        method:"DELETE",
        headers:{
            "Content-Type": "application/json; charset=UTF-8",
        }
    }).then(response => console.log(response)).then((produto) => {
        construirTabela();
    });
}

// Obter Dados e Gerar Lista:
async function construirTabela(){
    const produtos = await fetch(api_url, // chama a API
            {
                method: 'GET', // Tipo de chamada
                headers: {
                    "Content-Type": "application/json; charset=UTF-8" // Configuração do tipo de conteúdo que deseja passar
                }
            }).then(response => response.json()).then((produtos) => {
                mostrarDados(produtos);
                document.querySelector("#prod_desc").value = "";
            });
}

// Montar exibição dos registros da tabela:
function mostrarDados(produtos){
    let linhaTabela = "";
    for (let produto of produtos){
        const {_id,descricao} = produto;
        linhaTabela += `<tr><td>${_id}</td><td>${descricao}</td><td onClick="editarProduto('${_id}','${descricao}')"><i class="fa fa-pen" aria-hidden="true"></i></td><td onClick="deletarProduto('${_id}')"><i class="fa fa-trash"></i></td></tr>`
    }
    document.getElementById('result-table').innerHTML = linhaTabela;
}





