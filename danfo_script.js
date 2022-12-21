//Criar o objecto
let dados = { nome: [], canister: [], caixa: [], posicao: [], data: [] };

//o dataframe
let dataframe;

//pegando o formulario, botao, e a notificacao
const body = document.querySelector("body");
const form = document.querySelector("#form");
const submit = document.querySelector("#submit");
const download = document.querySelector("#btn-download");
const notification = document.querySelector(".card-conteiner");
const showRecords = document.querySelector(".btn-see-more");
const icon_btn = document.querySelector(".fa-plus");

/*Criando elementos para a lista de registros*/
let painel = document.createElement("div"); //div para mostrar os resultados
let placeholder = document.createElement("p");
placeholder.classList.add("placeholder-style");
placeholder.innerText = "Ainda não existem registros!";
painel.append(placeholder);

let list = document.createElement("ol");
list.classList.add("list-style");
let listTitle = document.createElement('h3')
listTitle.classList.add('subtitulo')
listTitle.classList.add("list-title")
listTitle.innerText = "Lista de Registros"
list.append(listTitle)
painel.classList.add("display-none");
painel.append(list);
body.append(painel);

//Painel de vizualicao de registro
function savePainel() {
  if (painel.contains(placeholder)) {
    painel.removeChild(placeholder);
  }
  let li = document.createElement("li");

  let data_iterate = dfd.toJSON(dataframe);
  for (let item of data_iterate) {
    li.innerText = `Nome: ${item.nome} - Posição: C${item.canister}-C${item.caixa}-P${item.posicao}`;
    list.append(li);
  }
}

//Funcao para salvar e guardar como planilha
function saveData() {
  //dom
  let nome = document.querySelector("#nome");
  let canister = document.querySelector("#canister");
  let caixa = document.querySelector("#caixa");
  let posicao = document.querySelector("#posicao");
  let data = document.querySelector("#data");

  //passando os dados do formulario para o objecto
  dados.nome.push(nome.value);
  dados.canister.push(canister.value);
  dados.caixa.push(caixa.value);
  dados.posicao.push(posicao.value);
  dados.data.push(data.value);

  /*convertendo o objecto em dataframe*/
  dataframe = new dfd.DataFrame(dados);
  console.log(dfd.toJSON(dataframe)); //transforma o df em um array de objectos
}

/*Funcao para o display da notificacao*/
function showAlert() {
  notification.style.display = "flex";
  setTimeout(() => {
    notification.style.display = "none";
  }, 800);
}

/*Eventos*/
form.addEventListener("submit", (e) => {
  e.preventDefault();
  saveData();
  form.reset();
  showAlert();
  savePainel();
  console.log(dados);
});

download.addEventListener("click", (e) => {
  dfd.toCSV(dataframe, { fileName: "Planilha_criobank.csv", download: true });
});

showRecords.addEventListener("click", () => {
  icon_btn.classList.toggle("rotate");
  painel.classList.toggle("painel-style");
  painel.classList.toggle("display-none");
});
