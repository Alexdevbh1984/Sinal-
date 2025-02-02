// Dados atualizados dos cabos (valores em dB/m por frequência)
const cableData = {
    rg6: {
        losses: {
            50: 0.12,
            100: 0.15,
            200: 0.22,
            500: 0.35,
            750: 0.45,
            1000: 0.60
        }
    },
    rg11: {
        losses: {
            50: 0.08,
            100: 0.10,
            200: 0.15,
            500: 0.25,
            750: 0.30,
            1000: 0.40
        }
    }
};

// Divisores atualizados com DC
const splitters = {
    "Nenhum": 0,
    "DC6": 6,
    "DC9": 9,
    "DC12": 12,
    "DC20": 20
};

function initApp() {
    // Popular opções de divisores
    const splitterSelect = document.getElementById('splitter');
    Object.entries(splitters).forEach(([name, value]) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = name + (value > 0 ? ` (${value} dB)` : '');
        splitterSelect.appendChild(option);
    });
}

function calculateLoss() {
    // Obter valores
    const cableType = document.getElementById('cableType').value;
    const frequencyInput = document.getElementById('frequency').value;
    const splitterLoss = parseFloat(document.getElementById('splitter').value);
    const distance = parseFloat(document.getElementById('distance').value);

    // Validações
    if (!distance || distance <= 0) {
        alert("Insira uma distância válida!");
        return;
    }

    let cableLoss = 0;
    let freqUsed = 'N/A';
    
    if (frequencyInput) {
        const frequency = parseInt(frequencyInput);
        const frequencies = Object.keys(cableData[cableType].losses).map(Number).sort((a, b) => a - b);
        
        // Verificar range de frequência
        if (frequency < frequencies[0] || frequency > frequencies[frequencies.length - 1]) {
            alert(`Frequência fora do range suportado (${frequencies[0]}MHz - ${frequencies[frequencies.length - 1]}MHz)!`);
            return;
        }

        // Encontrar pontos para interpolação
        let lowerFreq = frequencies[0];
        let upperFreq = frequencies[frequencies.length - 1];
        
        for (const freq of frequencies) {
            if (freq <= frequency) lowerFreq = freq;
            if (freq >= frequency) {
                upperFreq = freq;
                break;
            }
        }

        // Calcular perda interpolada
        const lowerLoss = cableData[cableType].losses[lowerFreq];
        const upperLoss = cableData[cableType].losses[upperFreq];
        
        const interpolatedLoss = lowerFreq === upperFreq ? lowerLoss :
            lowerLoss + ((frequency - lowerFreq) * (upperLoss - lowerLoss)) / (upperFreq - lowerFreq);

        cableLoss = interpolatedLoss * distance;
        freqUsed = `${frequency} MHz`;
    }

    // Calcular perda total
    const totalLoss = cableLoss + splitterLoss;
    const resultDiv = document.getElementById('result');

    // Gerar resultado
    resultDiv.innerHTML = `
        <h3>📊 Resultados</h3>
        <div class="result-item">🔌 Tipo de Cabo: ${cableType.toUpperCase()}</div>
        <div class="result-item">📏 Distância: ${distance}m</div>
        <div class="result-item">📻 Frequência: ${freqUsed}</div>
        <div class="result-item">🔀 Divisor: ${document.getElementById('splitter').options[document.getElementById('splitter').selectedIndex].text}</div>
        <div class="result-item">📉 Perda no Cabo: ${cableLoss.toFixed(2)} dB</div>
        <div class="result-item">⚡ Perda no Divisor: ${splitterLoss} dB</div>
        <div class="result-item total">💡 Perda Total: ${totalLoss.toFixed(2)} dB</div>
    `;
    
    resultDiv.style.display = 'block';
}

// Inicializar ao carregar
document.addEventListener('DOMContentLoaded', initApp);