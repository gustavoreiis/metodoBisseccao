const gerarBtn = document.getElementById('gerarCoef');
const coefContainer = document.getElementById('coeficientes');
const calcularBtn = document.getElementById('calcular');
const resultadoDiv = document.getElementById('resultado');

gerarBtn.onclick = () => {
    const grau = parseInt(document.getElementById('grau').value);
    if (isNaN(grau) || grau < 1) {
        alert('Informe um grau válido (>= 1)');
        return;
    }
    coefContainer.innerHTML = '';
    for (let i = 0; i <= grau; i++) {
        const div = document.createElement('div');
        div.className = 'mb-3';

        const label = document.createElement('label');
        label.className = 'form-label';
        label.htmlFor = 'coef' + i;
        label.textContent = `Coeficiente x^${i}`;

        const input = document.createElement('input');
        input.type = 'number';
        input.step = 'any';
        input.className = 'form-control';
        input.id = 'coef' + i;
        input.required = true;

        div.appendChild(label);
        div.appendChild(input);
        coefContainer.appendChild(div);
    }
};

function f(x, coefs) {
    return coefs.reduce((acc, c, i) => acc + c * Math.pow(x, i), 0);
}

function bisseccao(f, a, b, erro, maxIter = 100) {
    let fa = f(a);
    let fb = f(b);
    if (fa * fb > 0) return null;

    let m, fm;
    let iter = 0;
    while ((b - a) / 2 > erro && iter < maxIter) {
        m = (a + b) / 2;
        fm = f(m);
        if (fm === 0) return m;
        if (fa * fm < 0) {
            b = m;
            fb = fm;
        } else {
            a = m;
            fa = fm;
        }
        iter++;
    }
    return (a + b) / 2;
}

calcularBtn.onclick = () => {
    const grau = parseInt(document.getElementById('grau').value);
    if (isNaN(grau) || grau < 1) {
        alert('Informe um grau válido');
        return;
    }

    const coefs = [];
    for (let i = 0; i <= grau; i++) {
        const val = parseFloat(document.getElementById('coef' + i).value);
        if (isNaN(val)) {
            alert(`Informe coeficiente para x^${i}`);
            return;
        }
        coefs.push(val);
    }

    const erro = parseFloat(document.getElementById('erro').value);
    const inicio = parseFloat(document.getElementById('inicio').value);
    const fim = parseFloat(document.getElementById('fim').value);
    const passo = parseFloat(document.getElementById('passo').value);

    if (inicio >= fim) {
        alert('O início da busca deve ser menor que o fim.');
        return;
    }
    if (erro <= 0) {
        alert('Erro deve ser maior que zero.');
        return;
    }
    if (passo <= 0) {
        alert('Passo deve ser maior que zero.');
        return;
    }

    const func = x => f(x, coefs);
    const intervalos = [];
    const raizes = [];
    const EPS = 1e-12;

    for (let x = inicio; x < fim; x += passo) {
        const x2 = x + passo;
        if (x2 > fim) break;

        const fx = func(x);
        const fx2 = func(x2);

        if (Math.abs(fx) < EPS) {
            intervalos.push([x, x]);
            raizes.push(x);
        } else if (fx * fx2 < 0) {
            intervalos.push([x, x2]);
        }
    }

    for (const [a, b] of intervalos) {
        if (a === b) continue;
        const raiz = bisseccao(func, a, b, erro);
        if (raiz !== null) raizes.push(raiz);
    }

    if (raizes.length === 0) {
        resultadoDiv.textContent = 'Nenhum intervalo encontrado onde a função muda de sinal no intervalo informado.';
        return;
    }

    let texto = `Quantidade de raízes encontradas: ${raizes.length}\n\n`;
    for (let i = 0; i < raizes.length; i++) {
        const intervalo = intervalos[i] || [raizes[i], raizes[i]];
        texto += `Raiz ${i + 1}: ${raizes[i].toFixed(6)} (intervalo [${intervalo[0]}, ${intervalo[1]}])\n`;
    }
    resultadoDiv.textContent = texto;
};
