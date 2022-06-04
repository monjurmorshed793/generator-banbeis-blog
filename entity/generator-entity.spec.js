describe('banbeis-blog:entity', ()=>{

   var path = require('path');
   var helpers = require('yeoman-test');
   var fs = require('fs-extra');

   it('generates entity for both spring boot and angular', ()=>{
      return helpers.run(path.join(__dirname,'../entity'))
/*          .inTempDir((dir)=>{
              var done = this.async();
              fs.copySync(path.join(__dirname, '../entity/templates/common'),dir, done);
          })*/
          .withPrompts({
             'name': 'Department',
             'modelDirectory': 'bd.gov.banbeis.banbeisblog.domain',
             'repositoryDirectory': 'bd.gov.banbeis.banbeisblog.repository',
             'serviceDirectory': 'bd.gov.banbeis.banbeisblog.service',
             'controllerDirectory': 'bd.gov.banbeis.banbeisblog.rest',
             'confirmation': true
          })
          .withPrompts({
              'fieldName': 'name',
              'type': 'LanguageType',
              'required': true,
              'addFieldConfirmation': false
          })
          .then((dir)=>{
                console.log(dir);
          });
   });
});
