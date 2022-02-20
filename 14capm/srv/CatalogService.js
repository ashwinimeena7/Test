module.exports = cds.service.impl(async function () {

    //this represents CatalogService.cds instance
    //Get instance of Employee
    const {
        EmployeeSet
    } = this.entities;

    this.before('UPDATE', EmployeeSet, (req) => {
        if(parseFloat(req.data.salaryAmount) >= 1000000){
            req.error(500, "Salary must be below 1mn");
            //res.send("Invalid salary").status(404);
        }
    });

});