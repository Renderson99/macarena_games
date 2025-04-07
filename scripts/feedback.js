// Inicializa o EmailJS com sua chave pública
(function() {
    emailjs.init("rIzLS05KQFH8DRXni"); // Substitua pela sua Public Key do EmailJS
})();

// Lida com o envio do formulário
document.getElementById('feedback-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita o recarregamento da página

    const sugestao = document.getElementById('sugestao').value;

    // Envia o e-mail via EmailJS
    emailjs.send("service_xgu2vsm", "template_qk5ggmb", {
        message: sugestao, // O conteúdo da sugestão
        to_email: "rendersonbatista9@gmail.com" // Destinatário
    })
    .then(function(response) {
        alert("Sugestão enviada com sucesso para Macarena Games!");
        document.getElementById('feedback-form').reset(); // Limpa o formulário
    }, function(error) {
        alert("Erro ao enviar: " + error.text);
    });
});

// Butão de voltar para a página home (inicio)
function voltar() {
    let pagina_home = window.location.href = "/index.html"
}
