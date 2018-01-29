# NES stuff
## Wheel of Fortune
* Took the ROM, dumped the section of data that had the puzzles. 
* Used this [this page](https://www.zophar.net/forums/showthread.php?t=14547#5) to get a head start on the encoding used to separate puzzles.
* Ended up with [all the puzzles](WOF/wofAllPuzzles.txt)
* Script used to convert ROM bytes to puzzle list, [written in M](WOF/puzzleScript).

## Wheel of Fortune Family Edition
* Took the ROM, dumped the section of data that had the puzzles. 
* Previous attempt did not work, new encodings. My best guess:
* * 128 still added for newlines
* * End of puzzles are indicated by various control characters (5, 6) and NULL (0)
* Ended up with [all the puzzles](WOF/wofFamilyAllPuzzles.txt)
* Javascript FileReader, to the rescue:
* * [Javascript page](WOF/wofFamilyGenerate.html) to generate the answers.
* * [Raw bytes](WOF/wofFamilyPuzzleBytes.nes) needed to generate the puzzle answers
