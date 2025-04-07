function jogos_açao() {
    let pagina_jogos_açao = window.location.href = "/paginas/jogos_açao.html"
}

function jogos_casual() {
    let pagina_jogos_casual = window.location.href = "/paginas/jogos_casual.html"
}

function ir_para_sobrenos() {
    let pargina_sobrenos = window.location.href = "/paginas/sobrenos.html"
   }
   
function ir_para_feedback() {
    let pagina_feedback = window.location.href = "/paginas/feedback.html"
}

function entra_jogo1() {
    let pagina_skyrush = window.location.href = "/jogos/SkyRush/SkyRush.html"
}

function entra_jogo3() {
    let pagina_square_escape = window.location.href = "/jogos/square_escape/square_escape.html"
}

function entra_jogo5() {
    let pagina_square_jump = window.location.href = "/jogos/square_jump/square_jump.html"
}

function mudar_cor_fundo() {
    let bt = document.getElementById("bt_cor_fundo");
    let logo = document.getElementById("logo");
    let logo_footer = document.getElementById("logo_footer");
    let fundo_main = document.querySelector("main");
    let header = document.querySelector("header");
    let area = document.getElementById("area1");
    let footer = document.querySelector("footer");
    let nav = document.querySelector(".area_footer"); // Verifique se esse seletor está correto
    let area_jogo = document.querySelectorAll("article");
    let body = document.querySelector("body");
    let text_h3 = document.querySelectorAll("h3"); // Agora seleciona todos os h3

    if (bt.style.color === "white") {
        bt.style.color = "black";
        fundo_main.style.backgroundColor = "black";
        area.style.backgroundColor = "black";
        header.style.backgroundColor = "black";
        bt.style.backgroundColor = "white";
        body.style.backgroundColor = "black";
        logo_footer.src = "/imagens/logotipos200x80/fundo_preto.png";
        logo.src = "/imagens/logotipos200x80/fundo_preto.png";
        nav.style.backgroundColor = "#0f0f0f"; // Só funciona se nav não for null
        area_jogo.forEach(article => {
            article.style.backgroundColor = "#0f0f0f";
            article.style.color = "white";
        });
        footer.style.backgroundColor = "black";
        text_h3.forEach(h3 => {
            h3.style.color = "white"; // Aplica a cor branca a todos os h3
        });
    } else {
        nav.style.backgroundColor = "#f5f5f7"; // Só funciona se nav não for null
        bt.style.color = "white";
        bt.style.backgroundColor = "black";
        body.style.backgroundColor = "#f5f5f7";
        header.style.backgroundColor = "#f5f5f7";
        area.style.backgroundColor = "#f5f5f7";
        footer.style.backgroundColor = "#f5f5f7";
        logo.src = "/imagens/logotipos200x80/fundo_branco.png";
        logo_footer.src = "/imagens/logotipos200x80/fundo_branco.png";
        fundo_main.style.backgroundColor = "#f5f5f7";
        fundo_main.style.color = "black";
        area_jogo.forEach(article => {
            article.style.backgroundColor = "#f5f5f7";
            article.style.color = "black";
        });
        text_h3.forEach(h3 => {
            h3.style.color = "black"; // Aplica a cor preta a todos os h3
        });
    }
}

function voltar() {
    let pagina_home = window.location.href = "/home.html"
}

