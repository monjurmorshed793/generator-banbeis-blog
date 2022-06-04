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
                message: "Your entity name",
                default: "Navigation"
            },
            {
                type: "input",
                name: "modelDirectory",
                message: "Entity package for model",
                store: true
            },
            {
                type: "input",
                name: "repositoryDirectory",
                message: "Repository package for model",
                store: true
            },
            {
                type: "input",
                name: "serviceDirectory",
                message: "Service package for model",
                store: true
            },
            {
                type: "input",
                name: "controllerDirectory",
                message: "Controller package for model",
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
                    name: "fieldName",
                    message: "Field name"
                },
                {
                    type: "list",
                    name: "type",
                    message: "What is the field type?",
                    choices: ['String', 'LanguageType','Integer','Long','Float','Double','BigDecimal','LocalDate','Instant','ZonedDateTime','Duration','UUID','Boolean','Blob','List<String>','List<Integer>','List<Long>','List<Float>','List<Double>','List<BigDecimal>']
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

        this.controllerDirectory = "src/main/java/"+ this.entity.controllerDirectory;
        this.controllerDirectory = this.controllerDirectory.split(".").join("\/");


        this.fs.copyTpl(
            this.templatePath('service/CommonService.java'),
            this.destinationPath(this.serviceDirectory+"/CommonService.java"),
            {
                servicePackage: this.entity.serviceDirectory
            }
        );


        this.fs.copyTpl(
            this.templatePath('rest/CommonController.java'),
            this.destinationPath(this.controllerDirectory+"/CommonController.java"),
            {
                entity: this.entity
            }
        );
    }

    end(){
        this.log('writing entity');
        this._writeEntity();
        this._writeRepository();
        this._writeService();
        this._writeControllers();
        this.entity.fields = this.fields;
        this.config.set(this.entity.name, this.entity);
    }



    _writeEntity(){
        this.entityPackage = "src/main/java/"+ this.entity.modelDirectory;
        this.modelName = this.entity.name;
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
                modelName: this.modelName,
                modelFields: this.modelFields,
                fields: this.fields,
                entity: this.entity,
                containsLanguageType: this._containsLanguageType,
                containsListType: this._containsListType
            }
        );
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
                repositoryPackage: this.entity.repositoryDirectory,
                entityPackage: this.entityPackage,
                modelImportedPackages: this.modelImportedPackages,
                modelName: this.modelName,
                modelFields: this.modelFields,
                entity: this.entity
            }
        );
    }

    _writeService(){

        const directory = this.serviceDirectory+"/"+this.modelName+"Service.java";
        this.fs.copyTpl(
            this.templatePath('service/entity-service.java'),
            this.destinationPath(directory),
            {
                entity: this.entity,
                convertToLowercase: this._convertToLowercase
            }
        );
    }

    _writeControllers(){
        const directory = this.controllerDirectory+"/"+this.modelName+"Controller.java";

        this.fs.copyTpl(
            this.templatePath('rest/entity-controller.java'),
            this.destinationPath(directory),
            {
                entity: this.entity,
                fields: this.fields,
                convertToLowercase: this._convertToLowercase,
                firstLetterUpperCase: this._firstLetterUpperCase
            }
        );
    }

    _convertToLowercase(str){
        return str.toLowerCase();
    }

    _firstLetterUpperCase(str){
        return str.charAt(0).toUpperCase()+ str.slice(1);
    }

    _containsLanguageType(modelFields){
        let foundOccurance = false;
        for(let f in modelFields){
            if(modelFields[f].type === 'LanguageType'){
                foundOccurance = true;
                break;
            }
        }

        return foundOccurance;
    }

    _containsListType(modelFields){
        let foundOccurance = false;
        console.log('in the contains list type');
        console.log(modelFields);
        for(let f in modelFields){
            console.log(modelFields[f])
            if(modelFields[f].type.includes('List')){
                foundOccurance = true;
                break;
            }
        }

        return foundOccurance;
    }

}
