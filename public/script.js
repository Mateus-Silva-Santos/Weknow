// Cadastrar Produto:
document.getElementById("form_cadastro").addEventListener("submit", (e) => {
    //e.preventDefault() // Não recarrega a página
    const nomeProduto = document.querySelector("#prod_name").value;// pega o valor do campo de descrição
    const descricaoProduto = document.querySelector("#prod_desc").value; // pega o valor do campo de descrição
    try {
        fetch("http://localhost:3000/produtos", // chama a API
            {
                method: 'POST', // Tipo de chamada
                headers: {
                    "Content-type": "application/json; charset=UTF-8" // Configuração do tipo de conteúdo que deseja passar
                },
                body: JSON.stringify({
                    "nome": nomeProduto,
                    "descricao": descricaoProduto
                }) // Converte em objeto JSON
            }).then(response => response.json()).then(data => {
                console.log(data) // Exibe os dados no console log
            });
    } catch (error) {
        console.log(error)
    }

});

// Obter Dados e Gerar Lista
construirTabela()
async function construirTabela(){
    const produtos = await fetch("http://localhost:3000/produtos", // chama a API
            {
                method: 'GET', // Tipo de chamada
                headers: {
                    "Content-type": "application/json; charset=UTF-8" // Configuração do tipo de conteúdo que deseja passar
                }
            }).then(response => response.json()).then((produtos) => {
                mostrarDados(produtos);
                document.querySelector("#prod_name").value = "";
                document.querySelector("#prod_desc").value = "";
            });
}

function mostrarDados(produtos){

    let linhaTabela = "";
    for (let produto of produtos){

        linhaTabela += `<tr><td>${produto.id}</td><td>${produto.nome}</td><td>${produto.descricao}</td><td><i class="fa fa-pen" aria-hidden="true"></i></td><td><i class="fa fa-trash"></i></td></tr>`
    }

    document.getElementById('result-table').innerHTML = linhaTabela;
}

// Recuperar Produto
document.getElementById("form_pesquisa").addEventListener("submit",(e) => {
    const codProduto = document.querySelector("#prod_id").value;
    e.preventDefault();
    try{
        fetch("http://localhost:3000/produtos/"+codProduto,{
            method:"GET",
            headers:{
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then(response => response.json()).then((produto) => {
            document.getElementById("result-table").innerHTML= `<tr><td>${produto.id}</td><td>${produto.nome}</td><td>${produto.descricao}</td><td><i class="fa fa-pen" aria-hidden="true"></i></td><td><i class="fa fa-trash"></i></td></tr>`;
            document.querySelector('#prod_id').value="";
        });
    }catch(error){
        console.log(error);
    }
});
