var formulario = document.getElementById('formulario');
var cep_da_cidade = document.getElementById('cep_da_cidade');
var tbody = document.getElementById("tbody")
var listadeceps = [];

//função responsável por buscar o cep
function buscarcep(event) {

    //previne o comportamento padrão do formulário
    event.preventDefault()

    //pegando o valor do INPUT DE CEP
    var valordocep = cep_da_cidade.value;

    console.log(valordocep);

    //fazendo uma requisição para a API VIA CEP
    fetch(`https://viacep.com.br/ws/${valordocep}/json/`)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            //adicionando o CEP na lista pelo ID
            listadeceps.push(data)

            console.log(listadeceps);

            var novalinha = tbody.insertRow();

            var  celulacep = novalinha.insertCell(0);
            var  celulaLogradouro = novalinha.insertCell(1);
            var  celulaBairro = novalinha.insertCell(2);
            var  celulalocalidade = novalinha.insertCell(3);
            var  celulaUF = novalinha.insertCell(4);

            listadeceps.forEach(item => {
                celulacep.innerText = item.cep;
                celulaLogradouro.innerText = item.logradouro ? item.logradouro: '......'
                celulaBairro.innerText = item.bairro ? item.bairro: '......'
                celulalocalidade.innerText = item.localidade;
                celulaUF.innerText = item.uf;
            })
           

            //pegando o elemento do HTML pelo ID
            //var Resultado = document.getElementById("Resultado")

            //adicionando o conteúdo o HTML
            //Resultado.innerText = `CEP: ${data.cep} - ${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;

        });
}

function mascaraCep(event){
    event.currentTarget.maxLength = 9
    let value = event.currentTarget.value
    value = value.replace(/\D/g, '')
    value = value.replace(/^(\d{5})(\d)/, '$1-$2')
    event.currentTarget.value = value
    return event
}

cep_da_cidade.addEventListener("keyup", mascaraCep);

//adicionando um evento de SUBMIT (envio) no formulário
formulario.addEventListener("submit", buscarcep);