/*Menu*/
function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('active');
}

/*Notificação*/
function mostrarAviso(mensagem) {
    const container = document.getElementById('notification-container');
    const toast = document.createElement('div');
    toast.className = 'magical-toast';
    toast.innerHTML = `<span>✨ ${mensagem}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 3000);
}

/*Frases*/
const frases = [
    "O universo preparou algo especial para sua jornada hoje. (Dica: envolve você comprando mimos)",
    "Mercúrio não está mais retrógrado, pode finalizar esse carrinho sem culpa! ✨",
    "Sua intuição está dizendo que esse produto combina com a sua aura.",
    "Bebendo água e filtrando energias negativas com os sais cintilantes. 💧",
    "Previsão do dia: 100% de chance de você se apaixonar por algo novo aqui.",
    "Alinhando meus chakras e o meu carrinho de compras. 🧘‍♀️",
    "Não é magia, é apenas o seu brilho natural incomodando as sombras.",
    "As estrelas dizem: você merece um presente hoje! 🌟",
    "Manifestando boletos pagos e colares de cristais.",
    "Atenção: altos níveis de fofura e magia detectados no seu setor!",
    "Que a sua única dúvida hoje seja: dourado ou prateado? ✨",
    "Status: Em um relacionamento sério com a minha própria magia."
];

function mudarFraseMagica() {
    const elementoFrase = document.getElementById('lucky-phrase');
    const indiceAleatorio = Math.floor(Math.random() * frases.length);
    
    elementoFrase.innerText = frases[indiceAleatorio];
}

/*Pesquisa */
function filtrarProdutos() {
    const termoBusca = document.getElementById('input-busca').value.toLowerCase();
    
    if (termoBusca === "") {
        carregarProdutos(produtos); 
        return;
    }

    const filtrados = produtos.filter(produto => {
        const nomeMinusculo = produto.nome.toLowerCase();
        
        const palavras = nomeMinusculo.split(" ");
        
        return palavras.some(palavra => palavra.startsWith(termoBusca));
    });

    carregarProdutos(filtrados);
}

function getIcon(id) {
    const icones = {
        1: `<svg viewBox="0 0 24 24" fill="none" stroke="#f5d0e7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 100%; height: 100%;">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>`,

        2: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" style="width: 100%; height: 100%;">
                <path d="M 2,5 C 2,4.45 2.45,4 3,4 H 21 C 21.55,4 22,4.45 22,5 V 7 C 22,7.55 21.55,8 21,8 H 15.5 L 12.5,14 L 12.5,21.5 C 12.5,21.83 12.33,22.13 12.06,22.31 C 11.79,22.49 11.45,22.5 11.16,22.36 L 9.16,21.36 C 8.78,21.17 8.5,20.77 8.5,20.36 V 14 L 5.5,8 H 3 C 2.45,8 2,7.55 2,7 Z" stroke="#D4AF37" stroke-width="2" fill="none" />
            </svg>`
    };

    return icones[id] || '';
}

/*Filtros*/
function abrirModalFiltros() {
    const categoriasIniciais = produtos.map(p => p.categoria);
    const categoriasUnicas = [...new Set(categoriasIniciais)];

    let optionsHTML = `<option value="todas">Todas as Magias</option>`;
    categoriasUnicas.forEach(cat => {
        optionsHTML += `<option value="${cat}">${cat}</option>`;
    });

    const modalHTML = `
        <div id="modal-filtros" class="modal-overlay" onclick="fecharModalFiltros()">
            <div class="modal-content" onclick="event.stopPropagation()" style="max-width: 400px;">
                <button class="close-modal" onclick="fecharModalFiltros()">×</button>
                <h2 class="modal-title">Filtros Místicos</h2>
                
                <div class="form-magico" style="text-align: left; margin-top: 20px;">
                    <label style="color: #4A235A; font-weight: 600;">Categoria:</label>
                    <select id="filtro-categoria" class="input-magico" style="margin-bottom: 20px; width: 100%;">
                        ${optionsHTML}
                    </select>

                    <label style="color: #4A235A; font-weight: 600;">Faixa de Preço (R$):</label>
                    <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                        <input type="number" id="filtro-preco-min" class="input-magico" placeholder="Mínimo" min="0">
                        <input type="number" id="filtro-preco-max" class="input-magico" placeholder="Máximo" min="0">
                    </div>

                    <button class="register-btn" style="width: 100%;" onclick="aplicarFiltros()">Aplicar Magia</button>
                    <button class="view-btn" style="width: 100%; margin-top: 10px;" onclick="limparFiltros()">Limpar Filtros</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function fecharModalFiltros() {
    const modal = document.getElementById('modal-filtros');
    if (modal) modal.remove();
}

function aplicarFiltros() {
    const categoriaEscolhida = document.getElementById('filtro-categoria').value;
    const precoMinText = document.getElementById('filtro-preco-min').value;
    const precoMaxText = document.getElementById('filtro-preco-max').value;

    const precoMin = precoMinText ? parseFloat(precoMinText) : 0;
    const precoMax = precoMaxText ? parseFloat(precoMaxText) : Infinity;

    const filtrados = produtos.filter(produto => {
        const passaCategoria = categoriaEscolhida === "todas" || produto.categoria === categoriaEscolhida;

        const precoProduto = parseFloat(produto.preco.replace(',', '.'));

        const passaPreco = precoProduto >= precoMin && precoProduto <= precoMax;

        return passaCategoria && passaPreco;
    });

    carregarProdutos(filtrados);
    fecharModalFiltros();
}

function limparFiltros() {
    carregarProdutos(produtos);
    fecharModalFiltros();
    
    const inputBusca = document.getElementById('input-busca');
    if(inputBusca) inputBusca.value = ""; 
}

/*Produtos*/
const produtos = [
    {
        id: 1,
        nome: "Elixir de Confiança Inabalável",
        desc: "Perfume para se sentir a dona da magia toda. Perfume para se sentir a dona da magia todaPerfume para se sentir a dona da magia todaPerfume para se sentir a dona da magia todaPerfume para se sentir a dona da magia todaPerfume para se sentir a dona da magia todaPerfume para se sentir a dona da magia todaPerfume para se sentir a dona da magia todaPerfume para se sentir a dona da magia todaPerfume para se sentir a dona da magia todaPerfume para se sentir a dona da magia todaPerfume para se sentir a dona da magia todaPerfume para se sentir a dona da magia todaPerfume para se sentir a dona da magia todaPerfume para se sentir a dona da magia todaPerfume para se sentir a dona da magia todaPerfume para se sentir a dona da magia toda",
        preco: "127,00",
        imagem: "assets/imgs/produtos/perfume.png",
        categoria: "Amuletos"
    },
    {
        id: 2,
        nome: "Vela Xô, Urucubaca",
        desc: "Com aroma de alecrim e sal grosso, para queimar as energias negativas de e-mails de trabalho.",
        preco: "64,90",
        imagem: "assets/imgs/produtos/vela(3).png",
        categoria: "Velas"
    },
    {
        id: 3,
        nome: "Sais de Banho Brilho Estelar",
        desc: "Para um banho tão radiante que dá para ver do espaço.",
        preco: "42,00",
        imagem: "assets/imgs/produtos/sais.png",
        categoria: "Banho"
    },
    {
        id: 4,
        nome: "Gloss Feitiço do Sim",
        desc: "Ideal para convencer qualquer um (ou pedir aquele aumento!).",
        preco: "35,90",
        imagem: "assets/imgs/produtos/gloss.png",
        categoria: "Beleza"
    },
    {
        id: 5,
        nome: "Chá da Intuição Aguçada",
        desc: "Para não precisar mais pedir para São Longuinho.",
        preco: "28,00",
        imagem: "assets/imgs/produtos/cha.jpeg",
        categoria: "Ervas"
    },
    {
        id: 6,
        nome: "Quartzo Rosa Amor de Mim",
        desc: "Cristal focado em parar de te fazer se comparar com os outros.",
        preco: "25,00",
        imagem: "assets/imgs/produtos/cristais.jpg",
        categoria: "Cristais"
    },
    {
        id: 7,
        nome: "Spray Escudo Anti-Estresse",
        desc: "Borrifar sempre que seu chefe te pedir para escalar o Everest com uma mão só.",
        preco: "48,00",
        imagem: "assets/imgs/produtos/spray.png",
        categoria: "Amuletos"
    },
    {
        id: 8,
        nome: "Grimório de Metas Impossíveis",
        desc: "Caderno que realiza todos seus sonhos, basta escrevê-los (pode até fazer os bugs do seu código sumirem).",
        preco: "89,90",
        imagem: "assets/imgs/produtos/grimorio.png",
        categoria: "Papelaria"
    }
];

function criarCard(produto, tipo) {

    if (tipo === 1) {
        return `
            <article class="product-card">
                <div class="product-image" onclick="abrirZoom(${produto.id})">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                </div>
                <div class="product-info">
                    <span class="category-tag">${produto.categoria}</span>
                    <h3>${produto.nome}</h3>
                    <p class="price">R$ ${produto.preco}</p>
                    <div class="card-buttons">
                        <button class="view-btn" onclick="abrirZoom(${produto.id})">Ver Detalhes</button>
                        <button class="add-to-cart-btn" onclick="adicionarAoCaldeirao(${produto.id})">
                            <span>Adicionar ao Caldeirão</span>
                        </button>
                    </div>
                </div>
            </article>
        `;
    }

    if (tipo === 2) {
        return `
            <div class="modal-body">
                <div class="modal-img">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                </div>
                
                <div class="modal-desc">
                    <div class="modal-info">
                        <span class="category-tag">${produto.categoria}</span>
                        <h2>${produto.nome}</h2>
                        <p class="full-description">${produto.desc}</p>
                    </div>

                    <div class="modal-compra">
                        <p class="price">R$ ${produto.preco}</p>
                        <button class="add-to-cart-btn" onclick="adicionarAoCaldeirao(${produto.id}); fecharZoom()">
                            Colocar no Caldeirão ✨
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}

function carregarProdutos(lista = produtos) {
    const grid = document.getElementById('product-list');
    
    if (!grid) return; 

    grid.innerHTML = "";

    lista.forEach(produto => {
        const card = criarCard(produto, 1);
        grid.innerHTML += card;
    });
}

function abrirZoom(id) {
    const produto = produtos.find(p => p.id === id);

    const card = criarCard(produto, 2);

    const zoomHTML = `
        <div id="modal-zoom" class="modal-overlay" onclick="fecharZoom()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <button class="close-modal" onclick="fecharZoom()">×</button>
                ${card} 
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', zoomHTML);
}

function fecharZoom() {
    const modal = document.getElementById('modal-zoom');
    if (modal) modal.remove();
}

/*Adicionar ao carrinho*/
let carrinhoCount = 0;

function adicionarAoCaldeirao(id) {
    const emailLogado = localStorage.getItem('email_bruxinha');
    
    if (!emailLogado) {
        mostrarAviso("Sintonize sua magia primeiro!");
        abrirModalLogin();
        return; 
    }

    let listaBruxas = JSON.parse(localStorage.getItem('grimorio_usuarios')) || [];

    const index = listaBruxas.findIndex(b => b.email === emailLogado);

    if (index !== -1) {
        const produtoClicado = produtos.find(p => p.id === id);
        
        if (!listaBruxas[index].lista_compras) {
            listaBruxas[index].lista_compras = [];
        }

        const itemExistente = listaBruxas[index].lista_compras.find(item => item.id === id);

        if (itemExistente) {
            itemExistente.quantidade = (itemExistente.quantidade || 1) + 1;
        } else {
            listaBruxas[index].lista_compras.push({ ...produtoClicado, quantidade: 1 });
        }

        localStorage.setItem('grimorio_usuarios', JSON.stringify(listaBruxas));
        
        const totalItens = listaBruxas[index].lista_compras.reduce((a, b) => a + (b.quantidade || 1), 0);
        document.getElementById('num-carrinho').innerText = totalItens;

        mostrarAviso(`${produtoClicado.nome} adicionado! ✨`);
    }
}

function entrarCaldeirao() {
    const emailInfo = document.getElementById('login-email').value + "@gmail.com";
    const senhaInfo = document.getElementById('login-senha').value;

    let listaBruxas = JSON.parse(localStorage.getItem('grimorio_usuarios')) || [];
    
    const bruxaEncontrada = listaBruxas.find(b => b.email === emailInfo && b.senha === senhaInfo);

    if (bruxaEncontrada) {
        localStorage.setItem('nome_bruxinha', bruxaEncontrada.nome);
        localStorage.setItem('email_bruxinha', bruxaEncontrada.email);
        mostrarAviso(`Bem-vinda de volta, ${bruxaEncontrada.nome}!`);
        window.location.reload();
    } else {
        mostrarAviso("Falha ao sincronizar magia. Palavra mágica ou correio mágicos incorretos. Tente novamente, bruxinha!");
    }
}

function salvarBruxinha() {
    const nome = document.getElementById('reg-nome').value;
    const emailStr = document.getElementById('reg-email').value;
    const senha = document.getElementById('reg-senha').value;

    if (!nome || !emailStr || !senha) return mostrarAviso("Preencha todos os campos mágicos!");

    let listaBruxas = JSON.parse(localStorage.getItem('grimorio_usuarios')) || [];
    
    if (listaBruxas.some(b => b.email === emailStr + "@gmail.com")) {
        return mostrarAviso("Este correio mágico já está registrado!");
    }

    const novaBruxa = {
        nome: nome,
        email: emailStr + "@gmail.com",
        senha: senha,
        lista_compras: []
    };

    listaBruxas.push(novaBruxa);
    localStorage.setItem('grimorio_usuarios', JSON.stringify(listaBruxas));
    localStorage.setItem('nome_bruxinha', nome);
    localStorage.setItem('email_bruxinha', emailStr + "@gmail.com");

    mostrarAviso("Grimório criado com sucesso!");
    window.location.reload();
}

function carregarCaldeirao() {
    const emailLogado = localStorage.getItem('email_bruxinha');
    
    if (!emailLogado) {
        document.getElementById('num-carrinho').innerText = "0";
        return;
    }

    const listaBruxas = JSON.parse(localStorage.getItem('grimorio_usuarios')) || [];
    
    const minhaBruxa = listaBruxas.find(b => b.email === emailLogado);
    
    if (minhaBruxa && minhaBruxa.lista_compras) {
        const totalReal = minhaBruxa.lista_compras.reduce((a, b) => a + (b.quantidade || 1), 0);
        document.getElementById('num-carrinho').innerText = totalReal;
    } else {
        document.getElementById('num-carrinho').innerText = "0";
    }
}

/*log in*/
function abrirModalLogin() {
    const nomeSalvo = localStorage.getItem('nome_bruxinha');

    let conteudoModal = "";

    if (nomeSalvo) {
        conteudoModal = `
            <div class="modal-login-body">
                <img src="assets/imgs/simbolos/bruxinha.png" alt="Bruxinha" class="login-img">
                <h2>Olá, Bruxa ${nomeSalvo}!</h2>
                <h3>Sua conta está ativa e sua magia está carregada.</h3>
                <button class="login-btn" onclick="logout()">Sair da Conta</button>
            </div>
        `;
    } else {
        conteudoModal = `
            <div class="modal-login-body">
                <img src="assets/imgs/simbolos/bruxinha.png" alt="Bruxinha" class="login-img">
                <h2>Sintonize sua magia</h2>
                <div class="card-buttons">
                    <button class="register-btn" onclick="fluxoCadastro()">Me tornar uma bruxinha</button>
                    <button class="login-btn" onclick="fluxoLogin()">Já sou uma bruxinha</button>
                </div>
            </div>
        `;
    }

    const modalHTML = `
        <div id="modal-login" class="modal-overlay" onclick="fecharModalLogin()">
            <div class="modal-content" onclick="event.stopPropagation()" style="max-width: 400px; text-align: center;">
                <button class="close-modal" onclick="fecharModalLogin()">×</button>
                ${conteudoModal}
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function fluxoCadastro() {
    const container = document.querySelector('.modal-login-body');
    
    container.innerHTML = `
        <h2>Nova Bruxinha</h2>
        <p>Inicie sua jornada mística</p>
        
        <div class="form-magico">
            <input type="text" id="reg-nome" placeholder="Nome de bruxa" class="input-magico">
            
            <div class="email-wrapper">
                <input type="text" id="reg-email" placeholder="correio mágico">
                <span class="sufixo">@gmail.com</span>
            </div>
            
            <input type="password" id="reg-senha" placeholder="Palavra mágica" class="input-magico">
            
            <button class="register-btn" onclick="salvarBruxinha()">Criar Grimório</button>
            <p class="toggle-link" onclick="fluxoLogin()">Já sou uma bruxinha</p>
        </div>
    `;
}

function fluxoLogin() {
    const container = document.querySelector('.modal-login-body');
    
    container.innerHTML = `
        <h2>Bem-vinda de volta</h2>
        <div class="form-magico">
            <div class="email-wrapper">
                <input type="text" id="login-email" placeholder="correio mágico">
                <span class="sufixo">@gmail.com</span>
            </div>
            
            <input type="password" id="login-senha" placeholder="Palavra mágica" class="input-magico">
            
            <button class="login-btn" onclick="entrarCaldeirao()">Entrar no Caldeirão</button>
            <p class="toggle-link" onclick="fluxoCadastro()">Quero me tornar uma bruxinha</p>
        </div>
    `;
}

function logout() {
    localStorage.removeItem('nome_bruxinha');
    mostrarAviso("Sua sessão foi encerrada. Até a próxima jornada!");
    fecharModalLogin();
    atualizarNomeUsuario();
}

function atualizarNomeUsuario() {
    const spanNome = document.getElementById('user-name');
    const nomeSalvo = localStorage.getItem('nome_bruxinha');
    spanNome.innerText = nomeSalvo ? `Oi, ${nomeSalvo}!` : "";
}

function fecharModalLogin() {
    const modal = document.getElementById('modal-login');
    if (modal) {
        modal.remove();
    }
}

/*Caldeirão*/
function abrirModalCarrinho() {
    const emailLogado = localStorage.getItem('email_bruxinha');
    
    if (!emailLogado) {
        mostrarAviso("Sintonize sua magia primeiro para ver seu caldeirão!");
        abrirModalLogin();
        return;
    }

    const listaBruxas = JSON.parse(localStorage.getItem('grimorio_usuarios')) || [];
    const minhaBruxa = listaBruxas.find(b => b.email === emailLogado);
    const itens = minhaBruxa.lista_compras || [];

    let total = 0;
    let listaHTML = "";

    if (itens.length === 0) {
        listaHTML = `<p class="empty-msg">Seu caldeirão está vazio e frio... <br> Adicione itens para começar a magia! ✨</p>`;
    } else {
        listaHTML = itens.map((item, index) => {

            const qtd = item.quantidade || 1;
            
            const valorNumerico = parseFloat(item.preco.replace(',', '.'));
            const subtotal = valorNumerico * qtd;
            total += subtotal;

                return `
                    <div class="cart-item">
                        <img src="${item.imagem}" alt="${item.nome}" onclick="fecharModalCarrinho(); abrirZoom(${item.id})" class="cart-item-clickable">
                        
                        <div class="cart-item-info">
                            <h4>${item.nome}</h4>
                            <p>R$ ${item.preco}</p>

                            <div class="qt-selector">
                                <button class="qt-btn" onclick="alterarQuantidade(${index}, -1)">−</button>
                                <span class="qt-number">${qtd}</span>
                                <button class="qt-btn" onclick="alterarQuantidade(${index}, 1)">+</button>
                            </div>
                        </div>

                        <button class="remove-btn" onclick="removerDoCaldeirao(${index})">🗑️</button>
                    </div>
                `;
        }).join("");
    }

    const modalHTML = `
        <div id="modal-carrinho" class="modal-overlay" onclick="fecharModalCarrinho()">
            <div class="modal-content" onclick="event.stopPropagation()" style="max-width: 500px;">
                <button class="close-modal" onclick="fecharModalCarrinho()">×</button>
                <h2 class="modal-title">Seu Caldeirão Místico</h2>
                
                <div class="cart-items-container">
                    ${listaHTML}
                </div>

                <div class="cart-footer">
                    <div class="total-container">
                        <span>Total da Jornada:</span>
                        <span class="total-price">R$ ${total.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <button class="checkout-btn" onclick="finalizarCompra()" ${itens.length === 0 ? 'disabled' : ''}>
                        Finalizar Alquimia
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function alterarQuantidade(indexItem, mudanca) {
    const emailLogado = localStorage.getItem('email_bruxinha');
    let listaBruxas = JSON.parse(localStorage.getItem('grimorio_usuarios')) || [];

    const indexBruxa = listaBruxas.findIndex(b => b.email === emailLogado);

    if (indexBruxa !== -1) {
        let bruxa = listaBruxas[indexBruxa];
        let item = bruxa.lista_compras[indexItem];

        if (!item.quantidade) item.quantidade = 1;

        item.quantidade += mudanca;

        if (item.quantidade < 1) {
            removerDoCaldeirao(indexItem);
            return;
        }

        localStorage.setItem('grimorio_usuarios', JSON.stringify(listaBruxas));
        
        fecharModalCarrinho();
        abrirModalCarrinho();
        carregarCaldeirao(); 
    }
}

function removerDoCaldeirao(index) {
    const emailLogado = localStorage.getItem('email_bruxinha');
    let listaBruxas = JSON.parse(localStorage.getItem('grimorio_usuarios')) || [];

    const userIndex = listaBruxas.findIndex(b => b.email === emailLogado);

    if (userIndex !== -1) {
        listaBruxas[userIndex].lista_compras.splice(index, 1);

        localStorage.setItem('grimorio_usuarios', JSON.stringify(listaBruxas));
        
        fecharModalCarrinho();
        abrirModalCarrinho();
        carregarCaldeirao(); 
        
        mostrarAviso("Item mágico removido do caldeirão! 💨");
    }
}

function fecharModalCarrinho() {
    const modal = document.getElementById('modal-carrinho');
    if (modal) modal.remove();
}

function finalizarCompra() {
    mostrarAviso("Sua encomenda foi enviada para as estrelas! Em breve chegará em sua casa. ✨");
}

function finalizarCompra() {
    const emailLogado = localStorage.getItem('email_bruxinha');
    let listaBruxas = JSON.parse(localStorage.getItem('grimorio_usuarios')) || [];
    
    const index = listaBruxas.findIndex(b => b.email === emailLogado);

    if (index !== -1) {
        listaBruxas[index].lista_compras = [];

        localStorage.setItem('grimorio_usuarios', JSON.stringify(listaBruxas));

        fecharModalCarrinho();
        carregarCaldeirao();
        
        mostrarAviso("Sua encomenda foi enviada para as estrelas! Em breve chegará no seu plano astral. Caldeirão limpo e pronto para a próxima magia. ✨");
    } else {
        mostrarAviso("Erro ao processar sua magia. Tente novamente!");
    }
}


/*Carregamento de funções*/
window.addEventListener('load', () => {
    const containerLupa = document.getElementById('container-lupa');
    const btnFiltro = document.getElementById('btn-filtro');

    if (containerLupa) containerLupa.innerHTML = getIcon(1);
    if (btnFiltro) btnFiltro.innerHTML = getIcon(2);

    mudarFraseMagica();
    carregarProdutos();
    atualizarNomeUsuario();
    carregarCaldeirao();
});

window.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
        fecharZoom();
    }
});