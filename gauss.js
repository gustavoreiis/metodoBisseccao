document.getElementById('gerarMatriz').onclick = () => {
    const numEquacoes = parseInt(document.getElementById('numEquacoes').value);
    const matrizForm = document.getElementById('matrizForm');
    const matrizEquacoes = document.getElementById('matrizEquacoes')
    matrizForm.innerHTML = "";

    for (let i = 1; i <= numEquacoes; i++) {
        let linha = '<div class="row mb-2">';

        for (let j = 1; j <= numEquacoes; j++) {
            linha += `<div class="col">
                <input type="number" id="a${i}${j}" class="form-control text-center" placeholder="a${i}${j}">
                </div>`;
        }

        linha += `<div class="col">
            <input type="number" id="b${i}" class="form-control text-center" placeholder="b${i}">
            </div>`

        linha += '</div>';
        matrizForm.innerHTML += linha;
    }
    matrizEquacoes.classList.remove('d-none');
}

document.getElementById('calcularBtn').onclick = () => {
    const numEquacoes = parseInt(document.getElementById('numEquacoes').value);
    const matriz = [];


    for (let i = 1; i <= numEquacoes; i++) {
        let linha = []
        for (let j = 1; j <= numEquacoes; j++) {
            linha.push(parseFloat(document.getElementById(`a${i}${j}`).value));
        }
        linha.push(document.getElementById(`b${i}`).value);
        matriz.push(linha);
    }

    calcularGauss(matriz)
}

function calcularGauss(matriz) {
    const n = matriz.length;
    document.getElementById("etapas").innerHTML = "";

    for (let i = 0; i < n - 1; i++) {
        if (matriz[i][i] === 0) {
            let maxRow = i;
            for (let k = i + 1; k < n; k++) {
                if (Math.abs(matriz[k][i]) > Math.abs(matriz[maxRow][i])) {
                    maxRow = k;
                }
            }
            if (maxRow !== i) {
                let temp = matriz[i];
                matriz[i] = matriz[maxRow];
                matriz[maxRow] = temp;
            }
        }
        for (let j = i + 1; j < n; j++) {
            const multiplicador = matriz[j][i] / matriz[i][i];
            for (let k = i; k <= n; k++) {
                matriz[j][k] = matriz[j][k] - multiplicador * matriz[i][k];
            }
        }
        exibirMatriz(matriz, i + 1);
    }

    let solucoes = substituicaoRetroativa(matriz);
    exibirResultados(solucoes);
}

function exibirMatriz(matriz, etapa) {
    const container = document.getElementById("etapas");
    let conteudo = `
    <strong>Etapa ${etapa}</strong>
    <div class="row mb-2>"
    `

    for (let i = 0; i < matriz.length; i++) {
        conteudo += `<div class="row">`;
        for (let j = 0; j < matriz[i].length; j++) {
            const valor = parseFloat(matriz[i][j]).toFixed(3);
            conteudo += `
                <div class="col">
                    <input type="text" class="form-control text-center" value="${valor}" readonly>
                </div>
            `;
        }
        conteudo += `</div>`;
    }
    conteudo += '</div><hr>'
    container.innerHTML += conteudo;
    container.classList.remove('d-none');
}

function substituicaoRetroativa(matriz) {
    const n = matriz.length;
    const solucoes = new Array(n).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        let soma = 0;
        for (let j = i + 1; j < n; j++) {
            soma += matriz[i][j] * solucoes[j];
        }
        solucoes[i] = (matriz[i][n] - soma) / matriz[i][i];
    }
    return solucoes;
}

function exibirResultados(solucoes) {
    const container = document.getElementById("etapas");

    let conteudo = "<strong>Resultados Finais</strong><div class='row mb-2'>";
    solucoes.forEach((valor, i) => {
        conteudo += `
            <div class="col-12">
                <input type="text" class="form-control text-center mb-2" 
                    value="x${i + 1} = ${valor.toFixed(3)}" readonly>
            </div>
        `;
    });
    conteudo += "</div><hr>";

    container.innerHTML += conteudo;
    container.classList.remove("d-none");
}