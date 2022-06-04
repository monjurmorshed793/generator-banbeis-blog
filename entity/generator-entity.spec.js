

describe('banbeis-blog:entity', ()=>{

   var path = require('path');
   var helpers = require('yeoman-test');
   const fs = require('fs');

    var assert = require('yeoman-assert');

   it('generates entity for both spring boot and angular', ()=>{
      return helpers.run(path.join(__dirname,'../entity'))
          .withPrompts({
             'name': 'Department',
             'modelDirectory': 'bd.gov.banbeis.banbeisblog.domain',
             'repositoryDirectory': 'bd.gov.banbeis.banbeisblog.repository',
             'serviceDirectory': 'bd.gov.banbeis.banbeisblog.service',
             'controllerDirectory': 'bd.gov.banbeis.banbeisblog.rest',
             'confirmation': true,
             'fieldName': 'name',
             'type': 'LanguageType',
             'required': true,
             'fieldConfirmation': false
          })
          .then((dir)=>{

              assert.file(['src/main/java/bd/gov/banbeis/banbeisblog/domain/Department.java']);
              assert.file(['src/main/java/bd/gov/banbeis/banbeisblog/repository/DepartmentRepository.java']);
              assert.file(['src/main/java/bd/gov/banbeis/banbeisblog/service/DepartmentService.java']);
              assert.file(['src/main/java/bd/gov/banbeis/banbeisblog/rest/DepartmentController.java']);


              assert.fileContent('src/main/java/bd/gov/banbeis/banbeisblog/domain/Department.java', 'package bd.gov.banbeis.banbeisblog.domain;')
              assert.fileContent('src/main/java/bd/gov/banbeis/banbeisblog/domain/Department.java', 'import bd.gov.banbeis.banbeisblog.domain.helper.LanguageType;')
              assert.fileContent('src/main/java/bd/gov/banbeis/banbeisblog/domain/Department.java', 'private LanguageType name;')


              assert.fileContent('src/main/java/bd/gov/banbeis/banbeisblog/repository/DepartmentRepository.java','package bd.gov.banbeis.banbeisblog.repository;');
              assert.fileContent('src/main/java/bd/gov/banbeis/banbeisblog/repository/DepartmentRepository.java','import bd.gov.banbeis.banbeisblog.domain.Department;');
              assert.fileContent('src/main/java/bd/gov/banbeis/banbeisblog/repository/DepartmentRepository.java','import org.springframework.data.mongodb.repository.MongoRepository;');
              assert.fileContent('src/main/java/bd/gov/banbeis/banbeisblog/repository/DepartmentRepository.java','public interface DepartmentRepository extends MongoRepository<Department, String>{');



              assert.fileContent('src/main/java/bd/gov/banbeis/banbeisblog/service/DepartmentService.java','package bd.gov.banbeis.banbeisblog.service;');
              assert.fileContent('src/main/java/bd/gov/banbeis/banbeisblog/service/DepartmentService.java','import bd.gov.banbeis.banbeisblog.domain.Department;');
              assert.fileContent('src/main/java/bd/gov/banbeis/banbeisblog/service/DepartmentService.java','import bd.gov.banbeis.banbeisblog.repository.DepartmentRepository;');
              assert.fileContent('src/main/java/bd/gov/banbeis/banbeisblog/service/DepartmentService.java','public class DepartmentService implements CommonService<Department, String> {');
              assert.fileContent('src/main/java/bd/gov/banbeis/banbeisblog/service/DepartmentService.java','public Department createOrUpdate(Department department) {');
              assert.fileContent('src/main/java/bd/gov/banbeis/banbeisblog/service/DepartmentService.java','public List<Department> getAll() {');
              assert.fileContent('src/main/java/bd/gov/banbeis/banbeisblog/service/DepartmentService.java','return departmentRepository.findAll();');
              assert.fileContent('src/main/java/bd/gov/banbeis/banbeisblog/service/DepartmentService.java','public Optional<Department> getById(String id)');
              assert.fileContent('src/main/java/bd/gov/banbeis/banbeisblog/service/DepartmentService.java','return departmentRepository.findById(id);');
              assert.fileContent('src/main/java/bd/gov/banbeis/banbeisblog/service/DepartmentService.java','public Boolean exists(String id) {');
              assert.fileContent('src/main/java/bd/gov/banbeis/banbeisblog/service/DepartmentService.java','return departmentRepository.existsById(id);');



              /*console.log('entity----------');
              let file = fs.readFileSync('src/main/java/bd/gov/banbeis/banbeisblog/domain/Department.java', 'utf8');
              console.log(file);

              console.log('repository----------');
              file = fs.readFileSync('src/main/java/bd/gov/banbeis/banbeisblog/repository/DepartmentRepository.java', 'utf8');
              console.log(file);

              console.log('service----------');
              file = fs.readFileSync('src/main/java/bd/gov/banbeis/banbeisblog/service/DepartmentService.java', 'utf8');
              console.log(file);

              console.log('rest----------');
              file = fs.readFileSync('src/main/java/bd/gov/banbeis/banbeisblog/rest/DepartmentController.java', 'utf8');
              console.log(file);*/
          });
   });


    it('test list type', ()=>{
        return helpers.run(path.join(__dirname,'../entity'))
            .withPrompts({
                'name': 'Department',
                'modelDirectory': 'bd.gov.banbeis.banbeisblog.domain',
                'repositoryDirectory': 'bd.gov.banbeis.banbeisblog.repository',
                'serviceDirectory': 'bd.gov.banbeis.banbeisblog.service',
                'controllerDirectory': 'bd.gov.banbeis.banbeisblog.rest',
                'confirmation': true,
                'fieldName': 'name',
                'type': 'List<String>',
                'required': true,
                'fieldConfirmation': false
            })
            .then((dir)=>{

                console.log('entity----------');
                let file = fs.readFileSync('src/main/java/bd/gov/banbeis/banbeisblog/domain/Department.java', 'utf8');
                console.log(file);

                console.log('repository----------');
                file = fs.readFileSync('src/main/java/bd/gov/banbeis/banbeisblog/repository/DepartmentRepository.java', 'utf8');
                console.log(file);

                console.log('service----------');
                file = fs.readFileSync('src/main/java/bd/gov/banbeis/banbeisblog/service/DepartmentService.java', 'utf8');
                console.log(file);

                console.log('rest----------');
                file = fs.readFileSync('src/main/java/bd/gov/banbeis/banbeisblog/rest/DepartmentController.java', 'utf8');
                console.log(file);
            });
    });
});
