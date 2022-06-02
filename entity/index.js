var Generator = require('yeoman-generator')
var beautify = require("gulp-beautify");

var fields = {};
var entity = {};
var addField = {};
module.exports = class extends Generator{

    constructor(args, opts) {
        super(args, opts);



        this.fields = [];
        this.projectRootDirectory = 'src/main/java/';
        this.modelImportedPackages = [];
        this.modelFields = [];
        this.option('entity');
        this.config.save();
    }

    async prompting(){
        this.entity = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Your entity name"
            },
            {
                type: "input",
                name: "modelDirectory",
                message: "Entity directory for model",
                store: true
            },
            {
                type: "input",
                name: "repositoryDirectory",
                message: "Repository directory for model",
                store: true
            },
            {
                type: "input",
                name: "serviceDirectory",
                message: "Service directory for model",
                store: true
            },
            {
                type: "input",
                name: "controllerDirectory",
                message: "Controller directory for model",
                store: true
            },
        ]);

        this.addField = await this.prompt([
            {
                type: 'confirm',
                name: 'confirmation',
                message: 'Want to add a field?'
            }
        ]);
    }

    fieldPrompt(){
        this.log('fields--->');
        this.log(this.fields);
        if(this.addField.confirmation){
            this._addFieldName();
        }else{
            this._writeEntity();
        }
    }

    write(){

    }

     async _addFieldName(){
        const fieldInfo = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Field name"
            },
            {
                type: "list",
                name: "type",
                message: "What is the field type?",
                choices: ['String','Integer','Long','Float','Double','BigDecimal','LocalDate','Instant','ZonedDateTime','Duration','UUID','Boolean','Blob','List<String>','List<Integer>','List<Long>','List<Float>','List<Double>','List<BigDecimal>']
            },
            {
                type: "confirm",
                name: "required",
                message: "Is it required?"
            }
        ]);

        this.fields.push(fieldInfo);

        this.addField = await this.prompt([
             {
                 type: 'confirm',
                 name: 'confirmation',
                 message: 'Want to add a field?'
             }
         ]);
        this.fieldPrompt();
    }




    _writeEntity(){
        const entityPackage =  this.entity.modelDirectory.replace("/",".");
        this.log(entityPackage);
        const modelName = this.entity.name;
        this._createModelImportedPackage();
        this._createModelFields();

        // this.fs.write(this.projectRootDirectory+this.entity.model-directory+"/"+modelName+".java", "");

        this.log("Writing");
        this.log("Destination path");
        this.log(this.sourceRoot());
        this.projectRootDirectory = this.sourceRoot()+"/"+this.entity.modelDirectory+"/"+modelName+".java";
        // this.projectRootDirectory = this.projectRootDirectory.replace("/",'');
        this.log(this.projectRootDirectory+this.entity.modelDirectory+"/"+modelName+".java")
        this.fs.copyTpl(
            this.templatePath('entity.java'),
            this.destinationPath(this.sourceRoot()+"/"+this.entity.modelDirectory+"/"+modelName+".java"),
            {
                package: entityPackage,
                modelImportedPackages: this.modelImportedPackages,
                modelName: modelName,
                modelFields: this.modelFields
            }
        );
        this.log("Writing done");
    }

    _createModelImportedPackage(){
        this.fields.forEach(f=>{
            this.log('in the create model imported package');
            this.log(f);
           if(f.type.includes("List") && !this.modelImportedPackages.contains("import java.util.List")){
                this.modelImportedPackages.push("import java.util.List");
           }
        });
    }

    _createModelFields(){
        this.fields.forEach(f=>{
            this.modelFields.push("private "+f.type+" "+f.name);
        });
    }

    _writeRepository(){

    }

}
