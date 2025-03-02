// Adicione este código ao seu arquivo formulario.js
document.getElementById("btnform").addEventListener("click", function() {
    // Obter os valores do formulário
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    
    // Elemento para mostrar mensagens ao usuário
    const respostaElement = document.getElementById("resposta");
    
    // Validação básica
    if (!nome || !email) {
        mostrarResposta("Por favor, preencha todos os campos.", "error");
        return;
    }
    
    // Mostrar loader ou mensagem de processamento
    mostrarResposta("Processando...", "info");
    
    // Enviar dados para o servidor
    fetch("https://servidor-lead-resilumi-production.up.railway.app/lead", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Cadastro bem-sucedido
            mostrarResposta("Cadastro realizado com sucesso! Verifique a caixa de spam", "success");
            
            // Redirecionar para a página de agradecimento após um pequeno delay
            setTimeout(function() {
                window.location.href = "obrigado.html"; // Substitua pelo caminho correto da sua página
            }, 1500); // Delay de 1.5 segundos para que o usuário possa ver a mensagem
        } else {
            // Email já registrado ou outro erro
            mostrarResposta(data.message, "warning");
        }
    })
    .catch(error => {
        // Erro na requisição
        console.error("Erro:", error);
        mostrarResposta("Ocorreu um erro ao processar seu cadastro. Tente novamente mais tarde.", "error");
    });
});

// Função para mostrar mensagens com estilos diferentes
function mostrarResposta(texto, tipo) {
    const respostaElement = document.getElementById("resposta");
    
    // Definir cores baseadas no tipo de mensagem
    let cor;
    
    switch (tipo) {
        case "success":
            cor = "#28a745"; // Verde
            break;
        case "error":
            cor = "#dc3545"; // Vermelho
            break;
        case "warning":
            cor = "#ffc107"; // Amarelo
            break;
        case "info":
            cor = "#17a2b8"; // Azul claro
            break;
        default:
            cor = "#17a2b8"; // Azul claro
    }
    
    // Aplicar estilos
    respostaElement.style.color = cor;
    respostaElement.style.fontWeight = "bold";
    respostaElement.style.padding = "10px 0";
    
    // Definir texto
    respostaElement.textContent = texto;
}