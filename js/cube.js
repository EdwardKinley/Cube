document.addEventListener('DOMContentLoaded', () => {

  main = document.querySelector('.main');
  cubeSizes = [2, 3, 4, 5];
  colours = ['white', 'green', 'blue', 'red', 'darkorange', 'yellow'];

  showCubeSizeOptions();

  function showCubeSizeOptions() {
    const cubeSizeOptions = document.createElement('div');
    cubeSizeOptions.className = 'cubeSizeOptions';
    main.appendChild(cubeSizeOptions);
    for (i=0; i<cubeSizes.length; i++) {
      const cubeSizeOption = document.createElement('div');
      cubeSizeOption.className = 'cubeSizeOption';
      cubeSizeOptions.appendChild(cubeSizeOption);
      for (j=0; j<cubeSizes[i]; j++) {
        console.log(j+1);
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

})
