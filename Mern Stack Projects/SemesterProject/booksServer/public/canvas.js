document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('paintCanvas');
    const context = canvas.getContext('2d');
    const colorPicker = document.getElementById('colorPicker');
    const brushSizeInput = document.getElementById('brushSize');
    const clearCanvasBtn = document.getElementById('clearCanvas');
    const saveCanvasBtn = document.getElementById('saveCanvas');
    const setBgColorBtn = document.getElementById('setBgColor');
    const undoBtn = document.getElementById('undo');
    const redoBtn = document.getElementById('redo');
    const colorBoxes = document.querySelectorAll('.color-box');
    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');
    let currentColor = '#000';
    let painting = false;
    let history = [];
    let redoHistory = [];

    function saveState() {
      history.push(canvas.toDataURL());
      redoHistory = [];
    }

    function startPosition(e) {
      painting = true;
      draw(e);
    }

    function endPosition() {
      painting = false;
      context.beginPath();
      saveState();
    }

    function draw(e) {
      if (!painting) return;

      context.lineWidth = brushSizeInput.value;
      context.lineCap = 'round';
      context.strokeStyle = currentColor;

      context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      context.stroke();
      context.beginPath();
      context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    function clearCanvas() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      saveState();
    }

    function saveCanvas() {
      const image = canvas.toDataURL();
      const link = document.createElement('a');
      link.href = image;
      link.download = 'artwork.png';
      link.click();
    }

    function loadImage(src) {
      const img = new Image();
      img.onload = function () {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        saveState();
      };
      img.src = src;
    }

    function setBackground() {
      context.fillStyle = currentColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
      saveState();
    }

    function undo() {
      if (history.length > 0) {
        redoHistory.push(history.pop());
        const imgData = history[history.length - 1];
        const img = new Image();
        img.onload = function () {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(img, 0, 0);
        };
        img.src = imgData;
      }
    }

    function redo() {
      if (redoHistory.length > 0) {
        history.push(redoHistory.pop());
        const imgData = history[history.length - 1];
        const img = new Image();
        img.onload = function () {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(img, 0, 0);
        };
        img.src = imgData;
      }
    }

    colorBoxes.forEach(box => {
      box.addEventListener('click', function () {
        currentColor = this.dataset.color;
      });
    });

    colorPicker.addEventListener('change', function () {
      currentColor = this.value;
    });

    image1.addEventListener('click', function () {
      loadImage('images/animal.png');
    });

    image2.addEventListener('click', function () {
      loadImage('images/Alpaca.png');
    });

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);

    clearCanvasBtn.addEventListener('click', clearCanvas);
    saveCanvasBtn.addEventListener('click', saveCanvas);
    setBgColorBtn.addEventListener('click', setBackground);
    undoBtn.addEventListener('click', undo);
    redoBtn.addEventListener('click', redo);

    saveState();
  });