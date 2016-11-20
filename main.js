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
var kLead;
var cLead;


// Se llama desde el botón


function run()
{
	loadA();

	//loadDummy();


	//console.log(num);
	//console.log(d);
	//console.log(k);
	//console.log(h);
	//console.log(c);
	//console.log(ss);
	//console.log(t);
	//console.log(rp);

	requerimientoNeto();

	heuristica1();
	heuristica2();
	heuristica3();
	heuristica4();
	heuristica5();
	heuristica6();
	heuristica7();

	
	//heuristica7();
	//calcularCostoTotal(0,2);
	//heuristica6();
}

//Funciones

//Cargar datos
function loadDummy()
{
	num = 8;
	d = [0,21,6,8,11,25,21,24,25]; 
	rp = [0,0,0,0,0,0,0,0,0];
	ss = [0,0,0,0,0,0,0,0,0];
	t = 1;
	k = [3900,3400,2900,4000,3300,3600,3400,3200,2800]; 
	h = [77,77,72,50,75,73,63,65,68]; 
	c = [692,700,785,695,713,799,716,665,731]; 
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
	for (var i = 0; i < num+t; i++) 
	{
		rn[i]=Math.ceil(d[i]-rp[i]+ss[i]);
		if(i>0)
		{
			rn[i]-=ss[i-1];
		}
	};

	for (var i = 0; i < num+t; i++) 
	{
		if(rn[i]<0)
		{
			rn[i]=0;
		}
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
	for (var i = 0; i < num+t; i++) 
	{
		if(i+t<num+t)
		{
		arregloLotePedido1[i]=rn[i+t];
		}
	}

	//Llena de 0's el inventario ya que en lote x lote el inventario es 0
	for (var i = 0; i < num+t; i++) 
	{
		arregloInventario1.push(0);
	}
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
	for (var i = t; i <num+t; i++) 
	{
		tasa=tasa+rn[i];
	}
	tasa=tasa/num;

	//Calcular k promedio
	for(var i=0; i<num+t;i++)
	{
		kmedio=kmedio+k[i];
	}
	kmedio=kmedio/(num+t);

	//Calcular c medio
	for(var i=0; i<num+t;i++)
	{
		cmedio=cmedio+c[i];
	}
	cmedio=cmedio/(num+t);

	//Calcular h medio
	for(var i=0; i<num+t;i++)
	{
		hmedio=hmedio+h[i];
	}
	hmedio=hmedio/(num+t);

	//Calcular EOQ
	eoq=Math.sqrt((2*kmedio*tasa)/hmedio);
	eoq=Math.round(eoq);

	//console.log(tasa,kmedio,cmedio,hmedio,"eoq",eoq);

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

	for (var i = 0; i < num+t; i++) 
	{
		//Si estoy en el periodo 0 (con respecto a num+t)

		if(i==0)
		{
			arregloLotePedido2[i]=Math.max(eoq, rn[i+t]);
			arregloInventario2[i+t]+=arregloLotePedido2[i]-rn[i+t];


		}else if(i<num-t)
		{ 
			arregloInventario2[i]=Math.max(arregloLotePedido2[i-t]-rn[i]+arregloInventario2[i-1],0);
			//Si tengo en inventario lo que necesito
			if(arregloInventario2[i]-rn[i+t]>=0)
			{
				//no pido nada
				arregloLotePedido2[i]=0;
				
			}else{ //si tengo que pedir
				arregloLotePedido2[i]=Math.max(eoq, rn[i+t]-arregloInventario2[i+t-1],0);
			}

		}else if(i==num-t)
		{
			arregloInventario2[i]=Math.max(arregloLotePedido2[i-t]-rn[i]+arregloInventario2[i-1],0);
			arregloLotePedido2[i]=Math.max(rn[i+t]-arregloInventario2[i],0);
		}
		else{//Estoy en los últimos periodos
			arregloLotePedido2[i]=0;
			arregloInventario2[i]=arregloInventario2[i-1]+arregloLotePedido2[i-t]-rn[i];
		}
		
	}
	//console.log(arregloLotePedido2);
	//console.log(arregloInventario2);
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
	for (var i = t; i <num+t; i++) 
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

	for (var i = 0; i < num+t; i++) 
	{
		//Debo ordenar y quedan periodos adelante
	if(i>=num)
	{
		arregloLotePedido3[i]=0;
	}

		if(i%tiempociclo==0 )
		{
			//console.log("timo",tiempociclo,i);
			for(j=0; j<tiempociclo; j++)
			{
				//console.log(i,j,"j")
				try{
					if(i+j<num)
					{
					arregloLotePedido3[i]+=rn[i+j+t];
					//console.log(arregloLotePedido3);
					}else{
						//console.log("mayores",i,j);
						break;
					}
				}catch(err){
					//console.log(i,j,"error")
					arregloLotePedido3[i]=0;

				}
				
				
			}
		}else{
			arregloLotePedido3[i]=0;
		}
	}

	//Calcular invetario
	for (var i = 0; i < num+t; i++) 
	{
		if(i>=t)
		{
			arregloInventario3[i]=arregloLotePedido3[i-t]-rn[i]+arregloInventario3[i-1];
		}
	}

	//console.log(arregloLotePedido3);
	//console.log(arregloInventario3);

}

//heurística 4: Política balance parte periodo PPB
function heuristica4()
{
	var costoAnterior=0;
	var costoMantener=[];
	arregloLotePedido4=[];
	arregloInventario4=[];

	for (var i = 0; i < num; i++) 
	{
		costoMantener.push(0);
	}

	//Llena el arreglo de inventario 4 de 0's del tamaño lead time + tamaño demandas 
	for (var i = 0; i < num+t; i++) 
	{
		arregloInventario4.push(0);
	}

	//Llena el arreglo de lote pedido 4 de 0's del tamaño lead time + tamaño demandas 
	for (var i = 0; i < num+t; i++) 
	{
		arregloLotePedido4.push(0);
	}

	for (var i = 0; i < num; i++) 
		{	costoAnterior=0;
			arregloLotePedido4[i]+=rn[i+t];

			console.log(i,j,arregloLotePedido4);

			for (var j = i+1; j <= num; j++) 
			{
				var cost=calcularCostoMantenerEnIHastaJ(i+t,j);



				if(i+1==j && j==num) //Acabó
				{
					//console.log("ii",i,"jj",j,arregloLotePedido4);
					break;
				}

				if(cost>=k[i])
				{
					//console.log("me pase",i,j);
					if(Math.abs(cost-k[i])<=Math.abs(k[i]-costoAnterior))
					{
						//arregloLotePedido4[i]=arregloLotePedido4[i]-rn[j];
						//console.log("el nuevo es mejor", arregloLotePedido4);
						arregloLotePedido4[i]=arregloLotePedido4[i]-rn[j];
						i=j-1-t;
						break;

					}else{
						//console.log("el anterior era mejor",arregloLotePedido4,i,j,rn[j],rn);
						arregloLotePedido4[i]=arregloLotePedido4[i]-rn[j]-rn[j-1];
						i=j-2-t;
						break;
					}
				}else{
					costoAnterior+=cost;
					arregloLotePedido4[i]+=rn[j];
				}
			}


		}

		calcularInventario4();

		//console.log(arregloLotePedido4);
}

//Heurística 5: Política Silver Meal
function heuristica5()
{
	var costoAnterior=0;
	var costoMantener=[];
	arregloLotePedido5=[];
	arregloInventario5=[];

	for (var i = 0; i < num; i++) 
	{
		costoMantener.push(0);
	}

	//Llena el arreglo de inventario 5 de 0's del tamaño lead time + tamaño demandas 
	for (var i = 0; i < num+t; i++) 
	{
		arregloInventario5.push(0);
	}

	//Llena el arreglo de lote pedido 5 de 0's del tamaño lead time + tamaño demandas 
	for (var i = 0; i < num+t; i++) 
	{
		arregloLotePedido5.push(0);
	}

	for (var i = 0; i < num; i++) 
		{	costoAnterior=9999999999999;
			arregloLotePedido5[i]+=rn[i+t];

			console.log(i,j,arregloLotePedido5);

			for (var j = i+1; j <= num; j++) 
			{
				console.log("ij",i,j,arregloLotePedido5);

				var cost=calcularCostoMantenerEnIHastaJ(i+t,j+1);

				cost=(cost+k[i])/(j-i);

				console.log(i,j,arregloLotePedido5,"cost",cost,k[i],(j-i));

				if(i+1==j && j==num) //Acabó
				{
					console.log("ii",i,"jj",j,arregloLotePedido5);
					break;
				}

				if(cost>=costoAnterior)
				{
					
						console.log("el anterior era mejor",arregloLotePedido5,i,j);
						//arregloLotePedido5[i]=arregloLotePedido5[i]-rn[j]-rn[j-1];
						i=j-1-t;
						break;
			
				}else{
					costoAnterior=cost;
					if(j>i+t)
					{
						arregloLotePedido5[i]+=rn[j];
					}
					
				}
			}


		}

		calcularInventario5();

		console.log(arregloLotePedido5);
}

//Política Mínimo Costo Unitario (MCU)
function heuristica6()
{
	var costoAnterior=0;
	var cantidadAnterior=0;
	var costoMantener=[];
	arregloLotePedido6=[];
	arregloInventario6=[];

	//Llena el arreglo de inventario 6 de 0's del tamaño lead time + tamaño demandas 
	for (var i = 0; i < num+t; i++) 
	{
		arregloInventario6.push(0);
	}

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


	var costoMantener=[];
	arregloLotePedido7=[];
	var fk=[];
	var tiempoPed=[];
	var kLead=[];
	var cLead=[];
	arregloInventario7=[];


	//Llena el arreglo de inventario 7 de 0's del tamaño lead time + tamaño demandas 
	for (var i = 0; i < num+t; i++) 
	{
		arregloInventario7.push(0);
	}


	for (var i = 0; i < num; i++) 
	{
		costoMantener.push(0);
	}

	for (var i = 0; i < num; i++) 
	{
		tiempoPed.push(0);
	}

	

	//Llena el arreglo de lote pedido 7 de 0's del tamaño lead time + tamaño demandas 
	for (var i = 0; i < num+t; i++) 
	{
		arregloLotePedido7.push(0);
	}

	//Llena el arreglo fk
	for (var i = 0; i < num; i++) 
	{
		console.log("llena fk", i);
		fk.push(0);
	}

	//ALgoritmo para elegir fk
	for (var i = 1; i <= num; i++) 
	{
		var min= 999999999;
		for(j=0; j<i; j++)
		{
			var actual=fk[j]+calcularCostoTotal(j,i);
			
			console.log(j,i,"costoTotal ",actual);			

			var tiempo=0;
			
			if(actual<=min)
			{
				tiempo=j;
				min=actual;
			}

			if(j==i-1)
			{
				fk[i]=min;
				tiempoPed[tiempo]=1;
			}
		}
	}

	//Llena el arreglo lote pedido 6
	for (var i = 0; i < num; i++) 
	{
		var pedir=0;
		if(tiempoPed[i]!=0)
		{
			console.log("entro pero no hago nada");
			for (var j = i; j < num; j++) 
			{
				if(j!=i && tiempoPed[j]!=0)
				{
					break;
				}
				arregloLotePedido7[i]+=rn[j];
			}
		}
		
	}


	console.log("fks", fk, "tiempos de pedido", tiempoPed, "pedido", arregloLotePedido7);


}


//Calcula el costo de mantener desde el periodo i-1 hasta el periodo j
function calcularCostoMantenerEnIHastaJ( i,  j)
{
	var costoM= 0;
	//console.log(i,j, costoM, isNaN(costoM));
	for(var k=j-1; k>i; k--)
	{
		console.log("for", k);
		for(var l=i; l<num && l!=k; l++)
		{
			console.log("for2", l, rn[k], h[l], rn[k]*h[l]);
			costoM+=rn[k]*h[l]

		}
		
	}
	console.log("i",i,"j",j,"costoM ",costoM);
	return costoM;
}

//Calcula el costo de ordenar y mantener desde el periodo i-1 hasta el periodo j
//Ejemplo: calcular C13 es i=0, j=2
function calcularCostoTotal( i,  j)
{
	console.log("Calculando el costo total");
	var costoM= 0;
	//console.log(i,j, costoM, isNaN(costoM))
	if(i+t<j)
	{
		costoM=calcularCostoMantenerEnIHastaJ(i+t,j)+k[i];
	}else
	{
		costoM=calcularCostoMantenerEnIHastaJ(i,j)+k[i];
	}
	

	//console.log(calcularCostoMantenerEnIHastaJ(i,j));

	for(var l=i; l<j; l++)
	{
		//console.log("cVariable", rn[l], c[i]);
		costoM+=rn[l]*c[i];

	}

	//console.log(i,j,"costoM ",costoM);
	return costoM;
}

function calcularInventario4()
{
	for(i=1; i<num+t; i++)
	{
		arregloInventario4[i]=arregloInventario4[i-1]+arregloLotePedido4[i-t]-rn[i];
	}
}

function calcularInventario5()
{
	for(i=1; i<num+t; i++)
	{
		arregloInventario5[i]=arregloInventario5[i-1]+arregloLotePedido5[i-t]-rn[i];
	}
}






