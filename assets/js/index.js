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

window.onload = mudarFraseMagica;