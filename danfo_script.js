//Criar o objecto
let dados = { nome: [], canister: [], caixa: [], posicao: [], data: [] };

//o dataframe
let dataframe

//pegando o formulario e o botao
const form = document.querySelector("#form");
const submit = document.querySelector("#submit");
const download = document.querySelector('#btn-download')

//Funcao para salvar e guardar como planilha
function save_data() {
  
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
  dataframe = new dfd.DataFrame(dados)
  dataframe.print()

  console.log(dfd.toJSON(dataframe))

}


/*Eventos*/
submit.addEventListener("click", (e) => {
  e.preventDefault();
  save_data();
  form.reset();
  console.log(dados);
});

download.addEventListener("click", (e) => {
    e.preventDefault()
    dfd.toCSV(dataframe, { fileName: "Planilha_criobak.csv", download: true });
})
