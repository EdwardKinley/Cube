document.addEventListener('DOMContentLoaded', () => {

  main = document.querySelector('.main');
  cubeSizes = [2, 3, 4, 5
    // , 6, 7, 8, 9
  ];
  colours = ['darkorange', 'green', 'white', 'blue', 'yellow', 'red'];
  chosenSize = 0;

  showCubeSizeOptions();

  function showCubeSizeOptions() {
    const cubeSizeOptions = document.createElement('div');
    cubeSizeOptions.className = 'cubeSizeOptions';
    main.appendChild(cubeSizeOptions);
    for (i=0; i<cubeSizes.length; i++) {
      const size = i+2;
      const cubeSizeOption = document.createElement('div');
      cubeSizeOption.className = 'cubeSizeOption';
      cubeSizeOptions.appendChild(cubeSizeOption);
      cubeSizeOption.addEventListener('click', () => {
        chosenSize = size;
        setUpCubeSpace(size);
      })
      for (j=0; j<cubeSizes[i]; j++) {
        const newRow = document.createElement('div');
        newRow.className = 'row';
        newRow.style.height = `${100/cubeSizes[i]}%`;
        cubeSizeOption.appendChild(newRow);
        for (k=0; k<cubeSizes[i]; k++) {
          const newSquare = document.createElement('div');
          newSquare.className = 'square';
          newSquare.style.height = '100%';
          newSquare.style.width = `${100/cubeSizes[i]}%`;
          newRow.appendChild(newSquare);
          const newSticker = document.createElement('div');
          newSticker.className = 'sticker';
          const randomNumber = Math.floor(Math.random() * 6);
          newSticker.style.backgroundColor = `${colours[randomNumber]}`;
          newSquare.appendChild(newSticker);
        }
      }
    }
  }

  function setUpCubeSpace(size) {
    main.innerHTML = '';
    // main.style.backgroundColor = 'grey';
    for (i=0; i<3; i++) {
      const cubeRow = document.createElement('div');
      cubeRow.className = 'cubeRow';
      // const randomNumber = Math.floor(Math.random() * 6);
      // cubeRow.style.backgroundColor = `${colours[randomNumber]}`;
      main.appendChild(cubeRow);
      for (j=0; j<4; j++) {
        const cubeFaceSpace = document.createElement('div');
        cubeFaceSpace.className = 'cubeFaceSpace';
        cubeFaceSpace.id = `faceSpace${i+1}${j+1}`
        // const randomNumber = Math.floor(Math.random() * 6);
        // cubeFaceSpace.style.backgroundColor = `${colours[randomNumber]}`;
        cubeRow.appendChild(cubeFaceSpace);
      }
    }
    showCube(size);
    showTurnButtons();
    showResetButtons();
  }

  function showCube(size) {
    // console.log('about to show cube with size', size);
    const faceSpaceIDs = [12, 21, 22, 23, 24, 32];
    for (i=0; i<faceSpaceIDs.length; i++) {
      const faceSpace = document.querySelector(`#faceSpace${faceSpaceIDs[i]}`);
      // faceSpace.style.backgroundColor = 'black';
      for (j=0; j<size+2; j++) {
        const faceRow = document.createElement('div');
        faceRow.className = 'faceRow';
        if (j==0 || j==size+1) {
          faceRow.style.height = '14%';
          // faceRow.style.backgroundColor = 'salmon';
        } else {
          faceRow.style.height = `${72/size}%`;
          // const randomNumber = Math.floor(Math.random() * 6);
          // faceRow.style.backgroundColor = `${colours[randomNumber]}`;
        }
        faceSpace.appendChild(faceRow);
        for (k=0; k<size+2; k++) {
          const faceSquare = document.createElement('div');
          faceSquare.className = 'faceSquare';
          if (k==0 || k==size+1) {
            faceSquare.style.width = '14%';
          } else {
            faceSquare.style.width = `${72/size}%`;
          }
          if (j==0 || j==size+1) {
            if (k!=0 && k!=size+1) {
              addMoveButton(faceSquare, i, j, k);
            }
          }
          if (k==0 || k==size+1) {
            if (j!=0 && j!=size+1) {
              addMoveButton(faceSquare, i, j, k);
            }
          } else if (j!=0 && j!=size+1) {
            const faceSticker = document.createElement('div');
            faceSticker.className = 'faceSticker';
            faceSticker.id = `sticker${i+1}${j}${k}`;
            faceSquare.style.backgroundColor = 'black';
            faceSquare.appendChild(faceSticker);
            const face = i+1;
            faceSquare.addEventListener('click', () => {
              if (face != 3) {
                changeFaceView(face);
              }
            })
            // const randomNumber = Math.floor(Math.random() * 6);
            // faceSticker.style.backgroundColor = `${colours[randomNumber]}`;
            faceSticker.style.backgroundColor = `${colours[i]}`;
          }
          faceRow.appendChild(faceSquare);
        }
      }
    }
  }

  function addMoveButton(faceSquare, i, j, k) {
    const moveButton = document.createElement('button');
    moveButton.className = 'moveButton';
    // moveButton.textContent = `${i+1}${j}${k}`;
    moveButton.id = `move${i+1}${j}${k}`;
    if (moveButton.id[5] == 0) {  moveButton.textContent = '▲'; }
    if (moveButton.id[5] == chosenSize+1) {  moveButton.textContent = '▼'; }
    if (moveButton.id[6] == 0) {  moveButton.textContent = '◀'; }
    if (moveButton.id[6] == chosenSize+1) {  moveButton.textContent = '▶'; }
    faceSquare.appendChild(moveButton);
    moveButton.addEventListener('click', () => {
      move(i, j, k);
    })
  }

  function move(i, j, k) {
    // console.log('i', i, 'j', j, 'k', k);
    face = i+1;
    s = chosenSize + 1;
    moves = [];
    toSwivel = 0;
    // console.log(toSwivel);
    fjk = face.toString()+j.toString()+k.toString();
    // console.log(fjk);

    if (fjk == 110 || fjk == `2${s}1` || fjk == `6${s-1}${s}` || fjk == `40${s-1}`) { toSwivel = '5c'; }
    if (fjk == `11${s}` || fjk == `4${s}${s-1}` || fjk == `6${s-1}0` || fjk == 201) { toSwivel = '5a'; }
    if (fjk == `1${s-1}0` || fjk == `2${s}${s-1}` || fjk == `61${s}` || fjk == 401) { toSwivel = '3a'; }
    if (fjk == `1${s-1}${s}` || fjk == `4${s}1` || fjk == 610 || fjk == `20${s-1}`) { toSwivel = '3c'; }
    if (fjk == 101 || fjk == `5${s}${s-1}` || fjk == 601 || fjk == 301) { toSwivel = '2a'; }
    if (fjk == `1${s}1` || fjk == `3${s}1` || fjk == `6${s}1` || fjk == `50${s-1}`) { toSwivel = '2c'; }
    if (fjk == `10${s-1}` || fjk == `5${s}1` || fjk == `60${s-1}` || fjk == `30${s-1}`) { toSwivel = '4c'; }
    if (fjk == `1${s}${s-1}` || fjk == `3${s}${s-1}` || fjk == `6${s}${s-1}` || fjk == 501) { toSwivel = '4a'; }
    if (fjk == 310 || fjk == 210 || fjk == 510 || fjk == 410) { toSwivel = '1c'; }
    if (fjk == `31${s}` || fjk == `41${s}` || fjk == `51${s}` || fjk == `21${s}`) { toSwivel = '1a'; }
    if (fjk == `3${s-1}0` || fjk == `2${s-1}0` || fjk == `5${s-1}0` || fjk == `4${s-1}0`) { toSwivel = '6a'; }
    if (fjk == `3${s-1}${s}` || fjk == `4${s-1}${s}` || fjk == `5${s-1}${s}` || fjk == `2${s-1}${s}`) { toSwivel = '6c'; }
    // console.log(toSwivel);

    if (face == 1) {
      if (k == 0) { moves = [`1${j}l`, `2${j}d`, `6${s-j}r`, `4${s-j}u`]; }
      if (k == s) { moves = [`1${j}r`, `4${s-j}d`, `6${s-j}l`, `2${j}u`]; }
      if (j == 0) { moves = [`1${k}u`, `5${s-k}d`, `6${k}u`, `3${k}u`]; }
      if (j == s) { moves = [`1${k}d`, `3${k}d`, `6${k}d`, `5${s-k}u`]; }
    }
    if (face == 2) {
      if (k == 0) { moves = [`2${j}l`, `5${j}l`, `4${j}l`, `3${j}l`]; }
      if (k == s) { moves = [`2${j}r`, `3${j}r`, `4${j}r`, `5${j}r`]; }
      if (j == 0) { moves = [`2${k}u`, `1${k}r`, `4${s-k}d`, `6${s-k}l`]; }
      if (j == s) { moves = [`2${k}d`, `6${s-k}r`, `4${s-k}u`, `1${k}l`]; }
    }
    if (face == 3) {
      if (k == 0) { moves = [`3${j}l`, `2${j}l`, `5${j}l`, `4${j}l`]; }
      if (k == s) { moves = [`3${j}r`, `4${j}r`, `5${j}r`, `2${j}r`]; }
      if (j == 0) { moves = [`3${k}u`, `1${k}u`, `5${s-k}d`, `6${k}u`]; }
      if (j == s) { moves = [`3${k}d`, `6${k}d`, `5${s-k}u`, `1${k}d`]; }
    }
    if (face == 4) {
      if (k == 0) { moves = [`4${j}l`, `3${j}l`, `2${j}l`, `5${j}l`]; }
      if (k == s) { moves = [`4${j}r`, `5${j}r`, `2${j}r`, `3${j}r`]; }
      if (j == 0) { moves = [`4${k}u`, `1${s-k}l`, `2${s-k}d`, `6${k}r`]; }
      if (j == s) { moves = [`4${k}d`, `6${k}l`, `2${s-k}u`, `1${s-k}r`]; }
    }
    if (face == 5) {
      if (k == 0) { moves = [`5${j}l`, `4${j}l`, `3${j}l`, `2${j}l`]; }
      if (k == s) { moves = [`5${j}r`, `2${j}r`, `3${j}r`, `4${j}r`]; }
      if (j == 0) { moves = [`5${k}u`, `1${s-k}d`, `3${s-k}d`, `6${s-k}d`]; }
      if (j == s) { moves = [`5${k}d`, `6${s-k}u`, `3${s-k}u`, `1${s-k}u`]; }
    }
    if (face == 6) {
      if (k == 0) { moves = [`6${j}l`, `2${s-j}u`, `1${s-j}r`, `4${j}d`]; }
      if (k == s) { moves = [`6${j}r`, `4${j}u`, `1${s-j}l`, `2${s-j}d`]; }
      if (j == 0) { moves = [`6${k}u`, `3${k}u`, `1${k}u`, `5${s-k}d`]; }
      if (j == s) { moves = [`6${k}d`, `5${s-k}u`, `1${k}d`, `3${k}d`]; }
    }

    temp = [];
    for (m=1; m<s; m++) {
      if (moves[0][2] == 'r') { temp.push(document.querySelector(`#sticker${face}${j}${s-m}`).style.backgroundColor); }
      if (moves[0][2] == 'l') { temp.push(document.querySelector(`#sticker${face}${j}${m}`).style.backgroundColor); }
      if (moves[0][2] == 'd') { temp.push(document.querySelector(`#sticker${face}${s-m}${k}`).style.backgroundColor); }
      if (moves[0][2] == 'u') { temp.push(document.querySelector(`#sticker${face}${m}${k}`).style.backgroundColor); }
    }

    const moveElements = [];
    // console.log(moveElements);
    for (n=0; n<moves.length; n++) {
      // console.log(n);
      // console.log(moves[n]);
      const movesTemp = [];
      for (p=0; p<chosenSize; p++) {
        // movesTemp.push(document.querySelector(`#sticker${face}${j}${m}`));
        // if (moves[n][2] == 'r' || moves[n][2] == 'l') { movesTemp.push(document.querySelector(`#sticker${moves[n][0]}${moves[n][1]}${p+1}`)); }
        if (moves[n][2] == 'r') { movesTemp.push(document.querySelector(`#sticker${moves[n][0]}${moves[n][1]}${s-1-p}`)); }
        if (moves[n][2] == 'l') { movesTemp.push(document.querySelector(`#sticker${moves[n][0]}${moves[n][1]}${p+1}`)); }
        // if (moves[n][2] == 'd' || moves[n][2] == 'u') { movesTemp.push(document.querySelector(`#sticker${moves[n][0]}${p+1}${moves[n][1]}`)); }
        if (moves[n][2] == 'd') { movesTemp.push(document.querySelector(`#sticker${moves[n][0]}${s-1-p}${moves[n][1]}`)); }
        if (moves[n][2] == 'u') { movesTemp.push(document.querySelector(`#sticker${moves[n][0]}${p+1}${moves[n][1]}`)); }
        // if (moves[n][2] == 'u' || moves[n][2] == 'd') { movesTemp.push(document.querySelector(`#sticker${face}${m}${j}`).style.backgroundColor); }
      }
      moveElements.push(movesTemp);
      // console.log(movesTemp);
    }

    // console.log(moveElements);

    for (r=0; r<chosenSize; r++) {
      moveElements[0][r].style.backgroundColor = `${moveElements[moveElements.length-1][r].style.backgroundColor}`;
    }

    for (q=moveElements.length-1; q>1; q--) {
      for (r=0; r<chosenSize; r++) {
        moveElements[q][r].style.backgroundColor = `${moveElements[q-1][r].style.backgroundColor}`;
      }
    }

    // console.log(temp);
    for (r=0; r<chosenSize; r++) {
      moveElements[1][r].style.backgroundColor = `${temp[r]}`;
    }

    // console.log(toSwivel);
    //
    // console.log(toSwivel[1]);

    // if (toSwivel[1] == 'c') {
    //   console.log('clockwise');
    // }
    //
    //
    // if (toSwivel[1] == 'a') {
    //   console.log('anti');
    // }
    // console.log(toSwivel);
    swivel(toSwivel);

  }

  function swivel(toSwivel) {
    if (toSwivel[1] == 'c') {
      const temp = [];
      for (i=0; i<chosenSize-1; i++) { temp.push(document.querySelector(`#sticker${toSwivel[0]}${i+1}1`).style.backgroundColor);   }
      for (i=0; i<chosenSize-1; i++) { document.querySelector(`#sticker${toSwivel[0]}${i+1}1`).style.backgroundColor = document.querySelector(`#sticker${toSwivel[0]}${chosenSize}${i+1}`).style.backgroundColor;}
      for (i=0; i<chosenSize-1; i++) { document.querySelector(`#sticker${toSwivel[0]}${chosenSize}${i+1}`).style.backgroundColor = document.querySelector(`#sticker${toSwivel[0]}${chosenSize-i}${chosenSize}`).style.backgroundColor;}
      for (i=0; i<chosenSize-1; i++) { document.querySelector(`#sticker${toSwivel[0]}${chosenSize-i}${chosenSize}`).style.backgroundColor = document.querySelector(`#sticker${toSwivel[0]}1${chosenSize-i}`).style.backgroundColor; }
      for (i=0; i<chosenSize-1; i++) { document.querySelector(`#sticker${toSwivel[0]}1${chosenSize-i}`).style.backgroundColor = temp[i]; }

      if (chosenSize > 3) {
        const temp = [];
        for (i=1; i<chosenSize-2; i++) { temp.push(document.querySelector(`#sticker${toSwivel[0]}${i+1}2`).style.backgroundColor); }
        for (i=1; i<chosenSize-2; i++) { document.querySelector(`#sticker${toSwivel[0]}${i+1}2`).style.backgroundColor = document.querySelector(`#sticker${toSwivel[0]}${chosenSize-1}${i+1}`).style.backgroundColor; }
        for (i=1; i<chosenSize-2; i++) { document.querySelector(`#sticker${toSwivel[0]}${chosenSize-1}${i+1}`).style.backgroundColor = document.querySelector(`#sticker${toSwivel[0]}${chosenSize-i}${chosenSize-1}`).style.backgroundColor; }
        for (i=1; i<chosenSize-2; i++) { document.querySelector(`#sticker${toSwivel[0]}${chosenSize-i}${chosenSize-1}`).style.backgroundColor = document.querySelector(`#sticker${toSwivel[0]}2${chosenSize-i}`).style.backgroundColor; }
        for (i=1; i<chosenSize-2; i++) { document.querySelector(`#sticker${toSwivel[0]}2${chosenSize-i}`).style.backgroundColor = temp[i-1]; }
      }
    }
    if (toSwivel[1] == 'a') {
      const temp = [];
      for (i=0; i<chosenSize-1; i++) { temp.push(document.querySelector(`#sticker${toSwivel[0]}1${i+1}`).style.backgroundColor); }
      for (i=0; i<chosenSize-1; i++) { document.querySelector(`#sticker${toSwivel[0]}1${i+1}`).style.backgroundColor = document.querySelector(`#sticker${toSwivel[0]}${i+1}${chosenSize}`).style.backgroundColor;}
      for (i=0; i<chosenSize-1; i++) { document.querySelector(`#sticker${toSwivel[0]}${i+1}${chosenSize}`).style.backgroundColor = document.querySelector(`#sticker${toSwivel[0]}${chosenSize}${chosenSize-i}`).style.backgroundColor;}
      for (i=0; i<chosenSize-1; i++) { document.querySelector(`#sticker${toSwivel[0]}${chosenSize}${chosenSize-i}`).style.backgroundColor = document.querySelector(`#sticker${toSwivel[0]}${chosenSize-i}1`).style.backgroundColor; }
      for (i=0; i<chosenSize-1; i++) { document.querySelector(`#sticker${toSwivel[0]}${chosenSize-i}1`).style.backgroundColor = temp[i]; }

      if (chosenSize > 3) {
        const temp = [];
        for (i=1; i<chosenSize-2; i++) { temp.push(document.querySelector(`#sticker${toSwivel[0]}2${i+1}`).style.backgroundColor); }
        for (i=1; i<chosenSize-2; i++) { document.querySelector(`#sticker${toSwivel[0]}2${i+1}`).style.backgroundColor = document.querySelector(`#sticker${toSwivel[0]}${i+1}${chosenSize-1}`).style.backgroundColor; }
        for (i=1; i<chosenSize-2; i++) { document.querySelector(`#sticker${toSwivel[0]}${i+1}${chosenSize-1}`).style.backgroundColor = document.querySelector(`#sticker${toSwivel[0]}${chosenSize-1}${chosenSize-i}`).style.backgroundColor; }
        for (i=1; i<chosenSize-2; i++) { document.querySelector(`#sticker${toSwivel[0]}${chosenSize-1}${chosenSize-i}`).style.backgroundColor = document.querySelector(`#sticker${toSwivel[0]}${chosenSize-i}2`).style.backgroundColor; }
        for (i=1; i<chosenSize-2; i++) { document.querySelector(`#sticker${toSwivel[0]}${chosenSize-i}2`).style.backgroundColor = temp[i-1]; }
      }
    }
  }

  function showTurnButtons() {
    const clockwiseButton = document.createElement('img');
    clockwiseButton.setAttribute('src', `images/clockwise_arrow.png`);
    clockwiseButton.setAttribute('alt', `clockwise quarter-turn arrow`);
    clockwiseButton.className = 'turnButton';
    clockwiseButton.id = 'clockwiseButton';
    document.querySelector('#faceSpace13').appendChild(clockwiseButton);
    clockwiseButton.addEventListener('click', () => {
      order = ['3100', '12c1', '26c1', '64c1', '43c1', '55a1', '3t00'];
      moveFaces(order);
      swivel('3c');
    })
    const anticlockwiseButton = document.createElement('img');
    anticlockwiseButton.setAttribute('src', `images/anticlockwise_arrow.png`);
    anticlockwiseButton.setAttribute('alt', `anticlockwise quarter-turn arrow`);
    anticlockwiseButton.className = 'turnButton';
    anticlockwiseButton.id = 'anticlockwiseButton';
    anticlockwiseButton.addEventListener('click', () => {
      order = ['3100', '14a1', '46a1', '62a1', '23a1', '55c1', '3t00'];
      moveFaces(order);
      swivel('3a');
    })
    document.querySelector('#faceSpace11').appendChild(anticlockwiseButton);
  }

  function showResetButtons() {
    const scrambleButton = document.createElement('button');
    scrambleButton.className = 'resetButton';
    scrambleButton.textContent = 'Scramble';
    document.querySelector('#faceSpace31').appendChild(scrambleButton);
    scrambleButton.addEventListener('click', () => {
      for (t=0; t<30; t++) {
        console.log(t);
        const randomFace = Math.floor(Math.random() * 6);
        const randomDirection = Math.floor(Math.random() * 4);
        const randomRC = Math.ceil(Math.random() * chosenSize);
        console.log(randomFace, randomDirection, randomRC);
        if (randomDirection == 0) { move(randomFace, 0, randomRC); }
        else if (randomDirection == 1) { move(randomFace, chosenSize+1, randomRC); }
        else if (randomDirection == 2) { move(randomFace, randomRC, 0); }
        else if (randomDirection == 3) { move(randomFace, randomRC, chosenSize+1); }
      }
    })

    const resetButton = document.createElement('button');
    resetButton.className = 'resetButton';
    resetButton.textContent = 'Reset';
    document.querySelector('#faceSpace31').appendChild(resetButton);
    resetButton.addEventListener('click', () => {
      main.innerHTML = '';
      setUpCubeSpace(chosenSize);
    })

    const newButton = document.createElement('button');
    newButton.className = 'resetButton';
    newButton.textContent = 'New';
    document.querySelector('#faceSpace31').appendChild(newButton);
    newButton.addEventListener('click', () => {
      location.reload();
    })
  }

  function changeFaceView(face) {
    order = [];
    if (face == 1) { order = ['3100', '15c2', '56c2', '22c1', '44a1', '6t00']; }
    if (face == 2) { order = ['3200', '2500', '5400', '11a1', '66c1', '4t00']; }
    if (face == 4) { order = ['3400', '4500', '5200', '11c1', '66a1', '2t00']; }
    if (face == 5) { order = ['3500', '5200', '2400', '4500', '11c2', '66c2', '5t00']; }
    if (face == 6) { order = ['3600', '65c2', '51c2', '22a1', '44c1', '1t00']; }

    moveFaces(order);
  }

  function moveFaces(order) {
    const temp = [];
    for (i=1; i<=chosenSize; i++) {
      for (j=1; j<=chosenSize; j++) {
        temp.push(document.querySelector(`#sticker3${i}${j}`).style.backgroundColor);
      }
    }
    for (m=0; m<order.length-1; m++) {
      for (n=1; n<=chosenSize; n++) {
        for (p=1; p<=chosenSize; p++) {
          // console.log(`#sticker${order[m][0]}${n}${p}`);
          document.querySelector(`#sticker${order[m][0]}${n}${p}`).style.backgroundColor = document.querySelector(`#sticker${order[m][1]}${n}${p}`).style.backgroundColor;
        }
      }
      if (order[m][3] == 1) { swivel(`${order[m][0]}${order[m][2]}`); }
      if (order[m][3] == 2) { swivel(`${order[m][0]}${order[m][2]}`); swivel(`${order[m][0]}${order[m][2]}`); }
      console.log(order[m]);
    }
    for (n=1; n<=chosenSize; n++) {
      for (p=1; p<=chosenSize; p++) {
        console.log(`#sticker${order[m][0]}${n}${p}`);
        document.querySelector(`#sticker${order[order.length-1][0]}${n}${p}`).style.backgroundColor = temp[(n-1)*chosenSize + (p-1)];
      }
    }
  }



})
