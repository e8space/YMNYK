class CanvasHandler {


  static canvasTypes = {
    backdrop: "backdrop",
    planets: "planets",
    backgroundFarthest: "backgroundFarthest",
    backgroundFar: "backgroundFar",
    backgroundMiddleFar: "backgroundMiddleFar",
    backgroundMiddle: "backgroundMiddle",
    backgroundFront: "backgroundFront",
    backgroundFace: "backgroundFace",
    weapons: "weapons",
    performanceInfo: "performanceInfo",
    haze: "haze",
    dust: "dust",
    explosion: "explosion"
  }

  #canvases = {
    "explosion": {
      "id": "explosion",
      "class": "fullscreenCanvas backgroundFaceCanvas"
    },
    "backdrop": {
      "id": "backdrop",
      "class": "fullscreenCanvas backdropCanvas"
    },
    "planets": {
      "id": "planets",
      "class": "fullscreenCanvas planetsCanvas"
    },
    "dust": {
      "id": "dust",
      "class": "fullscreenCanvas dustCanvas"
    },
    "backgroundFarthest": {
      "id": "backgroundFarthest",
      "class": "fullscreenCanvas backgroundFarthestCanvas"
    },
    "backgroundFar": {
      "id": "backgroundFar",
      "class": "fullscreenCanvas backgroundFarCanvas"
    },
    "backgroundMiddleFar": {
      "id": "backgroundMiddleFar",
      "class": "fullscreenCanvas backgroundMiddleFarCanvas"
    },
    "backgroundMiddle": {
      "id": "backgroundMiddle",
      "class": "fullscreenCanvas backgroundMiddleCanvas"
    },
    "backgroundFront": {
      "id": "backgroundFront",
      "class": "fullscreenCanvas backgroundFrontCanvas"
    },
    "backgroundFace": {
      "id": "backgroundFace",
      "class": "fullscreenCanvas backgroundFaceCanvas"
    },
    "weapons" : {
      "id" : "weapons",
      "class" : "fullscreenCanvas weaponsCanvas"
    },
    "performanceInfo" : {
      "id": "performanceInfo",
      "class" : "fullscreenCanvas performanceInfoCanvas",
    },
    "haze" : {
      "id": "haze",
      "class" : "fullscreenCanvas",
      "opacity": 0.1
    }
  }

  #staticCanvases = {

    "hudDynamicLeft": {
      "id": "hudDynamicLeft",
      "class": "sectionCanvasLeft",
      "contextStyles": {
        "font": "15px myFont"
      },
      "canvasStyles": {
        "top": ((e8.global.currentHeight-e8.global.screenHeight)/2) + 20 + "px",
        "left": ((e8.global.currentWidth-e8.global.screenWidth)/2)+ 100 +"px",
        "color": "grey",
        "border-radius": "10px"

      },
      "width": 340,
      "height": 200,
      "opacity": 0.7
    },
    "hudDynamicRight": {
      "id": "hudDynamicRight",
      "class": "sectionCanvasRight",
      "contextStyles": {
        "font": "15px myFont"
      },
      "canvasStyles": {
        "top": ((e8.global.currentHeight-e8.global.screenHeight)/2) + 20+ "px",
        "right": ((e8.global.currentWidth-e8.global.screenWidth)/2) + 100+ "px",
        "color": "red",
        "border-radius": "10px",

      },
      "width": 340,
      "height": 200,
      "opacity": 0.7
    },

    "hudDynamicMiddle": {
      "id": "hudDynamicMiddle",
      "class": "sectionCanvasMiddle",
      "contextStyles": {
        "font": "12px myFont",
        "fillStyle": "white"
      },
      "canvasStyles": {
        "top": 0 + "px",
        "left": (window.innerWidth / 2 - e8.global.screenWidth / 12) + "px",
        "color": "white",

      },
      "width": e8.global.screenWidth / 6,
      "height": 100,
      "opacity": 0.5
    }
  }

  constructor(){
    e8.init.subscribeForGlobalEvents(this);
    this.createCanvasElements(this.#canvases);
    this.createCanvasElements(this.#staticCanvases);
  }

  /**
   *
   */
  createCanvasElements = (canvasTemplates) => {
    for (const canvas in canvasTemplates) {

      const newCanvas  = document.createElement("canvas");
      newCanvas.id = canvasTemplates[canvas].id;
      newCanvas.width = canvasTemplates[canvas].width || e8.global.screenWidth;
      newCanvas.height = canvasTemplates[canvas].height || e8.global.screenHeight;
      newCanvas.className = canvasTemplates[canvas].class;
      canvasTemplates[canvas].canvas = newCanvas;
      canvasTemplates[canvas].context = newCanvas.getContext("2d");
      canvasTemplates[canvas].context.imageSmoothingEnabled = false;
      canvasTemplates[canvas].context.imageSmoothingQuality = 'high';
      canvasTemplates[canvas].context.globalAlpha = canvasTemplates[canvas].opacity || 1;

      const canvasStyles = canvasTemplates[canvas]?.canvasStyles;
      if (canvasStyles) {
        Object.assign(newCanvas.style, canvasStyles);
      }

      const contextStyles = canvasTemplates[canvas]?.contextStyles;
      if (contextStyles) {
        Object.assign(canvasTemplates[canvas].context, contextStyles);
      }
      document.querySelector("#game").appendChild(newCanvas);
    }
  }


  updateFromGlobalEvent = ({message, payload}) =>{
    if (message === e8.globalEvents.screenResized) {
      for (const canvas in this.#canvases){
        const canvass = document.getElementById(this.#canvases[canvas].id);
        canvass.width = payload.width;
        canvass.height = payload.height;
      }
      const settings = document.getElementById("settings");
      settings.style.width = payload.width;
      settings.style.height = payload.height;
    }

  }

  /**
   *
   * @param id
   * @param width
   * @param height
   * @param container
   * @returns {HTMLCanvasElement}
   */
  createAdHocCanvas = ({
                         id,
                         width,
                         height,
                         container
  }) => {
    const canvas = document.createElement("canvas");
    canvas.id = id;
    canvas.width = width;
    canvas.height = height
    document.querySelector("#"+container).appendChild(canvas);
    return canvas;
  }

  /**
   *
   * @param id
   * @param width
   * @param height
   * @returns {OffscreenCanvas}
   */
  createOffscreenCanvas = ({
                             id,
                             width,
                             height
  })=>{
    const canvas = new OffscreenCanvas(width, height);
    canvas.id = id;
    return canvas
  }



  unblurCanvases = () =>{
    for (const canvas in this.#canvases) {
      this.#canvases[canvas].context.filter = ("none");
    }
  }

  blurCanvases = () =>{
    for (const canvas in this.#canvases) {
      if (canvas !== "settings") {
        this.#canvases[canvas].context.filter = ("blur(20px)");
      }
    }
    //this.#canvases["settings"].context.filter = ("none");
  }

  /**
   *
   * @param id
   * @returns {*}
   */
  getCanvas = (id) => {
    return this.#canvases[id] ? this.#canvases[id] : this.#staticCanvases[id];
  }

}