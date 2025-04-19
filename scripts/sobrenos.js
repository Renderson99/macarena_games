function voltar() {
    let pagina_home = window.location.href = "../index.html"

}
    function mudar_cor_fundo () {
        let bt = document.getElementById("bt_cor_fundo")
        let logo = document.getElementById("logo")
        let fundo = document.querySelector("main")
        

        if (bt.style.color === "white") {
            bt.style.color = "black"
            bt.style.backgroundColor = "white"
            document.body.style.backgroundColor = "#101218"
            
            logo.src = "/imagens/logotipos200x80/colorido_sem_fundo.png"

            fundo.style.backgroundColor = "#101518"
            fundo.style.color = "#BDCBE3"

        } else {
            bt.style.color = "white"
            bt.style.backgroundColor = "black"
            document.body.style.backgroundColor = "white"
            logo.src = "/imagens/logotipos200x80/colorido_com_fundo_branco.png" // muda o logo para sem fundo

            fundo.style.backgroundColor = "white"
            fundo.style.color = "black"
        }
    
}


    
