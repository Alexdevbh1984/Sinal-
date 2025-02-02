# Calculadora de Sinal RF

Este projeto é uma calculadora de sinal RF (Radiofrequência) que permite calcular a perda de sinal com base na frequência, distância do cabo e uso de componentes passivos. A ferramenta é útil para profissionais e entusiastas de telecomunicações, redes e RF.

## 🚀 Funcionalidades

- **Cálculo de Perda de Sinal**: Calcula a perda de sinal com base na frequência e distância do cabo.
- **Inclusão de Passivos**: Considera a perda de sinal causada por componentes passivos (como conectores, divisores, etc.).
- **Interface Simples e Intuitiva**: Fácil de usar, com campos claros e resultados detalhados.
- **Responsivo**: Funciona em dispositivos móveis e desktops.

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura da página.
- **CSS3**: Estilização e design responsivo.
- **JavaScript**: Lógica de cálculo e interatividade.
- **Bootstrap 5**: Framework para design responsivo (opcional).

## 📌 Como Usar

1. **Frequência (MHz)**: Insira a frequência do sinal em MHz.
2. **Distância do Cabo (metros)**: Insira a distância total do cabo em metros.
3. **Passivos**: Adicione a quantidade e o tipo de componentes passivos (conectores, divisores, etc.).
4. **Calcular**: Clique no botão "Calcular" para obter o resultado da perda de sinal.

### Fórmula Utilizada

A perda de sinal é calculada usando a seguinte fórmula:

\[
\text{Perda de Sinal (dB)} = \text{Perda no Cabo} + \text{Perda nos Passivos}
\]

Onde:
- **Perda no Cabo**: Depende da frequência e distância do cabo.
- **Perda nos Passivos**: Soma das perdas causadas por cada componente passivo.

## 📂 Estrutura do Projeto
├── index.html # Arquivo principal da página
├── styles.css # Estilos personalizados
├── script.js # Lógica de cálculo e interatividade
├── README.md # Documentação do projeto
└── screenshot.png # Captura de tela da calculadora (opcional)
