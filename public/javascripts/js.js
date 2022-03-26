function Delete(){
    return confirm ('Confirm Deletion')
}

//const SalaryCalculator = require("salary-calculator");
//filed app


function calcSalary(){
    let wage = parseFloat(document.getElementById('wage').value); 
    let hours = parseFloat(document.getElementById('hours').value);   
    let calculate = wage * hours * 52;
    document.getElementById('results').innerHTML = "$ " + calculate;
    }
    