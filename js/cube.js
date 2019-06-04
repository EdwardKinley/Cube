document.addEventListener('DOMContentLoaded', () => {

  main = document.querySelector('.main');
  cubeSizes = [2, 3, 4, 5
    , 6, 7, 8, 9
  ];
  colours = ['white', 'green', 'blue', 'red', 'darkorange', 'yellow'];

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
    console.log('about to show cube with size', size);
    const faceSpaceIDs = [12, 21, 22, 23, 24, 32];
    for (i=0; i<faceSpaceIDs.length; i++) {
      const faceSpace = document.querySelector(`#faceSpace${faceSpaceIDs[i]}`);
      faceSpace.textContent = 'here';
      faceSpace.style.backgroundColor = 'black';
    }
  }

})
