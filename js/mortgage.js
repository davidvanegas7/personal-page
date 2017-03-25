const
$menu1 = document.getElementById("dscrandbalance"),
$menu2 = document.getElementById("simpleunderwriting"),

$div1 = document.getElementById("div1"),
$div2 = document.getElementById("div2");


$loanAmountObject = document.getElementsByName("loanAmount")[0];
$interestRateObject = document.getElementsByName("interestRate")[0];
$initialTermObject = document.getElementsByName("initialTerm")[0];
$interestOnlyObject = document.getElementsByName("interestOnly")[0];
$amortizationYearsObject = document.getElementsByName("amortizationYears")[0];
$amortizationMonthsObject = document.getElementsByName("amortizationMonths")[0];
$annualUnderwrittenNOIObject = document.getElementsByName("annualUnderwrittenNOI")[0];

$monthlyPaymentsAmortizationPeriodObject = document.getElementsByName("monthlyPaymentsAmortizationPeriod")[0];
$annualPaymentsAmortizationPeriodObject = document.getElementsByName("annualPaymentsAmortizationPeriod")[0];
$balanceAtMaturityObject = document.getElementsByName("balanceAtMaturity")[0];
$debtServiceCoverageRatioObject = document.getElementsByName("debtServiceCoverageRatio")[0];

$menu1.addEventListener("click", disablemenus);
$menu2.addEventListener("click", disablemenus);

$loanAmountObject.addEventListener("keyup", changeActions);
$interestRateObject.addEventListener("keyup", changeActions);
$initialTermObject.addEventListener("keyup", changeActions);
$interestOnlyObject.addEventListener("keyup", changeActions);
$amortizationYearsObject.addEventListener("keyup", changeActions);
$amortizationMonthsObject.addEventListener("keyup", changeActions);
$annualUnderwrittenNOIObject.addEventListener("keyup", changeActions);


initialData();

function disablemenus(){

	$div1.style.display = 'none';
	$div2.style.display = 'none';

	if(this.id == 'dscrandbalance'){ $div1.style.display = 'flex'; }
	if(this.id == 'simpleunderwriting'){ $div2.style.display = 'flex'; }

}


function initialData(){
	$div2.style.display = 'none';
}


function changeActions() {
	var t = this;
	var $loanAmount = $loanAmountObject.value;
	$loanAmount = $loanAmount.replace("$","");
	$loanAmount = $loanAmount.replace(",","");
	$loanAmount = $loanAmount.replace(".",",");
	var $interestRate = $interestRateObject.value;
	$interestRate = $interestRate.replace("%","");

	var $initialTerm = $initialTermObject.value;
	var $interestOnly = $interestOnlyObject.value;
	var $amortizationYears = $amortizationYearsObject.value;
	var $amortizationMonths = $amortizationMonthsObject.value;
	var $annualUnderwrittenNOI = $annualUnderwrittenNOIObject.value;
	$annualUnderwrittenNOI = $annualUnderwrittenNOI.replace("$","");
	$annualUnderwrittenNOI = $annualUnderwrittenNOI.replace(",","");
	$annualUnderwrittenNOI = $annualUnderwrittenNOI.replace(".",",");

	var $monthlyPaymentsAmortizationPeriod = $monthlyPaymentsAmortizationPeriodObject.value;
	var $annualPaymentsAmortizationPeriod = $annualPaymentsAmortizationPeriodObject.value;
	var $balanceAtMaturity = $balanceAtMaturityObject.value;
	var $debtServiceCoverageRatio = $debtServiceCoverageRatioObject.value;


    if ("amortizationYears" === t.name ? ($amortizationYears = t.value, $amortizationMonths = 12 * t.value) : "amortizationMonths" === t.name && ($amortizationMonths = t.value, $amortizationYears = t.value / 12), $loanAmount.length && $interestRate && ($amortizationMonths || $amortizationYears)) {
        var n = $loanAmount * ($interestRate / 1200) * Math.pow(1 + $interestRate / 1200, $amortizationMonths),
            a = Math.pow(1 + $interestRate / 1200, $amortizationMonths) - 1;
        if ($monthlyPaymentsAmortizationPeriod = n / a, $annualPaymentsAmortizationPeriod = n / a * 12, $interestOnly ? ($monthlyPaymentsInterestOnlyPeriod = $loanAmount * ($interestRate / 100) / 12, $annualPaymentsInterestOnlyPeriod = 12 * $monthlyPaymentsInterestOnlyPeriod) : ($monthlyPaymentsInterestOnlyPeriod = 0, $annualPaymentsInterestOnlyPeriod = 0), $initialTerm) {
            var r = $interestRate / 100 / 12,
                o = 12 * $initialTerm,
                i = 12 * $interestOnly,
                s = $loanAmount * Math.pow(1 + r, o - i),
                l = r * $loanAmount / (1 - Math.pow(1 + r, -$amortizationMonths)) / r * (Math.pow(1 + r, o - i) - 1);
            $balanceAtMaturity = s - l
        } else $balanceAtMaturity = 0;
        $annualUnderwrittenNOI ? $debtServiceCoverageRatio = $annualUnderwrittenNOI / (12 * $monthlyPaymentsAmortizationPeriod) : $debtServiceCoverageRatio = 0
    } else $monthlyPaymentsAmortizationPeriod = 0, $annualPaymentsAmortizationPeriod = 0, $monthlyPaymentsInterestOnlyPeriod = 0, $annualPaymentsInterestOnlyPeriod = 0, $balanceAtMaturity = 0, $debtServiceCoverageRatio = 0


	$loanAmountObject.value = ($loanAmount==0)?"":"$"+numberWithCommas($loanAmount);
	$interestRateObject.value = ($interestRate==0)?"":$interestRate+"%";
	$initialTermObject.value = $initialTerm;
	$interestOnlyObject.value = $interestOnly;
	$amortizationYearsObject.value = ($amortizationYears==0)?"":$amortizationYears;
	$amortizationMonthsObject.value = ($amortizationMonths==0)?"":$amortizationMonths ;
	$annualUnderwrittenNOIObject.value = ($annualUnderwrittenNOI==0)? "":"$"+numberWithCommas($annualUnderwrittenNOI);
	$monthlyPaymentsAmortizationPeriodObject.innerHTML = ($monthlyPaymentsAmortizationPeriod==0)? "$0":"$"+numberWithCommas((parseFloat($monthlyPaymentsAmortizationPeriod)).toFixed(2));
	$annualPaymentsAmortizationPeriodObject.innerHTML =  ($annualPaymentsAmortizationPeriod==0)? "$0":"$"+ numberWithCommas((parseFloat($annualPaymentsAmortizationPeriod)).toFixed(2));
	$balanceAtMaturityObject.innerHTML =  ($balanceAtMaturity==0)? "$0":"$"+ numberWithCommas((parseFloat($balanceAtMaturity)).toFixed(2));
	$debtServiceCoverageRatioObject.innerHTML = numberWithCommas((parseDouble($debtServiceCoverageRatio)).toFixed(3));
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}