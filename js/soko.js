/*   This is the base file for the Sokoban assignment - include this one in your HTML page, before you add the main script file*/
  const board = document.getElementById("board");
  let GameWon = false
/*   Enum of CSS Classes for the static elements   */
  const Tiles = {
    Wall: "tile-wall",
    Space: "tile-space",
    Goal: "tile-goal",
  };
  
  /*   Enum of CSS Classes for the moving elements   */
  const Entities = {
    Character: "entity-player",
    Block: "entity-block",
    BlockDone: "entity-block-goal",
  };
  
  /*  Legend
      W = Wall
      B = Movable block
      P = Player starting position
      G = Goal area for the blocks
  */
  const tileMap01 = {
    width: 19,
    height: 16,
    mapGrid: [
      [
        [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "],
      ],
      [
        [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "],
      ],
      [
        [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "],
      ],
      [
        [" "], [" "], [" "], [" "], ["W"], ["W"], ["W"], ["W"], ["W"], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "],
      ],
      [
        [" "], [" "], [" "], [" "], ["W"], [" "], [" "], [" "], ["W"], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "],
      ],
      [
        [" "], [" "], [" "], [" "], ["W"], ["B"], [" "], [" "], ["W"], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "],
      ],
      [
        [" "], [" "], ["W"], ["W"], ["W"], [" "], [" "], ["B"], ["W"], ["W"], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "],
      ],
      [
        [" "], [" "], ["W"], [" "], [" "], ["B"], [" "], ["B"], [" "], ["W"], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "],
      ],
      [
        ["W"], ["W"], ["W"], [" "], ["W"], [" "], ["W"], ["W"], [" "], ["W"], [" "], [" "], [" "], ["W"], ["W"], ["W"], ["W"], ["W"], ["W"],
      ],
      [
        ["W"], [" "], [" "], [" "], ["W"], [" "], ["W"], ["W"], [" "], ["W"], ["W"], ["W"], ["W"], ["W"], [" "], [" "], ["G"], ["G"], ["W"],
      ],
      [
        ["W"], [" "], ["B"], [" "], [" "], ["B"], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], ["G"], ["G"], ["W"],
      ],
      [
        ["W"], ["W"], ["W"], ["W"], ["W"], [" "], ["W"], ["W"], ["W"], [" "], ["W"], ["P"], ["W"], ["W"], [" "], [" "], ["G"], ["G"], ["W"],
      ],
      [
        [" "], [" "], [" "], [" "], ["W"], [" "], [" "], [" "], [" "], [" "], ["W"], ["W"], ["W"], ["W"], ["W"], ["W"], ["W"], ["W"], ["W"],
      ],
      [
        [" "], [" "], [" "], [" "], ["W"], ["W"], ["W"], ["W"], ["W"], ["W"], ["W"], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "],
      ],
      [
        [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "],
      ],
      [
        [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "], [" "],
      ],
    ],
  };
  let PlayPos =  { y:0 , x:0};
  function renderBoard(){
    for(let y = 0; y < tileMap01.mapGrid.length; y++){
        for(let x = 0; x < tileMap01.mapGrid[y].length; x ++){
            let tile = document.createElement('div');
            console.log(tileMap01.mapGrid[y][x])
            tile.id = `${y}/${x}`
            switch(tileMap01.mapGrid[y][x][0]){
                case "W":
                    tile.classList.add(Tiles.Wall)
                    break;
                case "B":
                    tile.classList.add(Tiles.Space)
                    tile.classList.add(Entities.Block)
                    break;
                case "P":
                    tile.classList.add(Tiles.Space)
                    tile.classList.add(Entities.Character)
                    PlayPos.y = y;
                    PlayPos.x = x;
                    break;
                case "G":
                    tile.classList.add(Tiles.Goal)
                    break;
                default:
                    tile.classList.add(Tiles.Space)
                    break;
            }
            board.appendChild(tile)
        }
    }
  }
  renderBoard()
  document.addEventListener('keydown', move);

  function move(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
    if(!GameWon){
        switch(e.code){
            case 'ArrowUp':
                if(tileMap01.mapGrid[PlayPos.y-1][PlayPos.x] != "W"){
                    if(tileMap01.mapGrid[PlayPos.y-1][PlayPos.x] != "B"){
                        moveplayer(PlayPos.y-1, PlayPos.x)
                    }else{
                        if(tileMap01.mapGrid[PlayPos.y-2][PlayPos.x] != "W" && tileMap01.mapGrid[PlayPos.y-2][PlayPos.x] != "B"){
                            moveBlock(PlayPos.y-1, PlayPos.x, PlayPos.y-2, PlayPos.x)
                            moveplayer(PlayPos.y-1, PlayPos.x)
                            
                        }
                    }

                    
                }
                break;
            case 'ArrowDown':
                if(tileMap01.mapGrid[PlayPos.y+1][PlayPos.x] != "W"){
                    if(tileMap01.mapGrid[PlayPos.y+1][PlayPos.x] != "B"){
                        moveplayer(PlayPos.y+1, PlayPos.x)
                    }else{
                        if(tileMap01.mapGrid[PlayPos.y+2][PlayPos.x] != "W"  && tileMap01.mapGrid[PlayPos.y+2][PlayPos.x] != "B"){
                            moveBlock(PlayPos.y+1, PlayPos.x, PlayPos.y+2, PlayPos.x)
                            moveplayer(PlayPos.y+1, PlayPos.x)
                            
                        }
                    }
                    
                }
                break;
            case 'ArrowLeft':
                if(tileMap01.mapGrid[PlayPos.y][PlayPos.x-1] != "W"){
                    if(tileMap01.mapGrid[PlayPos.y][PlayPos.x-1] != "B"){
                        moveplayer(PlayPos.y, PlayPos.x-1)
                    }else{
                        if(tileMap01.mapGrid[PlayPos.y][PlayPos.x-2] != "W" && tileMap01.mapGrid[PlayPos.y][PlayPos.x-2] != "B"){
                            moveBlock(PlayPos.y, PlayPos.x-1, PlayPos.y, PlayPos.x-2)
                            moveplayer(PlayPos.y, PlayPos.x-1)
                        }
                    }
                    
                }
                break;
            case 'ArrowRight':
                if(tileMap01.mapGrid[PlayPos.y][PlayPos.x+1] != "W"){
                    if(tileMap01.mapGrid[PlayPos.y][PlayPos.x+1] != "B"){
                        moveplayer(PlayPos.y, PlayPos.x+1)
                    }else{
                        if(tileMap01.mapGrid[PlayPos.y][PlayPos.x+2] != "W" && tileMap01.mapGrid[PlayPos.y][PlayPos.x+2] != "B"){
                            moveBlock(PlayPos.y, PlayPos.x+1, PlayPos.y, PlayPos.x+2)
                            moveplayer(PlayPos.y, PlayPos.x+1)

                        }
                    }
                    
                }
                break;
        }
        
        checkWin()
    }
  }
  function moveplayer(y, x){
    let oldPlayer = document.getElementById(`${PlayPos.y}/${PlayPos.x}`)
    oldPlayer.classList.remove(Entities.Character)
    if(oldPlayer.classList.contains(Tiles.Goal)){
        tileMap01.mapGrid[PlayPos.y][PlayPos.x] = ["G"];
    }else{
        tileMap01.mapGrid[PlayPos.y][PlayPos.x] = [" "];
    }
    


    let newPlayer = document.getElementById(`${y}/${x}`)
    newPlayer.classList.add(Entities.Character)
    tileMap01.mapGrid[y][x] = ["P"]

    PlayPos.y = y;
    PlayPos.x = x;
  }
  function moveBlock(BlockY, BlockX, NewY, NewX){
    let oldBlock = document.getElementById(`${BlockY}/${BlockX}`)
    oldBlock.classList.remove(Entities.Block)
    oldBlock.classList.remove(Entities.BlockDone)
    if(oldBlock.classList.contains(Tiles.Goal)){
        tileMap01.mapGrid[BlockY][BlockX] = ["G"];
    }else{
        tileMap01.mapGrid[BlockY][BlockX] = [" "];
    }
    

    let newBlock = document.getElementById(`${NewY}/${NewX}`)
    if(newBlock.classList.contains(Tiles.Goal)){
        newBlock.classList.add(Entities.BlockDone)
    }else{
        newBlock.classList.add(Entities.Block)
    }
    
    tileMap01.mapGrid[NewY][NewX] = ["B"]
 
  }
  function checkWin(){
    win = true;
    for(let y = 0; y < tileMap01.mapGrid.length; y++){
        for(let x = 0; x < tileMap01.mapGrid[y].length; x++){
            let pos = document.getElementById(`${y}/${x}`)
            if(pos.classList.contains(Entities.Block)){
                win = false;
            }
        }
    }
    if(win === true){
        alert("you won")
        GameWon = true;
    }
  }