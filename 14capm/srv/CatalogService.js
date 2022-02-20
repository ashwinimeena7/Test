module.exports = cds.service.impl(async function () {

    //this represents CatalogService.cds instance
    //Get instance of Employee
    const {
        EmployeeSet, POs
    } = this.entities;

    this.before('UPDATE', EmployeeSet, (req) => {
        if (parseFloat(req.data.salaryAmount) >= 1000000) {
            req.error(500, "Salary must be below 1mn");
            //res.send("Invalid salary").status(404);
        }
    });

    this.on('boost', async req => {
        try {
            const ID = req.params[0];
            console.log("Your Purchase Order with ID ---> " + ID + "will be boosted");
            const tx = cds.tx(req);
            await tx.update(POs).with({
                GROSS_AMOUNT: { '+=' : 20000 }, NOTE : "Boosted!!!"
            }).where(ID);
            return "Boost was successful";
        } catch (error) {
            return "Error in boosting" + error.toString();
        }
    });

    this.on('largestOrder', async req => {
        try {
            const ID = req.params[0];
            console.log("Your Purchase Order with ID ---> " + ID + "will be boosted");
            const tx = cds.tx(req);
            const reply = await tx.read(POs).orderBy({
                GROSS_AMOUNT: 'desc'
            }).limit(1);
            return reply;
        } catch (error) {
            return "Error in boosting" + error.toString();
        }
    });

});