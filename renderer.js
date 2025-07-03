let carrinho = [];

function produtoRapido(nome, preco) {
  document.getElementById('nomeProduto').value = nome;
  document.getElementById('precoProduto').value = preco;
}

function adicionarAoCarrinho() {
  const nome = document.getElementById('nomeProduto').value;
  const preco = parseFloat(document.getElementById('precoProduto').value);
  const qtd = parseInt(document.getElementById('quantidadeProduto').value);

  if (!nome || isNaN(preco) || isNaN(qtd) || qtd <= 0) return;

  const subtotal = preco * qtd;
  carrinho.push({ nome, preco, qtd, subtotal });

  renderCarrinho();
  atualizarCupom();
}

function renderCarrinho() {
  const tbody = document.getElementById('carrinho');
  tbody.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, i) => {
    total += item.subtotal;
    tbody.innerHTML += `
      <tr>
        <td>${item.nome}</td>
        <td>R$ ${item.preco.toFixed(2)}</td>
        <td>${item.qtd}</td>
        <td>R$ ${item.subtotal.toFixed(2)}</td>
        <td><button onclick="removerItem(${i})">🗑</button></td>
      </tr>
    `;
  });

  document.getElementById('total').textContent = `R$ ${total.toFixed(2)}`;
  document.getElementById('visorTotal').textContent = total.toFixed(2);
  document.getElementById('cupomTotal').textContent = `R$ ${total.toFixed(2)}`;
}

function removerItem(index) {
  carrinho.splice(index, 1);
  renderCarrinho();
  atualizarCupom();
}

function atualizarCupom() {
  const cupom = document.getElementById('cupomItens');
  if (carrinho.length === 0) {
    cupom.innerHTML = "Nenhum item adicionado";
    return;
  }

  cupom.innerHTML = carrinho.map(item =>
    `${item.qtd}x ${item.nome} - R$ ${(item.qtd * item.preco).toFixed(2)}`
  ).join("<br>");

  document.getElementById('codigoCupom').textContent = gerarCodigoCupom();
}

function gerarCodigoCupom() {
  const data = new Date();
  return `${data.getFullYear()}${(data.getMonth()+1).toString().padStart(2,'0')}${data.getDate().toString().padStart(2,'0')}-${Math.floor(Math.random()*1000).toString().padStart(4,'0')}`;
}

document.getElementById("dataHora").textContent = new Date().toLocaleString();
