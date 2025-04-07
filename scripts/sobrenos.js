function voltar() {
    let pagina_home = window.location.href = "../home.html"

}
    function mudar_cor_fundo () {
        let bt = document.getElementById("bt_cor_fundo")
        let logo = document.getElementById("logo")
        let fundo = document.querySelector("main")
        

        if (bt.style.color === "white") {
            bt.style.color = "black"
            bt.style.backgroundColor = "white"
            document.body.style.backgroundColor = "black"
            
            logo.src = "/imagens/logotipos200x80/fundo_preto.png"

            fundo.style.backgroundColor = "#121212"
            fundo.style.color = "#BDCBE3"

        } else {
            bt.style.color = "white"
            bt.style.backgroundColor = "black"
            document.body.style.backgroundColor = "#f5f5f7"
            logo.src = "/imagens/logotipos200x80/fundo_branco.png"

            fundo.style.backgroundColor = "#f5f5f7"
            fundo.style.color = "black"
        }
    
}


    
