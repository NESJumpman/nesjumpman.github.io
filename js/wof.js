function createPuzzlesFromBytes(bytes)
{
	alert("got this many bytes "+bytes.length);
}

function createPuzzlesWOF()
{
  let bytes = $("#wofRomData").val();
  let $answers = $("#wofResults");
  let puzzles = ""; 

  let i = 0;
  for (i=0; i<bytes.length; i++)
  {
    let curChar = bytes.charAt(i);
    let curAdj = getASCII(curChar);
    puzzles += curAdj;
    if (curChar != curAdj)
    {
      let curLessOne = bytes.charAt(i-1);
      if (curLessOne != getASCII(curLessOne))
      {
        puzzles += "\n";
      }
      else
      { 
        let curPlusOne = bytes.charAt(i+1);
        if (curPlusOne == getASCII(curPlusOne)) puzzles += " ";
      }
    }
  }

  $answers.val(puzzles);

}

function createPuzzlesWOFFam()
{

  let bytes = $("#wofFamRomData").val();
  let $answers = $("#wofFamResults");
  let puzzles = ""; 

  let i = 0;
  for (i=0; i<bytes.length; i++)
  {
    let curChar = bytes.charAt(i);
    if (curChar.charCodeAt(0) == 9)
    {
      puzzles += "\n";
    }
    else
    {      
      let curAdj = getASCII(curChar);
      puzzles += curAdj;
  
      if (curChar != curAdj)
      {
        puzzles += " ";
/*
        let curLessOne = bytes.charAt(i-1);
        if (curLessOne != getASCII(curLessOne))
        {
          puzzles += "\n";
        }
        else
        { 
          let curPlusOne = bytes.charAt(i+1);
          if (curPlusOne == getASCII(curPlusOne)) puzzles += " ";
        }
*/
      }
    }
  }

  $answers.val(puzzles);



}


function getASCII(theChar)
{
  if (theChar == "") return "";
  let charVal = theChar.charCodeAt(0);
  if (charVal>31 && charVal<91) return theChar;
  let newChar = String.fromCharCode(charVal-128);
  return newChar;
}