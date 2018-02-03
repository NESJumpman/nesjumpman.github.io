# NES stuff
## Wheel of Fortune Cheat Tool!
* Given all this stuff below, behold... the [cheat tool](puzzleFinder.html)
## Wheel of Fortune
* Took the ROM, dumped the section of data that had the puzzles. 
* Used this [this page](https://www.zophar.net/forums/showthread.php?t=14547#5) to get a head start on the encoding used to separate puzzles.
* Ended up with [all the puzzles](WOF/wofAllPuzzles.txt)
* Script used to convert ROM bytes to puzzle list, [written in M](WOF/puzzleScript).

## Wheel of Fortune Family Edition
* Took the ROM, dumped the section of data that had the puzzles. 
* Previous attempt did not work, new encodings. My best guess:
  * 128 still added for newlines
  * End of puzzles are indicated by various control characters (5, 6) and NULL (0)
* Ended up with [all the puzzles](WOF/wofFamilyAllPuzzles.txt)
* Javascript FileReader, to the rescue:
  * [Javascript page](WOF/wofFamilyGenerate.html) to generate the answers.
  * [Raw bytes](WOF/wofFamilyPuzzleBytes.nes) needed to generate the puzzle answers

## Wheel of Fortune Junior Edition
* Same formatting as Family Edition, used the same tool as above
* And voila - [all the puzzles](WOF/wofJuniorAllPuzzles.txt)

## Wheel of Fortune Vanna White
* This one is tricky: I see no clear evidence that the puzzles are ASCII encoded.
* Currently on hold while I consider going down this rabbit hole...
