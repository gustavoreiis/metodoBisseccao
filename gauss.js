document.getElementById('gerarMatrizBtn').onclick = () => {
    const numeroEquacoes = parseInt(document.getElementById('numEquacoes').value);
    const container = document.getElementById('matrizContainer');
    const form = document.getElementById('matrizForm');

    form.innerHTML = "";
    for (let i = 0; i < numeroEquacoes; i++) {
        let linha = `<div class="row g-2 mb-2">`;

        for (let j = 0; j < numeroEquacoes; j++) {
            linha += `<div class="col">
                <input type="number" step="any" id="a_${i}_${j} class="form-control text-center" placeholder="a${i+1}${j+1}">
                </div>
            `;
        }

        linha += `
            <div class="col">
                <input type="number" step="any" id="b_${i}" class="form-control text-center" placeholder="b${i+1}">
            </div>
        `;

        linha += `</div>`;
        form.innerHTML += linha;
    }
    container.style.display = 'block';
}