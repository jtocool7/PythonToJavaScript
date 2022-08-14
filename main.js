class compiler {

    constructor(buf) {
        this.buf = buf;
      this.cpos = 0;
      this.bpos = 0;
      this.spos = 0;
      this.buflen = buf.length
      this.opperator = null;
    }
    
    lexer(){

        var parser = []
        var datavalues = []
        var strings = this.buf.split("\n")
        //console.log(strings)
        
            this.finnish = function(opperator, key){
        let arr = []
        if(opperator == "EQUALS"){
            if(parser[2][0] == '"'){
              let str = parser[2].split('"')
            //console.log(str)
            arr.push(str)
            /*if(!isNaN(arr[0][1])){
            return {type: "variable", value: parseInt(arr[0][1]), variableType: "number", name: parser[0]}
            } */
            return {type: "variable", value:arr[0][1], variableType: "string", name: parser[0]}
            
          } else if(!isNaN(parser[2])){
            return {type: "variable", value: parseInt(parser[2]), variableType: "number", name: parser[0]}
            } else {
            //console.log(arr)
            return {type: "variable", value: parser[2], variableType: "variable", name: parser[0]}
            }
        } else if(opperator == "PRINT"){
            if(parser[2][0] == '"'){
              let str = parser[2].split('"')
              arr.push(str)
                //console.log(isNaN(arr[0][1]))
            return {type: "print", printType: "string", value: arr[0][1]}
          } else {
              if(!isNaN(parser[2])){
                return {type: "print", printType: "number", value: parser[2]}
            } else {
                return {type: "print", printType: "variable", value: parser[2]}
            }
          }
        }
        }
        
        for(var i = 0; i < strings.length; i ++){
        this.cpos = 0;
        this.bpos = 0;
        this.spos = 0;
        parser = []
              for(this.cpos; this.cpos < strings[i].length; this.cpos++){
            if(strings[i][this.cpos] !== " "){
              if(strings[i][this.cpos] == "="){
                let pushdata = []
                this.opperator = "EQUALS"
                let tempstring = strings[i].substr(this.spos, this.bpos + 1)
              parser.push(tempstring)
              this.spos = this.cpos + 2
                  //console.log(this.spos)
              tempstring = strings[i][this.cpos]
              parser.push(tempstring)
              tempstring = strings[i].substr(this.spos)
              parser.push(tempstring)
              let datatype = this.finnish("EQUALS")
                pushdata.push(datatype)
                datavalues.push(datatype)
              
            } else if(strings[i][this.cpos] == "("){
              this.opperator = "BRACKETFORWARDS"
              let tempstring = strings[i].substr(this.spos, this.bpos + 2)
              parser.push(tempstring)
              this.spos = this.cpos
              tempstring = strings[i][this.cpos]
              parser.push(tempstring)
              this.spos = this.cpos + 1
            
          } else {
                    if(strings[i][this.cpos] == ")"){
                let pushdata = []
                let tempstring = strings[i].substr(this.spos, this.bpos - 4)
                parser.push(tempstring)
                tempstring = strings[i][this.cpos]
                parser.push(tempstring)
                if(parser[0] == "print"){
                let datatype = this.finnish("PRINT")
                pushdata.push(datatype)
                datavalues.push(datatype)
                //console.log(datavalues)
                }
                }
            }
          }
          this.bpos = this.cpos -1
          
          
          }
        
        }
        
        return datavalues

    }

    parser(){

        var main = this.lexer();
        const mainobj = {}
          //var type = "type";
        for(var i = 0; i < main.length; i++){
        if(main[i].type == "variable"){
        if(main[i].variableType == "variable"){
          if(!mainobj[main[i].value]){
        console.log(`NameError: name '${main[i].value}' is not defined`)
        } else {
        mainobj[main[i].name] = mainobj[main[i].value]
        //console.log(mainobj[main[i].name])
        }
        } else {
         mainobj[main[i].name] = main[i].value
        }
        } else if(main[i].type == "print"){
            if(main[i].printType == "variable"){
                console.log(mainobj[main[i].value])
            } else if(main[i].printType == "string"){
              console.log(main[i].value)
          }
        }
        }
        //console.log(mainobj)
        //return main
        }

}

const lex = new compiler(`hello = "hello"
goodbye = "goodbye"
number = 3
num2 = number
print("hello")
print(number)
print(num2)
print(hello)
print(goodbye)`)
