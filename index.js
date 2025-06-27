const DIRECTIONS = ['N','E','S','W'];
const MOVE_MAP = {
    'N': {x:0,y:1},
    'E': {x:1,y:0},
    'S': {x:0,y:-1},
    'W': {x:-1,y:0}
}
const turn = (currentDirection, turnDirection) => {
    const index = DIRECTIONS.indexOf(currentDirection);
    if(turnDirection === 'L') {
        return DIRECTIONS[(index+3)%4];
    }
    else if(turnDirection === 'R')
        return DIRECTIONS[(index+1)%4];

    return currentDirection;
}

const move = (x, y, direction) => {
    const delta = MOVE_MAP[direction];
    return {x: x+delta.x, y: y+delta.y}
}




const executeInstructions = (startX, startY, startDir, instructions, plateauMax) => {
    let x = startX;
    let y = startY;

    let dir = startDir;
    for(const command of instructions){
        if(command === 'L' || command === 'R'){
            dir = turn(dir, command);
        }
        else if (command === 'M') {
            const next = move(x, y, dir);
            if (next.x >= 0 && next.x <= plateauMax.x && next.y >= 0 && next.y <= plateauMax.y) {
                x = next.x;
                y = next.y;
            }
        }
    }

    return `${x} ${y} ${dir}`
}

const main = (input)=>{
    const lines = input.trim().split('\n');
    const [maxX, maxY] = lines[0].split(' ').map((val)=> Number(val));

    const plateauMax = {x: maxX, y: maxY}

    const results = [];

    for(let i=1;i<lines.length; i+=2){
        const [x,y,dir] = lines[i].split(' ');
        const instructions = lines[i+1].trim();

        const result = executeInstructions(parseInt(x), parseInt(y), dir, instructions, plateauMax)
        results.push(result)
    }
    
    return results.join('\n');
}

const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

console.log(main(input));
