function setRTE(rte, previewVisible ){
   var header, el, sel, preview;
   
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
      
      el.id = "button_"+title;
      el.name = "button_"+title;
      el.value = title;
      el.type = "button";
      el.className = "func";  
          
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
   
   if ( previewVisible === true){
      function showPreview(){
         preview.innerHTML = content.innerHTML;
      };
   }
   
   header = document.createElement("ul");
   content = document.createElement("div");
   if ( previewVisible === true) preview = document.createElement("div");
   
   content.id = "rteHeaderContent";
   content.name = "rteHeaderContent";
   
   header.setAttribute("id","rteHeader");
   header.setAttribute("name","rteHeader");
   if ( previewVisible === true){
      preview.setAttribute("id","rtePreview");
      preview.setAttribute("name","rtePreview");
   }   
   header.b = createEl("B", header);
   header.i = createEl("I", header);
   header.u = createEl("U", header);
   header.U = createEl("-", header);
   
   rte.appendChild(header);
   rte.appendChild(content);
   
   if ( previewVisible === true){
      rte.appendChild(preview);
      addHandler( rte, "keyup", showPreview);
   }
   content.setAttribute("contenteditable", true);
   
   sel = window.getSelection();
   sel.collapse(content,0);
   
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