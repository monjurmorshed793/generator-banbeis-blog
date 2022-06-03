var Generator = require('yeoman-generator')
const {modelFields, serviceDirectory} = require("./index");

var fields = {};
var entity = {};
var addField = {};
module.exports = class extends Generator{

    constructor(args, opts) {
        super(args, opts);


        this.fields = [];
        this.projectRootDirectory = 'src/main/java/';
        this.modelImportedPackages = [];
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
        }
    }

     async _addFieldName(){
        var done = this.async();
        while(true){
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
            if(!this.addField.confirmation){
                done();
                break;
            }
        }

    }

    writeCommonFiles(){

        this.serviceDirectory = 'src/main/java/'+ this.entity.serviceDirectory;
        this.serviceDirectory = this.serviceDirectory.split(".").join("\/");


        this.fs.copyTpl(
            this.templatePath('service/CommonService.java'),
            this.destinationPath(this.serviceDirectory+"/CommonService.java"),
            {
                servicePackage: this.entity.serviceDirectory
            }
        );
    }

    end(){
        this.log('writing entity');
        this._writeEntity();
        this._writeRepository();
    }



    _writeEntity(){
        this.entityPackage = "src/main/java/"+ this.entity.modelDirectory;
        this.modelName = this.entity.name;
        this._createModelImportedPackage();
        this._createModelFields();


        let directory = this.entityPackage.split(".").join("\/")
        directory = directory+"\/";
        directory = directory+this.modelName+".java";
        // this.projectRootDirectory = this.projectRootDirectory.replace("/",'');
        this.log(directory);

        this.fs.copyTpl(
            this.templatePath('entity.java'),
            this.destinationPath(directory),
            {
                modelPackage: this.entityPackage,
                modelImportedPackages: this.modelImportedPackages,
                modelName: this.modelName,
                modelFields: this.modelFields
            }
        );
    }

    _createModelImportedPackage(){
        this.fields.forEach(f=>{
           if(f.type.includes("List") && !this.modelImportedPackages.includes("import java.util.List")){
                this.modelImportedPackages.push("import java.util.List");
           }
        });
    }

    _createModelFields(){
        this.modelFields = [];
        this.fields.forEach(f=>{
            this.log(f);
            this.modelFields.push("private "+f.type+" "+f.name+";");
        });
        this.log(this.modelFields);
        this.log("------------");
    }

    _writeRepository(){
        this.repositoryPackage = "src/main/java/"+ this.entity.repositoryDirectory;
        let directory = this.repositoryPackage.split(".").join("\/")
        directory = directory+"\/";
        directory = directory+this.modelName+"Repository.java";
        this.fs.copyTpl(
            this.templatePath('entity-repository.java'),
            this.destinationPath(directory),
            {
                repositoryPackage: this.repositoryPackage,
                entityPackage: this.entityPackage,
                modelImportedPackages: this.modelImportedPackages,
                modelName: this.modelName,
                modelFields: this.modelFields
            }
        );
    }

}
