// Seleciona elementos HTML usando classes
const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

// Função para criar um elemento <li> (item de lista)
function criaLi() {
  const li = document.createElement('li');
  return li;
}

// Adiciona um evento de tecla pressionada ao campo de entrada
inputTarefa.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) { // Verifica se a tecla pressionada é 'Enter' (código 13)
    if (!inputTarefa.value) return; // Se o campo de entrada estiver vazio, retorna
    criaTarefa(inputTarefa.value); // Chama a função para criar uma tarefa com o valor do campo de entrada
  }
});

// Função para limpar o campo de entrada após a criação de uma tarefa
function limpaInput() {
  inputTarefa.value = '';
  inputTarefa.focus(); // Coloca o foco de volta no campo de entrada
}

// Função para criar um botão "Apagar" dentro de um elemento <li>
function criaBotaoApagar(li) {
  li.innerText += ' '; // Adiciona um espaço em branco após o texto da tarefa
  const botaoApagar = document.createElement('button'); // Cria um elemento <button>
  botaoApagar.innerText = 'Apagar'; // Define o texto do botão como "Apagar"
  botaoApagar.setAttribute('class', 'apagar'); // Define a classe do botão como "apagar"
  botaoApagar.setAttribute('title', 'Apagar esta tarefa'); // Define um título para o botão
  li.appendChild(botaoApagar); // Adiciona o botão como filho do elemento <li>
}

// Função para criar uma tarefa (elemento <li>) com texto especificado
function criaTarefa(textoInput) {
  const li = criaLi(); // Chama a função para criar um elemento <li>
  li.innerText = textoInput; // Define o texto da tarefa como o texto fornecido
  criaBotaoApagar(li); // Chama a função para criar o botão "Apagar" dentro da tarefa
  tarefas.appendChild(li); // Adiciona a tarefa à lista de tarefas
  limpaInput(); // Chama a função para limpar o campo de entrada
  salvarTarefas(); // Chama a função para salvar as tarefas no armazenamento local
}

// Adiciona um evento de clique ao botão "Adicionar Tarefa"
btnTarefa.addEventListener('click', function() {
  if (!inputTarefa.value) return; // Se o campo de entrada estiver vazio, retorna
  criaTarefa(inputTarefa.value); // Chama a função para criar uma tarefa com o valor do campo de entrada
});

// Adiciona um evento de clique às tarefas na lista
tarefas.addEventListener('click', function(e) {
  const el = e.target; // Obtém o elemento HTML que foi clicado

  if (el.classList.contains('apagar')) { // Verifica se o elemento clicado tem a classe "apagar"
    el.parentElement.remove(); // Remove o elemento pai (a tarefa) do elemento clicado
    salvarTarefas(); // Chama a função para salvar as tarefas no armazenamento local após a remoção
  }
});

// Função para salvar as tarefas na memória local do navegador
function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll('li'); // Seleciona todas as tarefas na lista
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) { // Itera sobre todas as tarefas
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim(); // Remove o texto "Apagar" e espaços em branco
    listaDeTarefas.push(tarefaTexto); // Adiciona o texto da tarefa à lista
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas); // Converte a lista em uma string JSON
  localStorage.setItem('tarefas', tarefasJSON); // Armazena a lista de tarefas no armazenamento local
}

// Função para adicionar tarefas salvas do armazenamento local à lista
function adicionaTarefasSalvas() {
  const tarefasSalvas = localStorage.getItem('tarefas'); // Obtém as tarefas salvas do armazenamento local
  if (tarefasSalvas) {
    const listaDeTarefas = JSON.parse(tarefasSalvas); // Converte a string JSON de volta para uma lista
    for (let tarefa of listaDeTarefas) {
      criaTarefa(tarefa); // Chama a função para criar tarefas com os itens da lista
    }
  }
}

adicionaTarefasSalvas(); // Chama a função para adicionar tarefas salvas ao carregar a página
