const grau = prompt("Grau do Polinômio: ");

var coeficientes = [];
for (let i = 0; i <= grau; i++) {
    coeficientes[i] = parseFloat(prompt(`Coeficiente de x^${i}: `));
}
console.log("f(x) = " + coeficientes.map((coef, index) => `${coef}x^${index}`).join(' + '));

const erro = parseFloat(prompt("Erro: "));
const a = prompt("Início do intervalo: ");
const b = prompt("Fim do intervalo: ");

function f(x) {
    let resultado = 0;
    for (let i = 0; i <= grau; i++) {
        resultado += coeficientes[i] * Math.pow(x, i);
    }
    return resultado;
}

function bisseccao(a, b) {
    if (f(a) * f(b) >= 0) {
        console.log("O intervalo informado não é válido (f(a) e f(b) devem ter sinais opostos).");
    } else {
        let m, iteracao = 0;

        while ((b - a) / 2 > erro) {
            m = (a + b) / 2;
            iteracao++;

            console.log(`Iteração ${iteracao}: a=${a}, b=${b}, m=${m}, f(m)=${f(m)}`);

            if (f(m) === 0) break;

            if (f(a) * f(m) < 0) {
                b = m;
            } else {
                a = m;
            }
        }
        console.log(`Raiz aproximada: ${(a + b) / 2}`);
    }
}

//Procurar quantos intervalos existem
let limites = [];

for (let i = a; i < b; i++) {
    if (f(i) * f(i + 1) < 0) {
        limites.push([i, i + 1]);
    }
}

limites.forEach(intervalo => {
    console.log(`Intervalo encontrado: [${intervalo[0]}, ${intervalo[1]}]`);
    bisseccao(intervalo[0], intervalo[1]);
})



