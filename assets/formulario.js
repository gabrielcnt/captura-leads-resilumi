document.getElementById("btnform").addEventListener("click", function(event) {
    event.preventDefault();  // Previne o comportamento padrão do formulário
    
    const nome = document.querySelector("input[name='Nome']").value;
    const email = document.querySelector("input[name='email']").value;



    // Validar os campos antes de enviar
    if (nome && email) {
        fetch("http://localhost:3000/lead", {  // Chama o servidor local
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ nome, email }),
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                window.location.href = "../obrigado.html"; 
            } else {
                document.getElementById("resposta").innerHTML = "Erro ao cadastrar.";
            }
        })
        .catch(error => {
            console.error("Erro:", error);
            document.getElementById("resposta").innerHTML = "Ocorreu um erro.";
        });
    } else {
        document.getElementById("resposta").innerHTML = "Preencha todos os campos.";
    }
});