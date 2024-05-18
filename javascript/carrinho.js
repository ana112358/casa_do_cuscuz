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


