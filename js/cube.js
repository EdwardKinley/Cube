document.addEventListener('DOMContentLoaded', () => {

  main = document.querySelector('.main');
  cubeSizes = [2, 3, 4, 5
    // , 6, 7, 8, 9
  ];
  colours = ['darkorange', 'green', 'white', 'blue', 'yellow', 'red'];

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
          if (k==0 || k==size+1) {
            // faceSquare.style.backgroundColor = 'salmon';
            const buttonSpace = document.createElement('button');
            buttonSpace.className = 'buttonSpace';
            buttonSpace.textContent = 'b';
            faceSquare.appendChild(buttonSpace);
          } else if (j!=0 && j!=size+1) {
            const faceSticker = document.createElement('div');
            faceSticker.className = 'faceSticker';
            faceSquare.style.backgroundColor = 'black';
            faceSquare.appendChild(faceSticker);
            // const randomNumber = Math.floor(Math.random() * 6);
            // faceSticker.style.backgroundColor = `${colours[randomNumber]}`;
            faceSticker.style.backgroundColor = `${colours[i]}`;
          }
          faceRow.appendChild(faceSquare);
        }
      }
    }
  }

})
