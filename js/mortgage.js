
$menu1 = document.getElementById("dscrandbalance");
$menu2 = document.getElementById("simpleunderwriting");

$div1 = document.getElementById("div1");
$div2 = document.getElementById("div2");

initialData();

$menu1.addEventListener("click", disablemenus);
$menu2.addEventListener("click", disablemenus);

function disablemenus(){

	$div1.style.display = 'none';
	$div2.style.display = 'none';

	if(this.id == 'dscrandbalance'){ $div1.style.display = 'block'; }
	if(this.id == 'simpleunderwriting'){ $div2.style.display = 'block'; }

}


function initialData(){
	$div2.style.display = 'none';
}