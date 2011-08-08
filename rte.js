function RTE(rte, options ){
   var header, el, sel, preview, buttons;
   
   function toggleClass( element, className ){
      var classes, i, clPresent;
      
      classes = element.getAttribute("class").split(" ");
      clPresent = false;
      console.log( classes );
      
      for( i = 0; i < classes.length ; i++){
         if ( classes[i] == className ){
            clPresent = true;
            delete classes[i];
         }
      }
      
      if ( clPresent === false) classes.push( className );
      
      element.setAttribute( "class", classes.join(" ") );
   }
   
   function triggerAction(event){
      var e, sel, contents, i, linkDialog;
      
      e = window.event || event;
      toggleClass( e.target , e.target.id+"_active" );
      
      switch( e.target.id ){
         case "button_bold":
            document.execCommand( "bold", false, null);
            break;
         case "button_italic":   
            document.execCommand( "italic", false, null);
            break;
         case "button_underline":
            document.execCommand( "underline", false, null);
            break;
         case "button_unorderedlist":
            document.execCommand( "insertUnorderedList", false, null);
            break;
         case "button_orderedlist":
            document.execCommand( "insertOrderedList", false, null);
            break;
         case "button_code":
         // get the selected node and apply a css class to it
            sel = window.getSelection().getRangeAt(0);
            document.execCommand( "indent", false, null);
            
//            console.log( sel.surroundContents(document.createElement("p")) );
            break;
         case "button_link":
            linkDialog = "<div id='linkDialogue' name='linkDialogue'>"+
                           "<input type='text' id='linkText' name='linkText' value='' />"+
                           "<input type='text' id='linkValue' name='linkValue' value='' />"+
                           "<input type='button' id='linkSave' name='linkSave' value='Save' />"+
                           "<input type='button' id='linkCancel' name='linkCancel' value='Cancel' />"+
                           "</div>";
            return linkDialog;
            break;
      }
   }
   
   function createEl(value, title, header){
      var li, el;
      li = document.createElement("li");
      el = document.createElement("input");
      
      el.id = "button_"+value;
      el.name = "button_"+value;
      el.type='button';
      el.value = title;
      el.className = "func";  
          
      li.appendChild(el);
      
      addHandler( el,"click",triggerAction);
      header.appendChild(li);   
   }
   
   function createButton(title, id, action, attrs ){
      var button, key;
      
      button = document.createElement("input");
      button.type='button';
      button.value = title;
      button.id = id;
      button.name = id;
      
      for( key in attrs ) {
         if ( attrs.hasOwnProperty(key) ){
            button.setAttribute( key, attrs[key] );
         }
      }
      
      rte.appendChild(button);
      addHandler( button, "click", action);
   }
   
   function addHandler(element, type, handler){ 
      if (element.addEventListener){
         element.addEventListener(type, handler, false); 
      } else if (element.attachEvent){
         element.attachEvent("on" + type, handler); 
      } else {
         element["on" + type] = handler;
      }
   }
   
   function sendEmail(){
      console.log(" Send Email ");
   }
   
   if ( options.showPreview === true){
      function showPreview(){
         preview.innerHTML = content.innerHTML;
      };
   }
   
   if ( options.showHeader === true ){
      header = document.createElement("ul");

      header.setAttribute("id","rteHeader");
      header.setAttribute("name","rteHeader");
      
      header.b = createEl( "bold","B", header);
      header.i = createEl( "italic", "I", header);
      header.u = createEl( "underline", "U", header);
      header.U = createEl( "unorderedlist", "-", header);
      header.O = createEl("orderedlist","1", header);
      header.code = createEl( "code", "\u201C", header);
      header.link = createEl("link","a", header);
      
      rte.appendChild(header);
   }
   
   
   content = document.createElement("div");
   content.id = "rteHeaderContent";
   content.name = "rteHeaderContent";
   
   if ( options.showPreview === true) preview = document.createElement("div");
   
   if ( options.showPreview === true){
      preview.setAttribute("id","rtePreview");
      preview.setAttribute("name","rtePreview");
   }   
   
   rte.appendChild(content);
   
   if ( options.showButtons === true ){
      createButton( "  Send  ", "sendEmail", sendEmail, { "class" : "func right" } );
   }
   
   if ( options.showPreview === true){
      rte.appendChild(preview);
      addHandler( rte, "keyup", showPreview);
   }
   
   content.setAttribute("contenteditable", true);
   
   // getContent
   // escapeHTML and return
   // setContent
   return{
      getContent:function(){
         return rteHeaderContent.innerHTML;
      },
      
      setContent: function(content){
         rteHeaderContent.innerHTML = content;
      }
   };
   
}