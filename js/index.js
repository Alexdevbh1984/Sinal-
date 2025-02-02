function calcularPerdas() {
    // Obter valores iniciais
    const txInicial = parseFloat(document.getElementById('tx').value) || 0;
    const rxInicial = parseFloat(document.getElementById('rx').value) || 0;
    const frequencia = parseFloat(document.getElementById('frequencia').value) || 0;
    const cabos = parseFloat(document.getElementById('cabos').value) || 0;
    const tipoCabo = document.getElementById('tipo-cabo').value;
  
    // Validar frequência
    if (frequencia < 105 || frequencia > 999) {
      document.getElementById('erro-frequencia').style.display = 'block';
      return;
    } else {
      document.getElementById('erro-frequencia').style.display = 'none';
    }
  
    // Obter componentes selecionados
    const componentes = Array.from(document.querySelectorAll('.componente:checked')).map(input => input.value);
  
    // Fator de ajuste de perda por frequência e tipo de cabo (em dB/metro)
    const perdaCaboPorMetro = calcularPerdaCabo(frequencia, tipoCabo);
  
    // Definir perdas/ganhos dos componentes
    const perdas = {
      "dc6-tap": { tx: 6, rx: -6 },
      "dc6-livre": { tx: 2.5, rx: -2.5 },
      "dc9-tap": { tx: 9, rx: -9 },
      "dc9-livre": { tx: 1.5, rx: -1.5 },
      "dc12-tap": { tx: 12, rx: -12 },
      "dc12-livre": { tx: 0.5, rx: -0.5 },
      "dsv4": { tx: 7, rx: -7 }, // Divisor: aumenta TX, diminui RX
      "dsv3": { tx: 5, rx: -5 }, // Divisor: aumenta TX, diminui RX
      "desbalanciado": { tx: 3.5, rx: -7.5 } // Divisor desbalanceado
    };
  
    // Calcular perdas totais
    let perdaTotalTX = 0;
    let perdaTotalRX = 0;
  
    // Detalhes dos componentes
    let detalhesComponentes = [];
  
    componentes.forEach(componente => {
      if (perdas[componente]) {
        perdaTotalTX += perdas[componente].tx; // Somar conforme o componente
        perdaTotalRX += perdas[componente].rx; // Subtrair conforme o componente
        detalhesComponentes.push(`- ${componente}: TX ${perdas[componente].tx} dB, RX ${perdas[componente].rx} dB`);
      }
    });
  
    // Perdas de cabo (ajustadas pela frequência e tipo de cabo)
    const perdaCabo = cabos * perdaCaboPorMetro;
    perdaTotalTX += perdaCabo; // Cabo aumenta o TX
    perdaTotalRX -= perdaCabo; // Cabo diminui o RX
  
    // Calcular sinais finais
    const txFinal = txInicial + perdaTotalTX;
    const rxFinal = rxInicial + perdaTotalRX;
  
    // Montar detalhes da resposta
    const detalhes = `
      <strong>Detalhes:</strong>
      <ul>
        <li>Frequência: ${frequencia} MHz</li>
        <li>Tipo de Cabo: ${tipoCabo.toUpperCase()}</li>
        <li>Comprimento do Cabo: ${cabos} metros</li>
        <li>Atenuação do Cabo: ${perdaCabo.toFixed(2)} dB</li>
        <li>Impacto dos Componentes:
          <ul>
            ${detalhesComponentes.map(item => `<li>${item}</li>`).join("")}
          </ul>
        </li>
      </ul>
    `;
  
    // Exibir resultado
    document.getElementById('txFinal').textContent = `TX Final: ${txFinal.toFixed(2)} dBmV`;
    document.getElementById('rxFinal').textContent = `RX Final: ${rxFinal.toFixed(2)} dBmV`;
    document.getElementById('detalhes').innerHTML = detalhes;
    document.getElementById('resultado').style.display = 'block';
  }
  
  // Função para calcular a perda de cabo por metro com base na frequência e tipo de cabo
  function calcularPerdaCabo(frequencia, tipoCabo) {
    // Atenuação típica em dB/100 metros para diferentes tipos de cabo
    const atenuacao = {
      rg6: {
        105: 2.5,  // Atenuação para 105 MHz
        999: 8.5   // Atenuação para 999 MHz
      },
      rg11: {
        105: 1.8,  // Atenuação para 105 MHz
        999: 6.0   // Atenuação para 999 MHz
      }
    };
  
    // Interpolação linear para calcular a atenuação com base na frequência
    const freqMin = 105;
    const freqMax = 999;
    const attMin = atenuacao[tipoCabo][freqMin];
    const attMax = atenuacao[tipoCabo][freqMax];
  
    const atenuacaoPorMetro = ((attMax - attMin) / (freqMax - freqMin)) * (frequencia - freqMin) + attMin;
  
    // Converter para dB/metro
    return atenuacaoPorMetro / 100;
  }