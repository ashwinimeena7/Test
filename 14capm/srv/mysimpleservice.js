/* eslint-disable no-prototype-builtins */
const cds = require("@sap/cds");
const { employees } = cds.entities("ashwini.db.master");

//This file name(.js) should be same as .cds filename so as to identify definitation and its impl
//implementation of srv fn defined in mysimpleservice.cds 
const mysrvdemo = function (srv) {
    srv.on('myfunction', (req) => {
        return "Hello" + req.data.msg;
    });

    srv.on("READ", "ReadEmployeeSrv", async (req) => {
        var results = [];
        // results.push({
        //     "ID": "f0c3422a-0f97-411a-b343-33b2daf2c17c",
        //     "nameFirst": "Ashwini",
        //     "nameLast": "Meena"
        // });

        //CDS Query Language - SELECT * FROM dbtab
        results = await cds.tx(req).run(SELECT.from(employees).limit(3));

        //CDS Query to read single record with where
        results = await cds.tx(req).run(SELECT.from(employees).where({"nameFirst": "Ashwini"}));

        //CDS Query if user pass key like/Entity/key
        var whereCondition = req.data;
        console.log(whereCondition);
        if(whereCondition.hasOwnProperty("ID")){
            results = await cds.tx(req).run(SELECT.from(employees).where(whereCondition));
        }else{
            results = await cds.tx(req).run(SELECT.from(employees).limit(1));
        }
        return results;
    });

    function randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    srv.on("CREATE", "InsertEmployeeSrv", async (req) => {
        console.log(req.data);
        
        var dataSet = [];
        //Generate random 32 char ID
        for(let i=0; i < req.data.length; i++){
            const element = req.data[i];
            var rString = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
            element.ID = rString.toUpperCase();
            dataSet.push(element);
        }
        console.log(dataSet);

        let returnData = await cds.transaction(req).run([
            INSERT.into(employees).entries([dataSet])
        ]).then( (resolve) => {
            if(typeof(resolve) !== undefined){
                return req.data;
            }else{
                req.error(500, "There was an issue in insert");
            }
        }).catch(err => {
            req.error(500, "There was an err " + err.toString())
        });

        return returnData;
    });

    srv.on("UPDATE", "UpdateEmployeeSrv", async (req) => {
        let returnData = await cds.transaction(req).run([
            
            UPDATE(employees).set({
                nameFirst: req.data.nameFirst
            }).where({ID : req.data.ID}),
            UPDATE(employees).set({
                nameLast: req.data.nameLast
            }).where({ID : req.data.ID})

        ]).then( (resolve) => {
            if(typeof(resolve) !== undefined){
                return req.data;
            }else{
                req.error(500, "There was an issue in update");
            }
        }).catch(err => {
            req.error(500, "There was an err " + err.toString())
        });

        return returnData;
    });

    srv.on("DELETE", "DeleteEmployeeSrv", async (req) => {
        let returnData = await cds.transaction().run([
            DELETE.from(employees).where(req.data)
        ]).then( (resolve) => {
            if(typeof(resolve) !== undefined){
                return req.data;
            }else{
                req.error(500, "There was an issue in delete");
            }
        }).catch(err => {
            req.error(500, "There was an err " + err.toString())
        });

        return returnData;
    });


};

module.exports = mysrvdemo;