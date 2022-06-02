var Generator = require('yeoman-generator')
var fields = {};
var entity = {};
var addField = {};
module.exports = class extends Generator{

    constructor(args, opts) {
        super(args, opts);
        this.fields = [];

        this.option('entity');
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
                name: "package-directory",
                message: "Entity directory for model",
                store: true
            },
            {
                type: "input",
                name: "repository-directory",
                message: "Repository directory for model",
                store: true
            },
            {
                type: "input",
                name: "service-directory",
                message: "Service directory for model",
                store: true
            },
            {
                type: "input",
                name: "controller-directory",
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

}
