//UI module
var UIController = (function(){

    var DOMstrings = {
        inputIme: '.fname',
        inputPrezime: '.lname',
        inputAdresa: '.adresa_broj',
        inputMjesto: '.mjesto',
        inputPbroj: '.pbroj',
        inputBroj: '.telefon',
        inputBroj2: '.telefon2',
        inputDatum: '.rodenje',
        container: '.artikal',
        container_del: '.container'
    };


    return {
        getInput: function(){
            return {
                 ime: document.querySelector(DOMstrings.inputIme).value,
                 prezime: document.querySelector(DOMstrings.inputPrezime).value,
                 ulica: document.querySelector(DOMstrings.inputAdresa).value,
                 mjesto: document.querySelector(DOMstrings.inputMjesto).value,
                 postanski_broj: document.querySelector(DOMstrings.inputPbroj).value,
                 broj: document.querySelector(DOMstrings.inputBroj).value + document.querySelector(DOMstrings.inputBroj2).value,
                 broj2: document.querySelector(DOMstrings.inputBroj2).value,
                 datum: document.querySelector(DOMstrings.inputDatum).value,
            };
        },

        addListItem: function(obj){
            var html, newHtml, element;
            //create html string wtih placeholder text
            element = DOMstrings.container;
            html = '<div class="all_together"><div class="item clearfix" id="%id%"><div class="osoba_ime">%Luka%</div><div class="osoba_prezime">%Marić%</div><div class="right clearfix"><div class="osoba_datum">%05.05.2000.%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div><div class="item__all"><button class="item__all--btn"><i class="ion-ios-close-outline"></i></button></div></div></div></div>';

            //replace the placeholder text with data
            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%Luka%',obj.ime);
            newHtml = newHtml.replace('%Marić%',obj.prezime);
            newHtml = newHtml.replace('%05.05.2000.%',obj.datum);
            //insert the html into the dom
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function() {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputIme+ ',' +DOMstrings.inputPrezime+ ',' 
            +DOMstrings.inputAdresa+ ',' +DOMstrings.inputMjesto+ ',' +DOMstrings.inputPbroj+ ',' 
            +DOMstrings.inputBroj2+ ',' +DOMstrings.inputDatum );

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array){
                current.value = "";
            });
        },

        getDOMstrings: function(){
            return DOMstrings;
        }
    };

})();





//Data module
var Data = (function(){

   var Podatci = function(id, ime, prezime, adresa, mjesto, pbroj, broj, datum){
       this.id = id;
       this.ime = ime;
       this.prezime = prezime;
       this.adresa = adresa;
       this.mjesto = mjesto;
       this.pbroj = pbroj;
       this.broj = broj;
       this.datum = datum;
   };


   var allData = {

       AllItems : {
        AllPodatci: []
       },

       totals : {
        AllPodatci: 0,
       },
   };

   return{
       addItem: function(name,sur,adr,mj,pbr,br,date){
           var newItem,ID;

           //new ID
           if(allData.AllItems.AllPodatci.length>0){
            ID = allData.AllItems.AllPodatci[allData.AllItems.AllPodatci.length - 1].id + 1;
           }else{
            ID = 0;
           }
           

           //new item
           newItem = new Podatci(ID,name,sur,adr,mj,pbr,br,date);

           //push it in data 
           allData.AllItems.AllPodatci.push(newItem);

           //return the new element
           return newItem;
       },
       /*
        deleteItem: function(AllPodatci,id){
            var ids,index;
            ids = Data.AllItems[AllPodatci].map(function(current){
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1){
                allData.AllItems[AllPodatci].splice(index, 1);
            }
       },
       */
       

       testing: function(){
           console.log(allData);
       }
   };

})();







//Controler module
var controller = (function(DataCtrl,UICrtl){
    
    var setupEventListeners = function(){
        var DOM = UICrtl.getDOMstrings();

        document.querySelector('.btn').addEventListener('click',addItem);


        document.addEventListener('keypress',function(event){
            if(event.keycode === 13 || event.which ===13){
                addItem();
        }
    });

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };

    

    var addItem = function(){
        var input, newItem;
        //tu pisem sta cu sve radit i pokrecem dole
        //input data
        input = UICrtl.getInput();

        if(input.ime !=="" && input.prezime !=="" && input.adresa !=="" && input.mjesto !=="" && input.postanski_broj !=="" && input.broj2 !=="" && input.broj2.length>5 && input.broj !=="" && input.datum !=="" ){
            //add the item to controller
            newItem = DataCtrl.addItem(input.ime,input.prezime,input.ulica,input.mjesto,input.postanski_broj,input.broj,input.datum);

            //add to ui
            UICrtl.addListItem(newItem);

            //clear the fields
            UICrtl.clearFields();

        };

    };
    /*
    var ctrlDeleteItem = function(event){
        var ItemID;

        ItemID = event.target.parentNode.parentNode.parentNode.id;

        if(ItemID){
            
            //delete from data
            DataCtrl.deleteItem(ItemID);
        };
    };
    */
    

    return{
        init: function(){
            setupEventListeners();
        }
    }
    


})(Data,UIController);

controller.init();