// Banco de Dados de Alimentos (Exemplo)
const databaseAlimentos = [
    { nome: "Arroz Branco", cal: 130 }, { nome: "Feijão Preto", cal: 91 },
    { nome: "Filé de Frango", cal: 165 }, { nome: "Ovo Cozido", cal: 155 },
    { nome: "Batata Doce", cal: 86 }, { nome: "Aveia em Flocos", cal: 389 },
    { nome: "Pasta de Amendoim", cal: 588 }, { nome: "Whey Protein", cal: 390 },
    { nome: "Banana", cal: 89 }, { nome: "Salmão", cal: 208 },
    { nome: "Brócolis", cal: 34 }, { nome: "Patinho Moído", cal: 219 }
];

// --- CALCULADORA ---
document.getElementById('calc-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const idade = parseInt(document.getElementById('idade').value);
    const genero = document.getElementById('genero').value;
    
    // Equação de Mifflin-St Jeor (Padrão Ouro Atual)
    let tmb = (genero === 'masculino') 
        ? (10 * peso) + (6.25 * altura) - (5 * idade) + 5 
        : (10 * peso) + (6.25 * altura) - (5 * idade) - 161;

    const manutencao = Math.round(tmb * 1.55); // Fator de atividade moderada
    
    // Salva no localStorage para usar no Dashboard
    localStorage.setItem('meusKcal', manutencao);

    document.getElementById('tmb-valor').innerText = Math.round(tmb);
    document.getElementById('manutencao').innerText = manutencao;
    document.getElementById('perda').innerText = manutencao - 500;
    document.getElementById('ganho').innerText = manutencao + 400;
    
    document.getElementById('resultado').classList.remove('hidden');
    document.getElementById('resultado').scrollIntoView({ behavior: 'smooth' });
});

// --- BIBLIOTECA DE ALIMENTOS ---
const inputBusca = document.getElementById('food-search');
const listaResultados = document.getElementById('food-list');

function renderizar(filtro = "") {
    if(!listaResultados) return;
    listaResultados.innerHTML = "";
    databaseAlimentos.filter(a => a.nome.toLowerCase().includes(filtro.toLowerCase())).forEach(a => {
        const div = document.createElement('div');
        div.className = "food-card";
        div.innerHTML = `<span>${a.nome}</span> <strong>${a.cal} kcal</strong>`;
        listaResultados.appendChild(div);
    });
}
inputBusca?.addEventListener('input', (e) => renderizar(e.target.value));
renderizar();

// --- SISTEMA DE MODAIS ---
function openModal(tipo) {
    document.getElementById('modalAuth').style.display = "flex";
    if(tipo === 'login') {
        document.getElementById('formLogin').classList.remove('hidden');
        document.getElementById('formCadastro').classList.add('hidden');
    } else {
        document.getElementById('formCadastro').classList.remove('hidden');
        document.getElementById('formLogin').classList.add('hidden');
    }
}

function closeModal() { document.getElementById('modalAuth').style.display = "none"; }

// --- REDIRECIONAMENTO ---
function handleAuth(e, msg) {
    e.preventDefault();
    // Pega o nome do usuário do campo de cadastro
    const nomeInput = document.getElementById('reg-nome');
    const nomeUsuario = nomeInput ? nomeInput.value : "Usuário";
    
    localStorage.setItem('userName', nomeUsuario);
    alert(msg + " Redirecionando para seu Dashboard exclusivo...");
    
    // Leva para a nova página
    window.location.href = "dashboard.html";
}

window.onclick = (e) => { if (e.target == document.getElementById('modalAuth')) closeModal(); }