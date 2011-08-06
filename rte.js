function setRTE(rte){
   var header, el;
   
   header = document.createElement("ul");
   content = document.createElement("div")
   content['id'] = "rteHeaderContent";
   content["name"] = "rteHeaderContent";
   
   header.setAttribute("id","rteHeader");
   header.setAttribute("name","rteHeader");
   header["b"] = createEl("B", header);
   header["i"] = createEl("I", header);
   header["u"] = createEl("U", header);
   header["U"] = createEl("-", header);
   
   rte.appendChild(header);
   rte.appendChild(content);
   content.setAttribute("contenteditable", true);
   
   function triggerAction(event){
      var e = window.event || event;
      
      switch( e.target.id ){
         case "button_B":
            document.execCommand( "bold", false, null);
            break;
         case "button_I":   
            document.execCommand( "italic", false, null);
            break;
         case "button_U":
            document.execCommand( "underline", false, null);
            break;
         case "button_-":
            document.execCommand("insertUnorderedList", false, null);
            break;
      }
   }

   function createEl(title, header){
      var li, el;
      li = document.createElement("li");
      el = document.createElement("input");
      
      el['id'] = "button_"+title;
      el["name"] = "button_"+title;
      el["value"] = title;
      el["type"] = "button";
      el["className"] = "func";      
      li.appendChild(el);
      addHandler( el,"click",triggerAction);
      header.appendChild(li);   
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
   
   // getContent
   // escapeHTML and return
   // setContent
   return{
      getContent:function(){
         return rteHeaderContent.innerHTML;
      },
      
      setContent: function(content){
         return rteHeaderContent.innerHTML = content;
      }
   }
}