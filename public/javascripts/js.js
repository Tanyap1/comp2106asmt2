function Delete(){
    return confirm ('Confirm Deletion')//confirmation of deletion from the class
}

//const SalaryCalculator = require("salary-calculator");
//filed app

//calc salary 
function calcSalary(){
    let wage = parseFloat(document.getElementById('wage').value); //this is the wage 
    let hours = parseFloat(document.getElementById('hours').value);   //this is the hours
    let calculate = wage * hours * 52;//calculation by 52 week a year
    document.getElementById('results').innerHTML = "$ " + calculate; // click reult plus the $ sign 

    }
    