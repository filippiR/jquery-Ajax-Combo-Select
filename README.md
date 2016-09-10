# jquery-Ajax-Combo-Select
Carrega inputs do tipo select através da alteração de outros inputs buscando os options do select destino via ajax.
Otimo para ser utilizado com o Cakephp 3.x mas funciona com outros tambem.

Exemplo de utilização
$(document).ready(function(){
 $('#estado-id').comboselect($('#municipio-id'),{
        'defaultSource':'1', //O #estado-id ira ter como default o 1
        'defaultDest':'2', //O #municipio-id ira ter como default o 2
        'urlSearch':'teste' // url de consulta ajax
        empty: true, //Se terá um option vazio no começo
        emptyText: 'Selecione', //texto do option vazio
    });
});
