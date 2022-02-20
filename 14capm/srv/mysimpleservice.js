//This file name(.js) should be same as .cds filename so as to identify definitation and its impl
//implementation of srv fn defined in mysimpleservice.cds 
const mysrvdemo = function(srv){
    srv.on('myfunction', (req,res) => {
        return "Hello" + req.data.msg;
    });
};

module.exports = mysrvdemo;