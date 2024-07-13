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
    const tabelaCarrinho = document.getElementById('tabela_carrinho').getElementsByTagName('tbody')[0];
    tabelaCarrinho.innerHTML = '';
    let total = 0;
    produtos_carrinho.forEach((item, index) => {
        const linha = document.createElement('tr');

        const celulaNome = document.createElement('td');
        celulaNome.textContent = item.nome;
        linha.appendChild(celulaNome);

        const celulaPreco = document.createElement('td');
        celulaPreco.textContent = `R$ ${item.preco.toFixed(2)}`;
        linha.appendChild(celulaPreco);

        const celulaQuantidade = document.createElement('td');
        celulaQuantidade.textContent = item.quantidade;
        linha.appendChild(celulaQuantidade);

        const celulaRemover = document.createElement('td');
                const botaoRemover = document.createElement('button');
                botaoRemover.textContent = 'x';
                botaoRemover.onclick = () => removerItem(index);
                celulaRemover.appendChild(botaoRemover);
                linha.appendChild(celulaRemover);

        tabelaCarrinho.appendChild(linha);
        total += item.preco * item.quantidade;
    });

    const totalCompra = document.getElementById('total_carrinho');
    totalCompra.textContent = `Total: R$ ${total.toFixed(2)}`;
    listaCarrinho.appendChild(totalCompra);
}

function removerItem(index) {
    produtos_carrinho.splice(index, 1); // Remove o item do array
    atualizarCarrinho(); // Atualiza a tabela
}
function enviarPedido() {
    if (produtos_carrinho.length === 0) {
        alert("O carrinho está vazio. Adicione itens ao carrinho antes de enviar o pedido.");
        return;
    }

    let mensagem = "Olá, gostaria de fazer o seguinte pedido:\n\n";
    produtos_carrinho.forEach(item => {
        mensagem += `- ${item.nome} (R$ ${item.preco.toFixed(2)}) x ${item.quantidade}\n`;
    });
    const total = produtos_carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    mensagem += `\nTotal: R$ ${total.toFixed(2)}\n\nObrigado!`;

    const whatsappURL = `https://api.whatsapp.com/send?phone=seu_numero&text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappURL, '_blank');
}

document.getElementById('enviar_pedido').addEventListener('click', enviarPedido);

atualizarCarrinho();

