// Esta função será executada quando o DOM (Document Object Model) estiver completamente carregado.
document.addEventListener('DOMContentLoaded', function () {

    // Obtém elementos do DOM usando seus IDs.
    const tabuleiro = document.getElementById('tabuleiro');
    const status = document.getElementById('status');
    const Reiniciar = document.getElementById('Reiniciar');
  
    // Variáveis que mantêm o estado do jogo.
    let currentPlayer = 'X';
    let gametabuleiro = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
  
    // Função para verificar se há um vencedor ou empate.
    function checkWinner() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]              // Diagonais
      ];
  
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gametabuleiro[a] && gametabuleiro[a] === gametabuleiro[b] && gametabuleiro[a] === gametabuleiro[c]) {
          return pattern; // Retorna as células da linha vencedora
        }
      }
  
      if (!gametabuleiro.includes('')) {
        return 'draw'; // Retorna 'draw' se não houver vencedor e o tabuleiro estiver cheio.
      }
  
      return null; // Retorna null se o jogo ainda estiver em andamento.
    }
  
    // Adiciona uma classe para destacar as células vencedoras.
    function highlightWinningbotõess(botõess) {
      botõess.forEach((botõesIndex) => {
        const botõesElement = document.getElementById(`botões${botõesIndex}`);
        botõesElement.classList.add('winning-botões');
      });
    }
  
    // Remove a classe de destaque das células do tabuleiro.
    function removeHighlight() {
      const botõess = document.querySelectorAll('.botões');
      botões.forEach((botões) => {
        botões.classList.remove('winning-botões');
      });
    }
  
    // Manipula o clique nas células do tabuleiro.
    function handleClick(index) {
      if (!gameActive || gametabuleiro[index] !== '') return;
  
      gametabuleiro[index] = currentPlayer;
      updatetabuleiro();
  
      const winnerbotõess = checkWinner();
      if (winnerbotõess) {
        highlightWinningbotõess(winnerbotõess);
        endGame(gametabuleiro[winnerbotõess[0]]);
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Vez do Jogador ${currentPlayer}`;
      }
    }
  
    // Atualiza o conteúdo das células do tabuleiro no DOM.
    function updatetabuleiro() {
      for (let i = 0; i < 9; i++) {
        const botõesElement = document.getElementById(`botões${i}`);
        botõesElement.textContent = gametabuleiro[i];
      }
    }
  
    // Finaliza o jogo exibindo uma mensagem com o resultado.
    function endGame(result) {
      if (result === 'draw') {
        status.textContent = 'Empate! O jogo acabou.';
      } else {
        status.textContent = `Jogador ${result} venceu!`;
      }
      gameActive = false; // Desativa o jogo.
    }
  
    // Reinicia o jogo, resetando todas as variáveis.
    function resetGame() {
      gametabuleiro = ['', '', '', '', '', '', '', '', ''];
      gameActive = true;
      currentPlayer = 'X';
      status.textContent = 'Vez do Jogador X';
      removeHighlight();
      updatetabuleiro();
    }
  
    // Inicializa o tabuleiro, adiciona eventos de clique e reinício.
    function initializetabuleiro() {
      for (let i = 0; i < 9; i++) {
        const botões = document.createElement('div');
        botões.className = 'botões';
        botões.id = `botões${i}`;
        botões.addEventListener('click', () => handleClick(i));
        tabuleiro.appendChild(botões);
      }
  
      Reiniciar.addEventListener('click', resetGame); // Adiciona um evento de clique ao botão de reinício.
    }
  
    initializetabuleiro(); // Chama a função para iniciar o tabuleiro quando o DOM estiver pronto.
  });
  