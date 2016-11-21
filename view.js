

function reload(){
	location.reload();

}

var numPeriodosA;
var leadTimeA;


function generarCasillas() {

	//$('#tablaParametros tr').html('<thead> <tr id="periodos"> <th></th> </tr> </thead> <tbody> <tr id="demanda"> <th>Demanda</th> </tr> <tr id="recepciones"> <th>Recepciones programadas</th> </tr> <tr id="inventario"> <th>Inventario de seguridad</th> </tr> <tr id="costoPedir"> <th>Costo de pedir</th> </tr> <tr id="costoMantener"> <th>Costo de mantener</th> </tr> <tr id="costoUnitario"> <th>Costo unitario</th> </tr> </tbody>');

	numPeriodosA = $('#numPeriodos').val();
	numPeriodosA = parseInt(numPeriodosA);

	leadTimeA = $('#leadtime').val();
	leadTimeA = parseInt(leadTimeA);

	$('#tablaParametros tr').each(function()
	{

		var columna = 1-leadTimeA;

		for (var i = 0; i < numPeriodosA+leadTimeA; i++) {


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

	document.getElementById('dataEntrada1').scrollIntoView();

}

function generarHorizontes() {

	run();

	Morris.Bar({
  element: 'bar-example',
  data: [
    { y: 'LxL', a: costoPoliticas[0]},
    { y: 'EOQ', a: costoPoliticas[1]},
    { y: 'MUC', a: costoPoliticas[2]},
    { y: 'POQ', a: costoPoliticas[3]},
    { y: 'PPB', a: costoPoliticas[4]},
    { y: 'SilverMeal', a: costoPoliticas[5]},
    { y: 'WW', a: costoPoliticas[6]}
  ],
  xkey: 'y',
  ykeys: ['a'],
  labels: ['Costo por política']
});

//T1

	document.getElementById('dataResultados1').scrollIntoView();

	$('#t1 tr').each(function()
	{

		var columna = 1-leadTimeA;

		for (var i = 0; i < numPeriodosA+leadTimeA; i++) {


			if($(this).prop("id") == 'periodos_t1')
			{
				$(this).append('<th>'+columna+'</th>');
				columna = columna + 1;
			}
			else
			{
				if($(this).prop("id") == 'rn_t1')
				{
					$(this).append('<th>'+rn[i]+'</th>');
				}

				if($(this).prop("id") == 'lote_t1')
				{
					$(this).append('<th>'+arregloLotePedido1[i]+'</th>');
				}

				if($(this).prop("id") == 'inventario_t1')
				{
					$(this).append('<th>'+arregloInventario1[i]+'</th>');
				}
			}
		}
	});

	//T2
	$('#t2 tr').each(function()
	{

		var columna = 1-leadTimeA;

		for (var i = 0; i < numPeriodosA+leadTimeA; i++) {


			if($(this).prop("id") == 'periodos_t2')
			{
				$(this).append('<th>'+columna+'</th>');
				columna = columna + 1;
			}
			else
			{
				if($(this).prop("id") == 'rn_t2')
				{
					$(this).append('<th>'+rn[i]+'</th>');
				}

				if($(this).prop("id") == 'lote_t2')
				{
					$(this).append('<th>'+arregloLotePedido2[i]+'</th>');
				}

				if($(this).prop("id") == 'inventario_t2')
				{
					$(this).append('<th>'+arregloInventario2[i]+'</th>');
				}
			}
		}
	});

	//T3
	$('#t3 tr').each(function()
	{

		var columna = 1-leadTimeA;

		for (var i = 0; i < numPeriodosA+leadTimeA; i++) {


			if($(this).prop("id") == 'periodos_t3')
			{
				$(this).append('<th>'+columna+'</th>');
				columna = columna + 1;
			}
			else
			{
				if($(this).prop("id") == 'rn_t3')
				{
					$(this).append('<th>'+rn[i]+'</th>');
				}

				if($(this).prop("id") == 'lote_t3')
				{
					$(this).append('<th>'+arregloLotePedido3[i]+'</th>');
				}

				if($(this).prop("id") == 'inventario_t3')
				{
					$(this).append('<th>'+arregloInventario3[i]+'</th>');
				}
			}
		}
	});


	//T4
	$('#t4 tr').each(function()
	{

		var columna = 1-leadTimeA;

		for (var i = 0; i < numPeriodosA+leadTimeA; i++) {


			if($(this).prop("id") == 'periodos_t4')
			{
				$(this).append('<th>'+columna+'</th>');
				columna = columna + 1;
			}
			else
			{
				if($(this).prop("id") == 'rn_t4')
				{
					$(this).append('<th>'+rn[i]+'</th>');
				}

				if($(this).prop("id") == 'lote_t4')
				{
					$(this).append('<th>'+arregloLotePedido4[i]+'</th>');
				}

				if($(this).prop("id") == 'inventario_t4')
				{
					$(this).append('<th>'+arregloInventario4[i]+'</th>');
				}
			}
		}
	});


	//T5
	$('#t5 tr').each(function()
	{

		var columna = 1-leadTimeA;

		for (var i = 0; i < numPeriodosA+leadTimeA; i++) {


			if($(this).prop("id") == 'periodos_t5')
			{
				$(this).append('<th>'+columna+'</th>');
				columna = columna + 1;
			}
			else
			{
				if($(this).prop("id") == 'rn_t5')
				{
					$(this).append('<th>'+rn[i]+'</th>');
				}

				if($(this).prop("id") == 'lote_t5')
				{
					$(this).append('<th>'+arregloLotePedido5[i]+'</th>');
				}

				if($(this).prop("id") == 'inventario_t5')
				{
					$(this).append('<th>'+arregloInventario5[i]+'</th>');
				}
			}
		}
	});


	//T6
	$('#t6 tr').each(function()
	{

		var columna = 1-leadTimeA;

		for (var i = 0; i < numPeriodosA+leadTimeA; i++) {


			if($(this).prop("id") == 'periodos_t6')
			{
				$(this).append('<th>'+columna+'</th>');
				columna = columna + 1;
			}
			else
			{
				if($(this).prop("id") == 'rn_t6')
				{
					$(this).append('<th>'+rn[i]+'</th>');
				}

				if($(this).prop("id") == 'lote_t6')
				{
					$(this).append('<th>'+arregloLotePedido6[i]+'</th>');
				}

				if($(this).prop("id") == 'inventario_t6')
				{
					$(this).append('<th>'+arregloInventario6[i]+'</th>');
				}
			}
		}
	});

	//T7
	$('#t7 tr').each(function()
	{

		var columna = 1-leadTimeA;

		for (var i = 0; i < numPeriodosA+leadTimeA; i++) {


			if($(this).prop("id") == 'periodos_t7')
			{
				$(this).append('<th>'+columna+'</th>');
				columna = columna + 1;
			}
			else
			{
				if($(this).prop("id") == 'rn_t7')
				{
					$(this).append('<th>'+rn[i]+'</th>');
				}

				if($(this).prop("id") == 'lote_t7')
				{
					$(this).append('<th>'+arregloLotePedido7[i]+'</th>');
				}

				if($(this).prop("id") == 'inventario_t7')
				{
					$(this).append('<th>'+arregloInventario7[i]+'</th>');
				}
			}
		}
	});


}