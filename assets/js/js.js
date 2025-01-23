const dias = document.getElementById('dias');
const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');

// Função para calcular o prazo final (4 dias às 00h)
function calcularPrazoFinal() {
    const agora = new Date();
    const prazo = new Date();
    prazo.setDate(agora.getDate() + 4); // Adiciona 4 dias
    prazo.setHours(0, 0, 0, 0); // Define para 00:00:00
    return prazo.getTime();
}

// Recupera o prazo final do localStorage ou define um novo
let prazoFinal = localStorage.getItem('prazoFinal');
if (!prazoFinal) {
    prazoFinal = calcularPrazoFinal();
    localStorage.setItem('prazoFinal', prazoFinal);
}

// Atualiza o cronômetro a cada segundo
const cronometro = setInterval(() => {
    const agora = new Date().getTime();
    const diferenca = prazoFinal - agora;

    if (diferenca <= 0) {
        clearInterval(cronometro);
        dias.textContent = '00';
        horas.textContent = '00';
        minutos.textContent = '00';
        segundos.textContent = '00';
        alert('O prazo de 4 dias terminou!');
        localStorage.removeItem('prazoFinal'); // Remove o prazo ao finalizar
        return;
    }

    // Calcula os valores restantes
    const diasRestantes = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horasRestantes = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutosRestantes = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundosRestantes = Math.floor((diferenca % (1000 * 60)) / 1000);

    // Atualiza os elementos do HTML
    dias.textContent = diasRestantes.toString().padStart(2, '0');
    horas.textContent = horasRestantes.toString().padStart(2, '0');
    minutos.textContent = minutosRestantes.toString().padStart(2, '0');
    segundos.textContent = segundosRestantes.toString().padStart(2, '0');
}, 1000);
