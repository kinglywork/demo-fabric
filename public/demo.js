var canvas = new fabric.Canvas('c');
fabric.Object.prototype.transparentCorners = false;

// -----rect-----
function addRect() {
  var rect = new fabric.Rect({
    left: 50,
    top: 50,
    width: 150,
    height: 120,
    fill: 'rgba(255,0,0,0)',
    strokeWidth: 3,
    stroke: 'rgba(100,200,200,0.5)'
  });
  canvas.add(rect);
}

// -----circle-----
function addCircle() {
  var circle = new fabric.Circle();
  circle.set({
    left: 220,
    top: 70,
    radius: 50,
    fill: 'rgba(255,0,0,0)',
    strokeWidth: 3,
    stroke: 'rgba(100,200,200,0.5)'
  });
  canvas.add(circle);
}

// -----line-----
function addLine() {
  var line = new fabric.Line([350, 150, 550, 150], {
    fill: 'red',
    stroke: 'red',
    strokeWidth: 2
  });
  canvas.add(line);
}

// -----svg arrow-----
function addSVG() {
  fabric.loadSVGFromURL('arrow.svg', function (objects, options) {
    var obj = fabric.util.groupSVGElements(objects, options);
    obj.setLeft(400);
    obj.setTop(50);
    canvas.add(obj).renderAll();
  });
}

// -----Text-----
function addText() {
  canvas.add(new fabric.IText('click to change text here', {
    fontFamily: 'arial',
    left: 50,
    top: 200
  }));
}

// -----image-----
function addBackgroundImage(){
  fabric.Image.fromURL('report.jpg', function (img) {
    img.set({
      left: 100,
      top: 300,
      clipTo: function (ctx) {
        ctx.rect(-(img.width / 2), -(img.height / 2), img.width, img.height - 100);
      }
    });
    // use this to add image object and interact with it
    // canvas.add(img).setActiveObject(img);

    // use this to add image as background
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
  }, {crossOrigin: 'anonymous'});
}

function copy() {
  // clone what are you copying since you
  // may want copy and paste on different moment.
  // and you do not want the changes happened
  // later to reflect on the copy.
  canvas.getActiveObject().clone(function (cloned) {
    _clipboard = cloned;
  });
}

function paste() {
  // clone again, so you can do multiple copies.
  _clipboard.clone(function (clonedObj) {
    canvas.discardActiveObject();
    clonedObj.set({
      left: clonedObj.left + 10,
      top: clonedObj.top + 10,
      evented: true,
    });
    if (clonedObj.type === 'activeSelection') {
      // active selection needs a reference to the canvas.
      clonedObj.canvas = canvas;
      clonedObj.forEachObject(function (obj) {
        canvas.add(obj);
      });
      // this should solve the unselectability
      clonedObj.setCoords();
    } else {
      canvas.add(clonedObj);
    }
    _clipboard.top += 10;
    _clipboard.left += 10;
    canvas.setActiveObject(clonedObj);
    canvas.requestRenderAll();
  });
}

function del() {
  canvas.remove(canvas.getActiveObject());
}

function clearAll() {
  canvas.clear();
}

function exportBase64() {
  return canvas.toDataURL();
}

function exportJson() {
  return canvas.toJSON();
}

function importJson(json) {
  canvas.loadFromJSON(json);
}

var tempStorage;

window.onload = function () {
  document.getElementById('btnAddRect').addEventListener('click', addRect);
  document.getElementById('btnAddCircle').addEventListener('click', addCircle);
  document.getElementById('btnAddLine').addEventListener('click', addLine);
  document.getElementById('btnAddText').addEventListener('click', addText);
  document.getElementById('btnAddArrow').addEventListener('click', addSVG);
  document.getElementById('btnAddBackgroundImage').addEventListener('click', addBackgroundImage);

  document.getElementById('btnCopy').addEventListener('click', copy);
  document.getElementById('btnPaste').addEventListener('click', paste);
  document.getElementById('btnDelete').addEventListener('click', del);
  document.getElementById('btnExport').addEventListener('click', function () {
    document.getElementById('exportedImage').src = exportBase64();
    tempStorage = exportJson();
    console.log(tempStorage);
  });
  document.getElementById('btnImport').addEventListener('click', function () {
    importJson(tempStorage);
  });
  document.getElementById('btnClear').addEventListener('click', clearAll);


  addRect();
  addCircle();
  addLine();
  addText();
  addSVG();
  addBackgroundImage();
};