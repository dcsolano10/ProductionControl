//Funciones

//Entrada
var num;  //Número de periodos a analizar
var d;   //Arreglo de la demanda para los periodos num
var k;  //Arreglo costo de ordenar para los periodos num
var h;  //Arreglo costo de mantener para los periodos num
var c;  //Arreglo costo variable para los periodos num
var ss;  //Arreglo inventario de seguridad para los periodos num
var t;  //Lead time para los periodos num
var rp;  //Arreglo recepciones programadas para los periodos num
var rn;  //Requerimiento neto para los periodos num

//Heurística 1: LOTE X LOTE
var arregloLotePedido1;
var arregloInventario1;
var lotePedidosPeriodosNegativos1;
var costoTotal1;
var costoPedir1;
var costoMantener1;

//Heurística 2: EOQ
var arregloLotePedido2;
var arregloInventario2;
var costoTotal2;
var costoPedir2;
var costoMantener2;

//Heurística 3:POQ
var arregloLotePedido3;
var arregloInventario3;
var costoTotal3;
var costoPedir3;
var costoMantener3;

//Heurística 4: PPB
var arregloLotePedido4;
var arregloInventario4;
var costoTotal4;
var costoPedir4;
var costoMantener4;

//Heurística 5: SILVER MEAL
var arregloLotePedido5;
var arregloInventario5;
var costoTotal5;
var costoPedir5;
var costoMantener5;

//Heurística 6: MCU
var arregloLotePedido6;
var arregloInventario6;
var costoTotal6;
var costoPedir6;
var costoMantener6;

//Heurística 7: WAGNER WITHIN
var arregloLotePedido7;
var arregloInventario7;
var costoTotal7;
var costoPedir7;
var costoMantener7;


// Se llama desde el botón


function run()
{
	loadA();

	console.log(num);
	console.log(d);
	console.log(k);
	console.log(h);
	console.log(c);
	console.log(ss);
	console.log(t);
	console.log(rp);


	requerimientoNeto();
	//heuristica4();
	//calcularCostoMantenerEnIHastaJ(0,3);
	heuristica6();
}

//Funciones

//Cargar datos
function loadDummy()
{
	num = 6;
	d = [40,60,70,20,90,160]; 
	rp = [0,0,0,0,0,0];
	ss = [0,0,0,0,0,0];
	t = 2;
	k = [300,300,300,300,300,300]; 
	h = [2,2,2,2,2,2]; 
	c = [10,10,10,10,10,10]; 
}

function loadA()
{
	t = leadTimeA;
	num = numPeriodosA;

	d = []; 
	demandaHTML = $('#demanda');
	$(demandaHTML).find('td').each (function() {
		var numero = $(this).find('input').val();
		numero = parseInt(numero);
		d.push(numero);
	});  

	rp = [];

	recepcionesHTML = $('#recepciones');
	$(recepcionesHTML).find('td').each (function() {
		var numero = $(this).find('input').val();
		numero = parseInt(numero);
		rp.push(numero);
	}); 

	ss = [];

	ssHTML = $('#inventario');
	$(ssHTML).find('td').each (function() {
		var numero = $(this).find('input').val();
		numero = parseInt(numero);
		ss.push(numero);
	}); 


	k = []; 

	kHTML = $('#costoPedir');
	$(kHTML).find('td').each (function() {
		var numero = $(this).find('input').val();
		numero = parseInt(numero);
		k.push(numero);
	}); 

	h = []; 

	hHTML = $('#costoMantener');
	$(hHTML).find('td').each (function() {
		var numero = $(this).find('input').val();
		numero = parseInt(numero);
		h.push(numero);
	}); 

	c = []; 

	cHTML = $('#costoUnitario');
	$(cHTML).find('td').each (function() {
		var numero = $(this).find('input').val();
		numero = parseInt(numero);
		c.push(numero);
	}); 
}

//Calcular requerimiento neto para cada periodo
function requerimientoNeto()
{
	rn=[];
	for (var i = 0; i < num; i++) 
	{
		rn[i]=Math.ceil(d[i]-rp[i]+ss[i]*d[i]);
	};
	console.log(rn);
	console.log("acaba de imprimir rn");
	
}

//Heurística lote x lote
function heuristica1()
{
	arregloLotePedido1=[];
	var fecha=0; 
	var desplazamiento=0;
	arregloInventario1=[];

	//Llena el arreglo de lote pedido 1 de 0's del tamaño lead time + tamaño demandas 
	for (var i = 0; i < num+t; i++) 
	{
		arregloLotePedido1.push(0);
	}

	//Agrega el requerimiento neto al lote de pedido 1 (i=0 es el periodo -(t+1))
	for (var i = 0; i < num; i++) 
	{
		arregloLotePedido1[i]=rn[i];
	}

	console.log(arregloLotePedido1);

	//Llena de 0's el inventario ya que en lote x lote el inventario es 0
	for (var i = 0; i < num+t; i++) 
	{
		arregloInventario1.push(0);
	}
	console.log(arregloInventario1);
}

//Heurística EOQ
function heuristica2()
{
	var tasa=0;
	var kmedio=0;
	var cmedio=0;
	var hmedio=0;
	var eoq=0;
	arregloLotePedido2=[];
	arregloInventario2=[];
	
	//Calcular tasa del requerimiento neto
	for (var i = 0; i <num; i++) 
	{
		tasa=tasa+rn[i];
	}
	tasa=tasa/num;
	console.log(tasa);

	//Calcular k promedio
	for(var i=0; i<num;i++)
	{
		kmedio=kmedio+k[i];
	}
	kmedio=kmedio/num;

	//Calcular c medio
	for(var i=0; i<num;i++)
	{
		cmedio=cmedio+c[i];
	}
	cmedio=cmedio/num;

	//Calcular h medio
	for(var i=0; i<num;i++)
	{
		hmedio=hmedio+h[i];
	}
	hmedio=hmedio/num;

	//Calcular EOQ
	eoq=Math.sqrt((2*kmedio*tasa)/hmedio);
	eoq=Math.round(eoq);

	//Llena el arreglo de lote pedido 2 de 0's del tamaño lead time + tamaño demandas 
	for (var i = 0; i < num+t; i++) 
	{
		arregloLotePedido2.push(0);
	}

	//Llena el arreglo de inventario 2 de 0's del tamaño lead time + tamaño demandas 
	for (var i = 0; i < num+t; i++) 
	{
		arregloInventario2.push(0);
	}

	for (var i = 0; i < num; i++) 
	{
		//Si estoy en el periodo 0 (con respecto a num+t)
		if(i==0)
		{
			arregloLotePedido2[i]=Math.max(eoq, rn[i]);
			arregloInventario2[i]=arregloLotePedido2[i]-rn[i];

		}else if(i<num-1){ //Estoy en un periodo que no es 0 y no es el último
			//Si tengo en inventario lo que necesito
			if(arregloInventario2[i-1]-rn[i]>=0)
			{
				//no pido nada
				arregloLotePedido2[i]=0;
				arregloInventario2[i]=arregloInventario2[i-1]-rn[i];
			}else{ //si tengo que pedir
				arregloLotePedido2[i]=Math.max(eoq, rn[i]-arregloInventario2[i-1]);
				arregloInventario2[i]=arregloLotePedido2[i]-rn[i]+arregloInventario2[i-1];
			}

		}else{//Estoy en el último periodo
			arregloLotePedido2[i]=rn[i]-arregloInventario2[i-1];
			arregloInventario2[i]=0;
		}
		
	}
	console.log(arregloLotePedido2);
	console.log(arregloInventario2);
}

//Heurística 3 política POQ
function heuristica3()
{
	var tasa=0;
	arregloLotePedido3=[];
	arregloInventario3=[];
	var kmedio=0;
	var cmedio=0;
	var hmedio=0;
	var eoq=0;
	var tiempociclo=0;

	//Calcular tasa del requerimiento neto
	for (var i = 0; i <num; i++) 
	{
		tasa=tasa+rn[i];
	}
	tasa=tasa/num;

	//Calcular k promedio
	for(var i=0; i<num;i++)
	{
		kmedio=kmedio+k[i];
	}
	kmedio=kmedio/num;

	//Calcular c medio
	for(var i=0; i<num;i++)
	{
		cmedio=cmedio+c[i];
	}
	cmedio=cmedio/num;

	//Calcular h medio
	for(var i=0; i<num;i++)
	{
		hmedio=hmedio+h[i];
	}
	hmedio=hmedio/num;

	//Llena el arreglo de lote pedido 3 de 0's del tamaño lead time + tamaño demandas 
	for (var i = 0; i < num+t; i++) 
	{
		arregloLotePedido3.push(0);
	}

	//Llena el arreglo de inventario 3 de 0's del tamaño lead time + tamaño demandas 
	for (var i = 0; i < num+t; i++) 
	{
		arregloInventario3.push(0);
	}

	//Calcular EOQ
	eoq=Math.sqrt((2*kmedio*tasa)/hmedio);
	eoq=Math.round(eoq);


	//Hallar el tiempo de ciclo
	tiempociclo=eoq/tasa;
	tiempociclo=Math.round(tiempociclo);

	for (var i = 0; i < num; i++) 
	{
		//Debo ordenar y quedan periodos adelante
		if(i%tiempociclo==0 )
		{
			for(j=0; j<tiempociclo; j++)
			{
				try{
					arregloLotePedido3[i]+=rn[i+j];
				}catch(err){
					arregloLotePedido3[i]=0;
					console.log("acabe modafoca")
				}
				
				
			}
		}else{
			arregloLotePedido3[i]=0;
		}
	}

	//Calcular invetario
	for (var i = 0; i < num; i++) 
	{
		if(i>0)
		{
			arregloInventario3[i]=arregloLotePedido3[i]-rn[i]+arregloInventario3[i-1];
		}else{
			arregloInventario3[i]=arregloLotePedido3[i]-rn[i];

		}
	}

	console.log(arregloLotePedido3);
	console.log(arregloInventario3);

}

//heurística 4: Política balance parte periodo PPB
function heuristica4()
{
	var costoAnterior=0;
	var costoMantener=[];
	arregloLotePedido4=[];

	for (var i = 0; i < num; i++) 
	{
		costoMantener.push(0);
	}

	//Llena el arreglo de lote pedido 4 de 0's del tamaño lead time + tamaño demandas 
	for (var i = 0; i < num+t; i++) 
	{
		arregloLotePedido4.push(0);
	}

	for (var i = 0; i < num; i++) 
		{	costoAnterior=0;
			arregloLotePedido4[i]+=rn[i];
			for (var j = i+1; j <= num; j++) 
			{
				var cost=calcularCostoMantenerEnIHastaJ(i,j);

				if(j==num)
				{
					if(Math.abs(cost-k[i])<=Math.abs(k[i]-costoAnterior))
					{
						i=j-1;
						break;

					}else{
						i=j-2;
						arregloLotePedido4[i-1]-=rn[j-1];
						break;
					}
				}

				if(cost>=k[i])
				{
					if(Math.abs(cost-k[i])<=Math.abs(k[i]-costoAnterior))
					{
						i=j-1;
						break;

					}else{
						i=j-1;
						arregloLotePedido4[i]-=rn[j]
						break;
					}
				}else{
					costoAnterior+=cost;
					arregloLotePedido4[i]+=rn[j];
				}
			}


		}

		console.log(arregloLotePedido4);
	}

//Heurística 5: Política Silver Meal
function heuristica5()
{
	var costoAnterior=0;
	var costoMantener=[];
	arregloLotePedido5=[];

	for (var i = 0; i < num; i++) 
	{
		costoMantener.push(0);
	}

	//Llena el arreglo de lote pedido 5 de 0's del tamaño lead time + tamaño demandas 
	for (var i = 0; i < num+t; i++) 
	{
		arregloLotePedido5.push(0);
	}

	for (var i = 0; i < num; i++) 
		{	costoAnterior=0;


			for (var j = i; j <= num; j++) 
			{
				var cost=0;

				cost=calcularCostoMantenerEnIHastaJ(i,j+1);

				var media=0;
				if(j==i)
				{
					media=(cost+k[i])/1;

				}else{
					media=(cost+k[i])/(j-i+1);
				}

			//console.log(i,j,"media",media,"cost", cost, "costoAnterior",costoAnterior, arregloLotePedido5);


			if(media<=costoAnterior || costoAnterior==0)
			{

				costoAnterior=media;
				arregloLotePedido5[i]+=rn[j];
				//console.log("agrego",rn[j],j);
			}
			else
			{
				if(j!=num)
				{
					i=j;
					j=j-1;
				}else{
					j=num;
					i=num;
				}
				
				costoAnterior=0;
			}
		}

		
	}

	console.log(arregloLotePedido5);
}

//Política Mínimo Costo Unitario (MCU)
function heuristica6()
{
	var costoAnterior=0;
	var cantidadAnterior=0;
	var costoMantener=[];
	arregloLotePedido6=[];

	for (var i = 0; i < num; i++) 
	{
		costoMantener.push(0);
	}

	//Llena el arreglo de lote pedido 6 de 0's del tamaño lead time + tamaño demandas 
	for (var i = 0; i < num+t; i++) 
	{
		arregloLotePedido6.push(0);
	}

	for (var i = 0; i < num; i++) 
		{	costoAnterior=0;
			cantidadAnterior=0;


			for (var j = i; j <= num; j++) 
			{
				var cost=0;

				cost=calcularCostoMantenerEnIHastaJ(i,j+1);


				var media=0;
				if(j==i)
				{
					cantidadAnterior=rn[i];
					media=(cost+k[i])/cantidadAnterior;

				}else{
					cantidadAnterior+=rn[j];
					media=(cost+k[i])/cantidadAnterior;
				}

			//console.log(i,j,"media",media,"cost", cost, "costoAnterior",costoAnterior, arregloLotePedido5);


			if(media<=costoAnterior || costoAnterior==0)
			{

				costoAnterior=media;
				arregloLotePedido6[i]+=rn[j];
				//console.log("agrego",rn[j],j);
			}
			else
			{
				if(j!=num)
				{
					i=j;
					j=j-1;
				}else{
					j=num;
					i=num;
				}
				
				costoAnterior=0;
			}
		}

		
	}
	//console.log(arregloLotePedido6);
}

//Política Wagner Whitin
function heuristica7()
{
	var costoAnterior=0;
	var cantidadAnterior=0;
	var costoMantener=[];
	arregloLotePedido7=[];
	var fk=[];

	for (var i = 0; i < num; i++) 
	{
		costoMantener.push(0);
	}

	//Llena el arreglo de lote pedido 7 de 0's del tamaño lead time + tamaño demandas 
	for (var i = 0; i < num+t; i++) 
	{
		arregloLotePedido7.push(0);
	}

	//Llena el arreglo fk
	for (var i = 0; i < num; i++) 
	{
		fk.push(0);
	}

	for(var i=0; i<num; i++)
	{
		if(i>0)
		{

		}

	}




}


//Calcula el costo de mantener desde el periodo i-1 hasta el periodo j
function calcularCostoMantenerEnIHastaJ( i,  j)
{
	var costoM= 0;
	//console.log(i,j, costoM, isNaN(costoM));
	for(var k=j-1; k>i; k--)
	{
		//console.log("for", k);
		for(var l=i; l<num && l!=k; l++)
		{
			//console.log("for2", l, rn[k], h[l], rn[k]*h[l]);
			costoM+=rn[k]*h[l]

		}
		
	}
	//console.log(i,j,"costoM ",costoM);
	return costoM;
}

//Calcula el costo de mantener desde el periodo i-1 hasta el periodo j
function calcularCostoMantenerEnIHastaJ( i,  j)
{
	var costoM= 0;
	//console.log(i,j, costoM, isNaN(costoM));
	for(var k=j-1; k>i; k--)
	{
		//console.log("for", k);
		for(var l=i; l<num && l!=k; l++)
		{
			//console.log("for2", l, rn[k], h[l], rn[k]*h[l]);
			costoM+=rn[k]*h[l]

		}
		
	}
	//console.log(i,j,"costoM ",costoM);
	return costoM;
}






