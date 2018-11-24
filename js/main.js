//variaveis de uso global
var lista=[];
var nova_orientacao;
var count,c=0;
var string="";
var tam_x,tam_y,ini_x,ini_y,orientacao;

function getValues(){
	//obter os valores dos formularios utilizando DOM
	tam_x = parseInt(document.getElementById('tamanho_x').value);
	tam_y = parseInt(document.getElementById('tamanho_y').value);
	ini_x = parseInt(document.getElementById('inicio_x').value);
	ini_y = parseInt(document.getElementById('inicio_y').value);
	orientacao = document.getElementById('orientacao_inicio').value;
	lista_irrigar = document.getElementById('lista_irrigar').value;

	//verificar se a posição inicial do robo esta dentro da horta
	if(ini_x > tam_x || ini_x < 0 || ini_y > tam_y || ini_y < 0){
		alert('robo fora da horta, insira outros valores');
		return;
	}	

	//manipular os dados para obter um array com posicoes para irrigação
	var posicoes = lista_irrigar.split("\n");//separar por quebra de linhas
	var temp;
	posicoes.forEach(function(pos){
		temp = pos.split(',');
		temp[0] = parseInt(temp[0]);
		temp[1] = parseInt(temp[1]);
		
		if(temp[0]<0 || temp[0]>tam_x || temp[1]<0 || temp[1]>tam_y){
			alert(temp[0]+","+temp[1]+" foi descartada pois está fora da horta");
		}else{
			lista.push(temp);//inclui no arrai de posições validas			
		}

	});

	count = lista.length;
	if (count) {//se esistem posições validas para irrigar
		proximoMovimento(ini_x,ini_y,lista[c][0],lista[c][1],orientacao);//calcula os proximos movimentos
		c++;//incrementa o contador
		alert("string - "+string+"\norientação final - "+nova_orientacao);
		document.getElementById('string_result').value=string;//coloca o valor do resultado no campo do formulário
		document.getElementById('orientacao_result').value=nova_orientacao; // coloca o valor da orientação final
		document.getElementById('btn_desenhar').style.display='inline';
		string = "";


	}else{
		alert('é necessário ao menos uma posição para ser irrigada!');
	}
	
}

//função ara calcular os movimentos partindo da posição incial o_x,o_y até o destino d_x,d_y; dada uma orientação incial
function proximoMovimento(o_x,o_y,d_x,d_y,orientacao){
	//subtraindo as posições é posivel identificar a direção de destino
	var x = d_x - o_x;
	var y = d_y - o_y;
	var mod_x = Math.abs(x);
	var mod_y = Math.abs(y);
	//para cada valor de orientação inicial podem ocorrer diferentes movimentos
	switch(orientacao){
		case "N":
			if(x>0 && y>0 ){//quando o destino está a nordeste da origem
				string+="M".repeat(mod_y);//repete 'M' mod_y vezes na string de resultado
				string+="D";//concatena  'D' na string de resultado
				string+="M".repeat(mod_x);//repete 'M' mod_x vezes na string de resultado
				string+="I";//concatena  'I' na string de resultado
				nova_orientacao = 'L';//define a nova orientação do robo
			}else if(x==0 && y>0 ){//quando o destino está ao norte da origem
				string+="M".repeat(mod_y);
				string+="I";
				nova_orientacao = 'N';
			}else if(x<0 && y>0 ){//quando o destino está a noroeste da origem
				string+="M".repeat(mod_y);
				string+="E";
				string+="M".repeat(mod_x);
				string+="I";
				nova_orientacao = 'O';
			}else if(x<0 && y==0 ){//quando o destino está a oeste da origem
				string+="E";
				string+="M".repeat(mod_x);
				string+="I";
				nova_orientacao = 'O';
			}else if(x<0 && y<0 ){//quando o destino está a sudoeste da origem
				string+="E";
				string+="M".repeat(mod_x);
				string+="E";
				string+="M".repeat(mod_y);
				string+="I";
				nova_orientacao = 'S';
			}else if(x==0 && y<0 ){//quando o destino está ao sul da origem
				string+="EE";
				string+="M".repeat(mod_y);
				string+="I";
				nova_orientacao = 'S';
			}else if(x>0 && y<0 ){//quando o destino está a sudeste da origem
				string+="D";
				string+="M".repeat(mod_x);
				string+="D";
				string+="M".repeat(mod_y);
				string+="I";
				nova_orientacao = 'S';
			}else if(x>0 && y==0 ){ //quando o destino está a leste da origem
				string+="D";
				string+="M".repeat(mod_x);
				string+="I";
				nova_orientacao = 'L';
			}else{//quando o destino esta no mesmo lugar que a origem
				string+="I";
				nova_orientacao = orientacao;
			}

		break;

		case "S":
			if(x>0 && y>0 ){
				string+="E";
				string+="M".repeat(mod_x);
				string+="E";
				string+="M".repeat(mod_y);
				string+="I";
				nova_orientacao = 'N';
			}else if(x==0 && y>0 ){
				string+="EE";
				string+="M".repeat(mod_y);
				string+="I";
				nova_orientacao = 'N';
			}else if(x<0 && y>0 ){
				string+="D";
				string+="M".repeat(mod_x);
				string+="D";
				string+="M".repeat(mod_y);
				string+="I";
				nova_orientacao = 'N';
			}else if(x<0 && y==0 ){
				string+="D";
				string+="M".repeat(mod_x);
				string+="I";
				nova_orientacao = 'O';
			}else if(x<0 && y<0 ){
				string+="M".repeat(mod_y);
				string+="D";
				string+="M".repeat(mod_x);
				string+="I";
				nova_orientacao = 'O';
			}else if(x==0 && y<0 ){
				string+="M".repeat(mod_y);
				string+="I";
				nova_orientacao = 'S';
			}else if(x>0 && y<0 ){
				string+="M".repeat(mod_y);
				string+="E";
				string+="M".repeat(mod_x);
				string+="I";
				nova_orientacao = 'L';
			}else if(x>0 && y==0 ){
				string+="E";
				string+="M".repeat(mod_x);
				string+="I";
				nova_orientacao = 'L';
			}else{
				string+="I";
				nova_orientacao = orientacao;
			}

		break;

		case "O":
			if(x>0 && y>0 ){
				string+="D";
				string+="M".repeat(mod_y);
				string+="D";
				string+="M".repeat(mod_x);
				string+="I";
				nova_orientacao = 'L';
			}else if(x==0 && y>0 ){
				string+="D";
				string+="M".repeat(mod_y);
				string+="I";
				nova_orientacao = 'N';
			}else if(x<0 && y>0 ){
				string+="M".repeat(mod_x);
				string+="D";
				string+="M".repeat(mod_y);
				string+="I";
				nova_orientacao = 'N';
			}else if(x<0 && y==0 ){
				string+="M".repeat(mod_x);
				string+="I";
				nova_orientacao = 'O';
			}else if(x<0 && y<0 ){
				string+="M".repeat(mod_x);
				string+="E";
				string+="M".repeat(mod_y);
				string+="I";
				nova_orientacao = 'S';
			}else if(x==0 && y<0 ){
				string+="E";
				string+="M".repeat(mod_y);
				string+="I";
				nova_orientacao = 'S';
			}else if(x>0 && y<0 ){
				string+="E";
				string+="M".repeat(mod_y);
				string+="E";
				string+="M".repeat(mod_x);
				string+="I";
				nova_orientacao = 'L';
			}else if(x>0 && y==0 ){
				string+="EE";
				string+="M".repeat(mod_x);
				string+="I";
				nova_orientacao = 'L';
			}else{
				string+="I";
				nova_orientacao = orientacao;
			}

		break;

		case "L":
			if(x>0 && y>0 ){
				string+="M".repeat(mod_x);
				string+="E";
				string+="M".repeat(mod_y);
				string+="I";
				nova_orientacao = 'N';
			}else if(x==0 && y>0 ){
				string+="E";
				string+="M".repeat(mod_y);
				string+="I";
				nova_orientacao = 'N';
			}else if(x<0 && y>0 ){
				string+="E";
				string+="M".repeat(mod_y);
				string+="E";
				string+="M".repeat(mod_x);
				string+="I";
				nova_orientacao = 'O';
			}else if(x<0 && y==0 ){
				string+="DD";
				string+="M".repeat(mod_x);
				string+="I";
				nova_orientacao = 'O';
			}else if(x<0 && y<0 ){
				string+="D";
				string+="M".repeat(mod_y);
				string+="D";
				string+="M".repeat(mod_x);
				string+="I";
				nova_orientacao = 'O';
			}else if(x==0 && y<0 ){
				string+="D";
				string+="M".repeat(mod_y);
				string+="I";
				nova_orientacao = 'S';
			}else if(x>0 && y<0 ){
				string+="M".repeat(mod_x);
				string+="D";
				string+="M".repeat(mod_y);
				string+="I";
				nova_orientacao = 'S';
			}else if(x>0 && y==0 ){
				string+="M".repeat(mod_x);
				string+="I";
				nova_orientacao = 'L';
			}else{
				string+="I";
				nova_orientacao = orientacao;
			}

		break;
	}

	c++;
	if(c<(count-1))
		proximoMovimento(d_x,d_y,lista[c][0],lista[c][1],nova_orientacao);//faz o mesmo processo para todas as posições a serem irrigadas validas da entrada

	return;
}

//função para simular e desenhar o trajeto do robo, utilizando canvas HTML5 e javascript
async function desenhar_horta(){
	document.getElementById('btn_desenhar').style.display='none';
	var cnv_size_x = 650;//tamanho horizontal do canvas
	var cnv_size_y = 650;//tamanho vertical do canvas
	tam_x++;tam_y++;//numeros de posições a ser desenhadas
	var nx = cnv_size_x/(parseInt(tam_x));//tamanho horizontal de cada posição
	var ny = cnv_size_y/(parseInt(tam_y));//tamanho vertical de cada posição

	var c = document.getElementById("cnv");
	var ctx = c.getContext("2d");//define o contexto de desenho
	ctx.clearRect(0, 0, c.width, c.height);//limpar o canvas
	//colocar a origem no canto inferior esquerdo
 	ctx.translate(0, cnv.height);
	ctx.scale(1, -1);

	ctx.beginPath();
	ctx.strokeStyle="#964b00";
	//desenha linhas verticais
	for(var i =0;i<cnv_size_x;i+=nx){
		ctx.moveTo(i, 0);
		ctx.lineTo(i, cnv_size_y);
		ctx.stroke();
	}
	//desenha linhas horizontais
	for(var i =0;i<cnv_size_y;i+=ny){
		ctx.moveTo(0, i);
		ctx.lineTo(cnv_size_x, i);
		ctx.stroke();
	}
	ctx.closePath();
	

	//alert(nx*tam_x);
	var entrada = document.getElementById('string_result').value;//pega novamente o resultado gerado anteriormente
	ini_x++;ini_y++;
	//define a posição do robo no canvas
	act_x = ini_x*nx-(nx/2);
	act_y = ini_y*ny-(ny/2);
	ctx.moveTo(act_x,act_y);
	ctx.beginPath();

	ctx.arc(act_x, act_y, nx/10, 0, 2 * Math.PI, true);//desenha a posição incial do robo
	ctx.fillStyle="#FF0000";
	ctx.fill();
	ctx.closePath();

	ultima_orientacao = orientacao;//define a orientação do robo do canvas


	ctx.beginPath();
	for(var i = 0;i<entrada.length;i++){//para cada letra do
		switch(entrada[i]){//definindo o que o robo deve fazer com cada letra
			case "D"://quando é lido um 'D'
				if(ultima_orientacao=="N"){//e a orientação atual é N
					ultima_orientacao = "L";//a nova orientação é L
				}else if(ultima_orientacao=="L"){//ou a orientação atual é L
					ultima_orientacao = "S";//então a nova orientação é S
				}else if(ultima_orientacao=="S"){//ou a orientação atual é S
					ultima_orientacao = "O";//ou a orientação atual é O
				}else if(ultima_orientacao=="O"){//ou a orientação atual é O
					ultima_orientacao = "N";//ou a orientação atual é N
				}
			break;
			case "E":
				if(ultima_orientacao=="N"){
					ultima_orientacao = "O";
				}else if(ultima_orientacao=="O"){
					ultima_orientacao = "S";
				}else if(ultima_orientacao=="S"){
					ultima_orientacao = "L";
				}else if(ultima_orientacao=="L"){
					ultima_orientacao = "N";
				}
			break;
			case "M":
				if(ultima_orientacao=="N"){
					act_y+=ny; 
				}else if(ultima_orientacao=="O"){
					act_x-=nx; 
				}else if(ultima_orientacao=="S"){
					act_y-=ny; 
				}else if(ultima_orientacao=="L"){
					act_x+=nx; 
				}

				//desenha o trajeto do robo
				ctx.strokeStyle="#000";
				ctx.lineTo(act_x,act_y);
				ctx.stroke();
				ctx.closePath();

				await sleep(1000);//delay para o movimento ser perceptivel
				
			break;
			case "I":
				//desenha o circuclo azul nas posições de irrigação 
				ctx.arc(act_x, act_y, 5, 0, 2 * Math.PI, true);
				ctx.fillStyle="#40E0D0";
				ctx.fill();
			break;
			default:
			 	continue;
		}
		ctx.moveTo(act_x,act_y);
		ctx.closePath();

	}
	await sleep(1000);
	var r = confirm("Para usar novamente é necessário atualizar, ok?");
 	if (r == true) {
    	window.location.reload()
	}
}

//função do delay
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}