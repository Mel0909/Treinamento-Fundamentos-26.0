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


/*Produtos*/
const produtos = [
    {
        id: 1,
        nome: "Elixir de Confiança Inabalável",
        desc: "Perfume para se sentir a dona da magia toda.",
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
                        <button class="add-to-cart-btn" onclick="adicionarAoCauldron(${produto.id})">
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
                        <button class="add-to-cart-btn" onclick="adicionarAoCauldron(${produto.id}); fecharZoom()">
                            Colocar no Caldeirão ✨
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}

function carregarProdutos() {
    const grid = document.getElementById('product-list');
    grid.innerHTML = "";

    produtos.forEach(produto => {
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

function adicionarAoCauldron(id) {
    carrinhoCount++;
    document.getElementById('num-carrinho').innerText = carrinhoCount;
 
    console.log("Produto " + id + " adicionado à sua jornada!");
}

/*Carregamento de funções*/
window.addEventListener('load', () => {
    mudarFraseMagica();
    carregarProdutos();
});

window.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
        fecharZoom();
    }
});