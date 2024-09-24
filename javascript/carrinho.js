let produtos_carrinho = [];
let quantidade_desejada = {};
let contagem_carrinho = 0;

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
    aumentarCarrinho();
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

        // Busca a div do produto pelo ID e extrai o h3 e a imagem
        const produtoDiv = document.getElementById(item.nome);
        const nomeProdutoH3 = produtoDiv ? produtoDiv.querySelector('h3').textContent : item.nome;
        const imagemProdutoSrc = produtoDiv ? produtoDiv.querySelector('img').src : '';

        // Cria a célula que vai conter a imagem e o nome
        const celulaNome = document.createElement('td');

        // Adiciona a imagem ao lado do nome
        const imagemProduto = document.createElement('img');
        imagemProduto.src = imagemProdutoSrc;
        imagemProduto.alt = nomeProdutoH3;
        imagemProduto.style.width = '50px';  // Define o tamanho da imagem (ajuste como necessário)
        imagemProduto.style.marginRight = '10px';  // Adiciona um espaço entre a imagem e o nome

        // Cria um span para o nome do produto
        const nomeProdutoSpan = document.createElement('span');
        nomeProdutoSpan.textContent = nomeProdutoH3;

        // Adiciona a imagem e o nome à célula
        celulaNome.appendChild(imagemProduto);
        celulaNome.appendChild(nomeProdutoSpan);
        linha.appendChild(celulaNome);

        // Cria a célula do preço
        const celulaPreco = document.createElement('td');
        celulaPreco.textContent = `R$ ${item.preco.toFixed(2)}`;
        linha.appendChild(celulaPreco);

        // Cria a célula da quantidade
        const celulaQuantidade = document.createElement('td');
        celulaQuantidade.textContent = item.quantidade;
        linha.appendChild(celulaQuantidade);

        // Cria a célula para o botão de remover
        const celulaRemover = document.createElement('td');
        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'x';
        botaoRemover.onclick = () => removerItem(index);
        celulaRemover.appendChild(botaoRemover);
        linha.appendChild(celulaRemover);

        // Adiciona a linha à tabela
        tabelaCarrinho.appendChild(linha);

        // Calcula o total do carrinho
        total += item.preco * item.quantidade;
    });

    // Atualiza o total
    const totalCompra = document.getElementById('total_carrinho');
    totalCompra.textContent = `Total: R$ ${total.toFixed(2)}`;
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
    const numeroWhatsApp = '+55084986720257';
    const whatsappURL = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappURL, '_blank');
}

function aumentarCarrinho(){
    ++contagem_carrinho;
    document.querySelector('.cart-count').textContent = contagem_carrinho;
}

document.getElementById('enviar_pedido').addEventListener('click', enviarPedido);


atualizarCarrinho();

