var Module = {
    onRuntimeInitialized: function() {
        const input = document.getElementById('function_input');
        const copybutton = document.getElementById('copy_button');
        let htmlTable = document.getElementById("truthTable")
        let newTable;
        input.addEventListener('keyup', function(e){
            try{
                newTable = JSON.parse(Module.truthTable(this.value));
                htmlTable.innerHTML = ""
                for(var k in newTable.truthTable) {
                    let newRow = htmlTable.insertRow()
                    let nameCell = newRow.insertCell()
                    if(k!="result")
                        nameCell.innerText = k
                    else{
                        nameCell.innerText = newTable.formula.replaceAll("&&","∧").replaceAll("||","∨").replaceAll("!","¬").replaceAll("->", "⇒").replaceAll("<=>", "⇔").replace("^", "⊕")
                    }
                    for(var j in newTable.truthTable[k]){
                        let valueCell = newRow.insertCell()
                        valueCell.innerText = newTable.truthTable[k][j]
                    }
                }
                copybutton.style.display = "block";
                Swap();
                
                copybutton.onclick = function(){
                    copyToClipboard(newTable.latexTable)
                }

            } catch (error){
            }
        });
    }
    };
    function Swap(){
        var t= document.getElementsByTagName('tbody')[0],
        r= t.getElementsByTagName('tr'),
        cols= r.length, rows= r[0].getElementsByTagName('td').length,
        cell, next, tem, i= 0, tbod= document.createElement('tbody');

        while(i<rows){
            cell= 0;
            tem= document.createElement('tr');
            while(cell<cols){
                next= r[cell++].getElementsByTagName('td')[0];
                tem.appendChild(next);
            }
            tbod.appendChild(tem);
            ++i;
        }
        t.parentNode.replaceChild(tbod, t);
    }

    function copyToClipboard(text) {
        var dummy = document.createElement("textarea");
        // to avoid breaking orgain page when copying more words
        // cant copy when adding below this code
        // dummy.style.display = 'none'
        document.body.appendChild(dummy);
        //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }

    function on() {
        document.getElementById("table_content").style.display = "block";
    }

    function off() {
        document.getElementById("table_content").style.display = "none";
    }