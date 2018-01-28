function createPuzzlesWOFFam()
{
  var file = $("#fileInput")[0].files[0];
  
  var reader = new FileReader();

  reader.onload = function(evt) {
      var arrayBuffer = reader.result;
      var bytes = new Uint8Array(arrayBuffer);

      let $answers = $("#wofFamResults");
      let puzzles = "";

      for (i=0; i<bytes.length; i++)
      {
        let curVal = bytes[i];
        let curChar = String.fromCharCode(curVal);
        if (curVal < 32)
        {
          puzzles += "\n";
        }
        else if (curVal < 91)
        {      
          puzzles += curChar
        }
        else
        {
          puzzles += String.fromCharCode(curVal-128) + " ";
        }
      }

    $answers.val(puzzles);
     
  };
    
  reader.readAsArrayBuffer(file);  
}

function getASCII(theChar)
{
  if (theChar == "") return "";
  let charVal = theChar.charCodeAt(0);
  if (charVal>31 && charVal<91) return theChar;
  let newChar = String.fromCharCode(charVal-128);
  return newChar;
}