

function reload(){
	location.reload();

}

function generarCasillas() {

	//$('#tablaParametros tr').html('<thead> <tr id="periodos"> <th></th> </tr> </thead> <tbody> <tr id="demanda"> <th>Demanda</th> </tr> <tr id="recepciones"> <th>Recepciones programadas</th> </tr> <tr id="inventario"> <th>Inventario de seguridad</th> </tr> <tr id="costoPedir"> <th>Costo de pedir</th> </tr> <tr id="costoMantener"> <th>Costo de mantener</th> </tr> <tr id="costoUnitario"> <th>Costo unitario</th> </tr> </tbody>');
                                                                                               
	var num = $('#numPeriodos').val();
	num = parseInt(num);

	$('#tablaParametros tr').each(function()
	{

		var columna = 1;

		for (var i = 0; i < num; i++) {


			if($(this).prop("id") == 'periodos')
			{
				$(this).append('<th>'+columna+'</th>');
				columna = columna + 1;
			}
			else
			{

				var id= (i+1)+":"+$(this).prop("id");
				$(this).append('<td> <input type="text" id="'+id+'"> </td>');
			}
		}
	});
}