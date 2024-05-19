let produtos_carrinho = [];
let quantidade_desejada = {};

function aumentarQuantidade(nome_produto){
    if (!quantidade_desejada[nome_produto]) {

        quantidade_desejada[nome_produto] = 0;
    }

    ++quantidade_desejada[nome_produto];

    document.getElementById(`quantidade_${nome_produto}_desejada`).textContent = quantidade_desejada[nome_produto];

}

function diminuirQuantidade(nome_produto){
    if(!quantidade_desejada[nome_produto]){
        quantidade_desejada[nome_produto] = 0;
    }else if (quantidade_desejada[nome_produto] >0) {
        --quantidade_desejada[nome_produto];
    }

    document.getElementById(`quantidade_${nome_produto}_desejada`).textContent = quantidade_desejada[nome_produto];
}


function adicionarCarrinho(nomeProduto,precoProduto){
    const quantidade = quantidade_desejada[nomeProduto] || 0;

    if (quantidade > 0) {
        const itemExistenteIndex = produtos_carrinho.findIndex(item => item.nome === nomeProduto);
        if (itemExistenteIndex > -1) {
            produtos_carrinho[itemExistenteIndex].quantidade += quantidade;
            
        }else{
            produtos_carrinho.push({nome: nomeProduto, preco: precoProduto, quantidade: quantidade });
        }
        quantidade_desejada[nomeProduto] = 0;

        document.getElementById(`quantidade_${nomeProduto}_desejada`).textContent = 0;
        
    }else {
        alert("Selecione uma quantidade antes de adicionar ao carrinho.");
    }
    atualizarCarrinho();
}
function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('carrinho_itens');
    listaCarrinho.innerHTML = '';
    let total = 0;
    produtos_carrinho.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade}`;
        listaCarrinho.appendChild(li);
        total += item.preco * item.quantidade;
    });

    const totalElement = document.createElement('li');
    totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
    listaCarrinho.appendChild(totalElement);
}