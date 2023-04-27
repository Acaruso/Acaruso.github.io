/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/App.ts":
/*!********************!*\
  !*** ./src/App.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.App = void 0;\nconst Gfx_1 = __webpack_require__(/*! ./Gfx */ \"./src/Gfx.ts\");\nconst State_1 = __webpack_require__(/*! ./State */ \"./src/State.ts\");\nconst Ui_1 = __webpack_require__(/*! ./Ui */ \"./src/Ui.ts\");\nconst constants_1 = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\nclass App {\n    constructor() {\n        this.canvas = document.getElementById(\"myCanvas\");\n        this.canvas.width = constants_1.constants.canvasWidth;\n        this.canvas.height = constants_1.constants.canvasHeight;\n        this.gfx = new Gfx_1.Gfx();\n        this.state = new State_1.State();\n        this.ui = new Ui_1.Ui(this.gfx, this.state);\n        setInterval(() => this.tick(), 1000 / 30);\n    }\n    tick() {\n        this.ui.tick();\n    }\n}\nexports.App = App;\n\n\n//# sourceURL=webpack://guitar-buddy/./src/App.ts?");

/***/ }),

/***/ "./src/Gfx.ts":
/*!********************!*\
  !*** ./src/Gfx.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Gfx = void 0;\nconst textConstants_1 = __webpack_require__(/*! ./textConstants */ \"./src/textConstants.ts\");\nconst constants_1 = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\nclass Gfx {\n    constructor() {\n        this.canvas = document.getElementById(\"myCanvas\");\n        this.ctx = this.canvas.getContext(\"2d\");\n        this.queue = [];\n    }\n    push(command, z) {\n        this.queue.push({ command, z });\n    }\n    drawRect(rect, z = 0) {\n        const command = (ctx) => {\n            const color = rect.color ? rect.color : constants_1.constants.black;\n            // 0.0 == transparent, 1.0 == solid\n            const alpha = rect.alpha ? rect.alpha : 1.0;\n            this.ctx.globalAlpha = alpha;\n            ctx.fillStyle = color;\n            ctx.beginPath();\n            ctx.rect(rect.x, rect.y, rect.w, rect.h);\n            ctx.fill();\n            ctx.closePath();\n            this.ctx.globalAlpha = 1.0;\n        };\n        this.push(command, z);\n    }\n    strokeRect(rect, z = 0) {\n        const color = rect.color ? rect.color : constants_1.constants.black;\n        const upperLeft = { x: rect.x, y: rect.y };\n        const upperRight = { x: rect.x + rect.w, y: rect.y };\n        const lowerRight = { x: rect.x + rect.w, y: rect.y + rect.h };\n        const lowerLeft = { x: rect.x, y: rect.y + rect.h };\n        this.drawLine(upperLeft, upperRight, z, color);\n        this.drawLine(upperRight, lowerRight, z, color);\n        this.drawLine(lowerRight, lowerLeft, z, color);\n        this.drawLine(lowerLeft, upperLeft, z, color);\n    }\n    strokeRectHeavy(rect, z = 0) {\n        const color = rect.color ? rect.color : constants_1.constants.black;\n        this.drawLineHeavy({ x: rect.x, y: rect.y }, { x: rect.x + rect.w + 1, y: rect.y }, z, color);\n        this.drawLineHeavy({ x: rect.x + rect.w, y: rect.y }, { x: rect.x + rect.w, y: rect.y + rect.h + 1 }, z, color);\n        this.drawLineHeavy({ x: rect.x + rect.w, y: rect.y + rect.h }, { x: rect.x - 1, y: rect.y + rect.h }, z, color);\n        this.drawLineHeavy({ x: rect.x, y: rect.y + rect.h }, { x: rect.x, y: rect.y - 1 }, z, color);\n    }\n    drawLine(beginCoord, endCoord, z = 0, color = constants_1.constants.black) {\n        const command = (ctx) => {\n            ctx.strokeStyle = color;\n            ctx.lineWidth = 1;\n            ctx.beginPath();\n            ctx.moveTo(beginCoord.x, beginCoord.y);\n            ctx.lineTo(endCoord.x, endCoord.y);\n            ctx.stroke();\n        };\n        this.push(command, z);\n    }\n    drawLineHeavy(beginCoord, endCoord, z = 0, color = constants_1.constants.black) {\n        const command = (ctx) => {\n            ctx.strokeStyle = color;\n            ctx.lineWidth = 2;\n            ctx.beginPath();\n            ctx.moveTo(beginCoord.x, beginCoord.y);\n            ctx.lineTo(endCoord.x, endCoord.y);\n            ctx.stroke();\n        };\n        this.push(command, z);\n    }\n    drawFilledCircle(coord, radius, z = 0, color = constants_1.constants.black) {\n        const command = (ctx) => {\n            ctx.strokeStyle = color;\n            ctx.fillStyle = color;\n            ctx.lineWidth = 1;\n            ctx.beginPath();\n            ctx.arc(coord.x, coord.y, radius, 0, 2 * Math.PI);\n            ctx.fill();\n        };\n        this.push(command, z);\n    }\n    drawOutlinedCircle(coord, radius, z = 0, color = constants_1.constants.black) {\n        const command = (ctx) => {\n            ctx.strokeStyle = color;\n            ctx.lineWidth = 4;\n            ctx.beginPath();\n            ctx.arc(coord.x, coord.y, radius, 0, 2 * Math.PI);\n            ctx.stroke();\n        };\n        this.push(command, z);\n    }\n    drawText(text, size, coord, color = constants_1.constants.black, z = 0) {\n        const command = (ctx) => {\n            ctx.font = `${size}px ${textConstants_1.textConstants.textStyle}`;\n            ctx.fillStyle = color;\n            // coord for fillText(text, coord) is *bottom* left side of text\n            // however, our coord is for *top* left side of text\n            // thus, we need to do coord.y + textConstants.charHeight\n            ctx.fillText(text, coord.x, coord.y + textConstants_1.textConstants.charHeight);\n        };\n        this.push(command, z);\n    }\n    draw() {\n        this.sortQueue(this.queue);\n        while (this.queue.length > 0) {\n            const elt = this.queue[this.queue.length - 1];\n            elt.command(this.ctx);\n            this.queue.pop();\n        }\n    }\n    sortQueue(queue) {\n        queue.sort((first, second) => {\n            return second.z - first.z;\n        });\n    }\n    clearScreen() {\n        this.drawRect({\n            x: 0,\n            y: 0,\n            w: this.canvas.width,\n            h: this.canvas.height,\n            color: constants_1.constants.white\n        }, -100);\n    }\n}\nexports.Gfx = Gfx;\n\n\n//# sourceURL=webpack://guitar-buddy/./src/Gfx.ts?");

/***/ }),

/***/ "./src/Rect.ts":
/*!*********************!*\
  !*** ./src/Rect.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Rect = void 0;\nclass Rect {\n    constructor() {\n        this.x = 0;\n        this.y = 0;\n        this.w = 0;\n        this.h = 0;\n    }\n}\nexports.Rect = Rect;\n\n\n//# sourceURL=webpack://guitar-buddy/./src/Rect.ts?");

/***/ }),

/***/ "./src/State.ts":
/*!**********************!*\
  !*** ./src/State.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.State = void 0;\nclass State {\n    constructor() {\n        this.mouse = {\n            clicked: false,\n            coord: { x: 0, y: 0 },\n        };\n        this.keyboard = {\n            arrowup: false,\n            arrowdown: false,\n            arrowright: false,\n            arrowleft: false,\n            control: false,\n            shift: false,\n            alt: false,\n            tab: false,\n            backspace: false,\n            space: false,\n            enter: false,\n            escape: false,\n            a: false,\n            b: false,\n            c: false,\n            d: false,\n            e: false,\n            f: false,\n            g: false,\n            h: false,\n            i: false,\n            j: false,\n            k: false,\n            l: false,\n            m: false,\n            n: false,\n            o: false,\n            p: false,\n            q: false,\n            r: false,\n            s: false,\n            t: false,\n            u: false,\n            v: false,\n            w: false,\n            x: false,\n            y: false,\n            z: false,\n        };\n    }\n}\nexports.State = State;\n\n\n//# sourceURL=webpack://guitar-buddy/./src/State.ts?");

/***/ }),

/***/ "./src/Ui.ts":
/*!*******************!*\
  !*** ./src/Ui.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Ui = void 0;\nconst BaseElt_1 = __webpack_require__(/*! ./ui_elts/BaseElt */ \"./src/ui_elts/BaseElt.ts\");\nconst FretboardElt_1 = __webpack_require__(/*! ./ui_elts/FretboardElt */ \"./src/ui_elts/FretboardElt.ts\");\nconst constants_1 = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\nconst util_1 = __webpack_require__(/*! ./util */ \"./src/util.ts\");\nclass Ui {\n    constructor(gfx, state) {\n        this.mouseX = 0;\n        this.mouseY = 0;\n        this.gfx = gfx;\n        this.state = state;\n        (0, util_1.addHandler)(\"mousedown\", (e) => this.onLeftMBDown(e));\n        (0, util_1.addHandler)(\"mouseup\", (e) => this.onLeftMBUp(e));\n        (0, util_1.addHandler)(\"mousemove\", (e) => {\n            this.mouseX = e.offsetX;\n            this.mouseY = e.offsetY;\n        });\n        (0, util_1.addHandler)(\"keydown\", (e) => {\n            let key = e.key.toLowerCase();\n            if (key === \"arrowdown\"\n                || key === \"arrowup\"\n                || key === \"arrowleft\"\n                || key === \"arrowright\") {\n                e.preventDefault();\n            }\n            if (key === \" \") {\n                key = \"space\";\n            }\n            this.state.keyboard[key] = true;\n            this.onKeyDown(key);\n        });\n        (0, util_1.addHandler)(\"keyup\", (e) => {\n            let key = e.key.toLowerCase();\n            if (key === \" \") {\n                key = \"space\";\n            }\n            this.state.keyboard[key] = false;\n        });\n        this.rootElt = new BaseElt_1.BaseElt(this.gfx, { x: 0, y: 0, w: constants_1.constants.canvasWidth, h: constants_1.constants.canvasHeight });\n        this.rootElt.pushChild(new FretboardElt_1.FretboardElt(this.gfx, { x: 20, y: 30, w: 20, h: 20 }, this.state, 6, 24));\n    }\n    onLeftMBDown(event) {\n        let q = [this.rootElt];\n        let cur = null;\n        let toLeftClick = [];\n        while (q.length !== 0) {\n            cur = q[0];\n            q.shift();\n            if (!(0, util_1.isInsideRect)(this.mouseX, this.mouseY, cur.rect)) {\n                continue;\n            }\n            toLeftClick.push(cur);\n            for (const child of cur.children) {\n                q.push(child);\n            }\n        }\n        for (const elt of toLeftClick) {\n            elt.onLeftMBDown(this.mouseX, this.mouseY);\n        }\n    }\n    onLeftMBUp(event) { }\n    onKeyDown(key) {\n        this.rootElt.onKeyDown(key);\n    }\n    tick() {\n        this.gfx.clearScreen();\n        // recursively draw all children, grandchildren, etc.\n        this.rootElt.onDraw();\n        this.gfx.draw();\n    }\n}\nexports.Ui = Ui;\n\n\n//# sourceURL=webpack://guitar-buddy/./src/Ui.ts?");

/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.constants = void 0;\nconst constants = {\n    canvasWidth: 2000,\n    canvasHeight: 1000,\n    white: \"#FFFFFF\",\n    black: \"#000000\",\n    darkBlue: \"#BDCDFF\",\n    // red: \"#FF0000\",\n    red: \"#d72521\",\n    // green: \"#008000\",\n    green: \"#429d00\",\n    // blue: \"#0000FF\",\n    blue: \"#2180ed\",\n};\nexports.constants = constants;\n\n\n//# sourceURL=webpack://guitar-buddy/./src/constants.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst App_1 = __webpack_require__(/*! ./App */ \"./src/App.ts\");\ndocument.body.onload = () => {\n    const app = new App_1.App();\n};\n\n\n//# sourceURL=webpack://guitar-buddy/./src/index.ts?");

/***/ }),

/***/ "./src/textConstants.ts":
/*!******************************!*\
  !*** ./src/textConstants.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.textConstants = void 0;\nconst charHeight = 14;\nconst textConstants = {\n    textStyle: \"Consolas\",\n    charHeight: charHeight,\n    charHeightNoPadding: charHeight - 5,\n    charWidth: charHeight * 0.55,\n    xPadding: 4,\n    yPadding: 6,\n};\nexports.textConstants = textConstants;\n\n\n//# sourceURL=webpack://guitar-buddy/./src/textConstants.ts?");

/***/ }),

/***/ "./src/ui_elts/BaseElt.ts":
/*!********************************!*\
  !*** ./src/ui_elts/BaseElt.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.BaseElt = void 0;\nconst Rect_1 = __webpack_require__(/*! ../Rect */ \"./src/Rect.ts\");\nclass BaseElt {\n    constructor(gfx, rect) {\n        this.rect = new Rect_1.Rect();\n        this.children = [];\n        this.parent = null;\n        this.gfx = gfx;\n        this.rect = rect;\n    }\n    onDraw() {\n        for (const child of this.children) {\n            child.onDraw();\n        }\n    }\n    onLeftMBDown(x, y) { }\n    onKeyDown(key) {\n        for (const child of this.children) {\n            child.onKeyDown(key);\n        }\n    }\n    pushChild(child) {\n        this.children.push(child);\n    }\n}\nexports.BaseElt = BaseElt;\n\n\n//# sourceURL=webpack://guitar-buddy/./src/ui_elts/BaseElt.ts?");

/***/ }),

/***/ "./src/ui_elts/CellElt.ts":
/*!********************************!*\
  !*** ./src/ui_elts/CellElt.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.CellElt = void 0;\nconst BaseElt_1 = __webpack_require__(/*! ./BaseElt */ \"./src/ui_elts/BaseElt.ts\");\nconst TextElt_1 = __webpack_require__(/*! ./TextElt */ \"./src/ui_elts/TextElt.ts\");\nconst constants_1 = __webpack_require__(/*! ../constants */ \"./src/constants.ts\");\nclass CellElt extends BaseElt_1.BaseElt {\n    constructor(gfx, rect, state, fretboardModel, row, col, onClick = (x, y) => { }, outlineVisible = true) {\n        super(gfx, rect);\n        this.toggled = false;\n        this.passiveColor = constants_1.constants.white;\n        this.activeColor = constants_1.constants.darkBlue;\n        this.state = state;\n        this.fretboardModel = fretboardModel;\n        this.row = row;\n        this.col = col;\n        this.onClick = onClick;\n        this.outlineVisible = outlineVisible;\n        const noteString = this.fretboardModel.getCell(this.row, this.col).noteString;\n        const xOffset = (noteString.length === 1) ? 14 : 10;\n        const yOffset = 5;\n        this.textElt = new TextElt_1.TextElt(this.gfx, {\n            x: this.rect.x + xOffset,\n            y: this.rect.y + yOffset,\n            w: 1,\n            h: 1\n        }, noteString, constants_1.constants.white, 3);\n    }\n    onDraw() {\n        if (this.fretboardModel.isToggled(this.row, this.col)) {\n            this.gfx.drawFilledCircle({\n                x: this.rect.x + (this.rect.w / 2),\n                y: this.rect.y + (this.rect.h / 2)\n            }, (this.rect.h / 2) - 2, 0, this.fretboardModel.getColor(this.row, this.col));\n            this.textElt.onDraw();\n        }\n        if (this.fretboardModel.isSelected(this.row, this.col)) {\n            this.gfx.drawOutlinedCircle({\n                x: this.rect.x + (this.rect.w / 2),\n                y: this.rect.y + (this.rect.h / 2)\n            }, (this.rect.h / 2) - 2, 1, constants_1.constants.darkBlue);\n        }\n        if (this.outlineVisible) {\n            this.gfx.strokeRectHeavy(this.rect);\n        }\n    }\n    onLeftMBDown(x, y) {\n        if (!this.state.keyboard.shift) {\n            this.fretboardModel.setToggle(this.row, this.col);\n        }\n        this.fretboardModel.setSelected(this.row, this.col);\n    }\n}\nexports.CellElt = CellElt;\n\n\n//# sourceURL=webpack://guitar-buddy/./src/ui_elts/CellElt.ts?");

/***/ }),

/***/ "./src/ui_elts/DoubleDotElt.ts":
/*!*************************************!*\
  !*** ./src/ui_elts/DoubleDotElt.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.DoubleDotElt = void 0;\nconst BaseElt_1 = __webpack_require__(/*! ./BaseElt */ \"./src/ui_elts/BaseElt.ts\");\nclass DoubleDotElt extends BaseElt_1.BaseElt {\n    constructor(gfx, rect) {\n        super(gfx, rect);\n        this.radius = 4;\n        const third = Math.floor(this.rect.w / 3);\n        this.coord1 = {\n            x: this.rect.x + third,\n            y: this.rect.y + Math.floor(this.rect.h / 2)\n        };\n        this.coord2 = {\n            x: this.rect.x + (2 * third),\n            y: this.rect.y + Math.floor(this.rect.h / 2)\n        };\n    }\n    onDraw() {\n        this.gfx.drawFilledCircle(this.coord1, this.radius);\n        this.gfx.drawFilledCircle(this.coord2, this.radius);\n    }\n}\nexports.DoubleDotElt = DoubleDotElt;\n\n\n//# sourceURL=webpack://guitar-buddy/./src/ui_elts/DoubleDotElt.ts?");

/***/ }),

/***/ "./src/ui_elts/FretboardElt.ts":
/*!*************************************!*\
  !*** ./src/ui_elts/FretboardElt.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.FretboardModel = exports.FretboardElt = void 0;\nconst FretboardModel_1 = __webpack_require__(/*! ./FretboardModel */ \"./src/ui_elts/FretboardModel.ts\");\nObject.defineProperty(exports, \"FretboardModel\", ({ enumerable: true, get: function () { return FretboardModel_1.FretboardModel; } }));\nconst BaseElt_1 = __webpack_require__(/*! ./BaseElt */ \"./src/ui_elts/BaseElt.ts\");\nconst CellElt_1 = __webpack_require__(/*! ./CellElt */ \"./src/ui_elts/CellElt.ts\");\nconst LineElt_1 = __webpack_require__(/*! ./LineElt */ \"./src/ui_elts/LineElt.ts\");\nconst SingleDotElt_1 = __webpack_require__(/*! ./SingleDotElt */ \"./src/ui_elts/SingleDotElt.ts\");\nconst DoubleDotElt_1 = __webpack_require__(/*! ./DoubleDotElt */ \"./src/ui_elts/DoubleDotElt.ts\");\nconst constants_1 = __webpack_require__(/*! ../constants */ \"./src/constants.ts\");\nclass FretboardElt extends BaseElt_1.BaseElt {\n    constructor(gfx, rect, state, numRows, numCols) {\n        super(gfx, rect);\n        this.topPadding = 20;\n        this.cellW = 36;\n        this.cellH = 30;\n        this.rect = {\n            x: rect.x,\n            y: rect.y,\n            w: this.cellW * numCols,\n            h: this.cellH * numRows + this.topPadding,\n        };\n        this.fretboardX = this.rect.x;\n        this.fretboardY = this.rect.y + this.topPadding;\n        this.state = state;\n        this.numRows = numRows;\n        this.numCols = numCols;\n        this.cells = [];\n        this.fretboardModel = new FretboardModel_1.FretboardModel(this.numRows, this.numCols);\n        // create cells\n        for (let row = 0; row < numRows; row++) {\n            this.cells.push([]);\n            for (let col = 0; col < numCols; col++) {\n                const newCell = new CellElt_1.CellElt(this.gfx, {\n                    x: this.fretboardX + (this.cellW * col),\n                    y: this.fretboardY + (this.cellH * row),\n                    w: this.cellW,\n                    h: this.cellH,\n                    color: constants_1.constants.darkBlue,\n                }, this.state, this.fretboardModel, row, col, () => { }, false);\n                this.children.push(newCell);\n                this.cells[row].push(newCell);\n            }\n        }\n        // create strings\n        for (let i = 0; i < numRows; i++) {\n            this.children.push(new LineElt_1.LineElt(this.gfx, {\n                x: this.fretboardX,\n                y: this.fretboardY + (this.cellH * i) + (0.5 * this.cellH)\n            }, {\n                x: this.fretboardX + (this.cellW * this.numCols),\n                y: this.fretboardY + (this.cellH * i) + (0.5 * this.cellH)\n            }));\n        }\n        // create frets\n        for (let i = 0; i < numCols + 1; i++) {\n            this.children.push(new LineElt_1.LineElt(this.gfx, {\n                x: this.fretboardX + (this.cellW * i),\n                y: this.fretboardY + (0.5 * this.cellH)\n            }, {\n                x: this.fretboardX + (this.cellW * i),\n                y: this.fretboardY + (this.cellH * this.numRows) - (0.5 * this.cellH)\n            }));\n        }\n        // create fretboard dots\n        const singleDotPositions = [2, 4, 6, 8, 14, 16, 18, 20];\n        const doubleDotPosition = 11;\n        const dotRectW = this.cellW;\n        const dotRectH = this.fretboardY - this.rect.y;\n        for (let col = 0; col < numCols; col++) {\n            if (singleDotPositions.includes(col)) {\n                this.children.push(new SingleDotElt_1.SingleDotElt(this.gfx, {\n                    x: this.rect.x + (dotRectW * col),\n                    y: this.rect.y,\n                    w: dotRectW,\n                    h: dotRectH\n                }));\n            }\n            if (col === doubleDotPosition) {\n                this.children.push(new DoubleDotElt_1.DoubleDotElt(this.gfx, {\n                    x: this.rect.x + (dotRectW * col),\n                    y: this.rect.y,\n                    w: dotRectW,\n                    h: dotRectH\n                }));\n            }\n        }\n    }\n    onKeyDown(key) {\n        if (key === \"space\") {\n            if (this.fretboardModel.selected) {\n                this.fretboardModel.setToggle(this.fretboardModel.selectedRow, this.fretboardModel.selectedCol);\n            }\n        }\n        if (key === \"escape\") {\n            this.fretboardModel.unselect();\n        }\n        if (key === \"q\" && this.state.keyboard.control) {\n            this.fretboardModel.untoggleAll();\n        }\n        // local and global mode ////////////////////////////////////\n        if (key === \"l\") {\n            console.log(\"set mode local\");\n            this.fretboardModel.setMode(FretboardModel_1.Mode.Local);\n        }\n        if (key === \"g\") {\n            this.fretboardModel.setMode(FretboardModel_1.Mode.Global);\n        }\n        // colors ///////////////////////////////////////////////////\n        if (key === \"1\") {\n            this.fretboardModel.setColor(constants_1.constants.red, this.fretboardModel.selectedRow, this.fretboardModel.selectedCol);\n        }\n        if (key === \"2\") {\n            this.fretboardModel.setColor(constants_1.constants.green, this.fretboardModel.selectedRow, this.fretboardModel.selectedCol);\n        }\n        if (key === \"3\") {\n            this.fretboardModel.setColor(constants_1.constants.blue, this.fretboardModel.selectedRow, this.fretboardModel.selectedCol);\n        }\n        if (key === \"0\") {\n            this.fretboardModel.setColor(constants_1.constants.black, this.fretboardModel.selectedRow, this.fretboardModel.selectedCol);\n        }\n        /////////////////////////////////////////////////////////////\n        if (isArrowKey(key)) {\n            const dir = arrowKeyToDir(key);\n            if (this.state.keyboard.shift) {\n                this.fretboardModel.moveToggle(dir, this.fretboardModel.selectedRow, this.fretboardModel.selectedCol);\n            }\n            else if (this.state.keyboard.control) {\n                if (dir === FretboardModel_1.Dir.Right || dir === FretboardModel_1.Dir.Left) {\n                    this.fretboardModel.moveToggleByOctave(dir, this.fretboardModel.selectedRow, this.fretboardModel.selectedCol);\n                }\n                else if (dir === FretboardModel_1.Dir.Up || dir === FretboardModel_1.Dir.Down) {\n                    this.fretboardModel.moveToggleByString(dir, this.fretboardModel.selectedRow, this.fretboardModel.selectedCol);\n                }\n            }\n            else {\n                this.fretboardModel.moveSelected(dir);\n            }\n        }\n    }\n}\nexports.FretboardElt = FretboardElt;\nfunction isArrowKey(key) {\n    return (key === \"arrowup\"\n        || key === \"arrowdown\"\n        || key === \"arrowleft\"\n        || key === \"arrowright\");\n}\nfunction arrowKeyToDir(key) {\n    switch (key) {\n        case \"arrowup\":\n            return FretboardModel_1.Dir.Up;\n        case \"arrowdown\":\n            return FretboardModel_1.Dir.Down;\n        case \"arrowleft\":\n            return FretboardModel_1.Dir.Left;\n        case \"arrowright\":\n            return FretboardModel_1.Dir.Right;\n        default:\n            return FretboardModel_1.Dir.Up;\n    }\n}\n\n\n//# sourceURL=webpack://guitar-buddy/./src/ui_elts/FretboardElt.ts?");

/***/ }),

/***/ "./src/ui_elts/FretboardModel.ts":
/*!***************************************!*\
  !*** ./src/ui_elts/FretboardModel.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Mode = exports.Dir = exports.FretboardModel = exports.Cell = void 0;\nconst util_1 = __webpack_require__(/*! ../util */ \"./src/util.ts\");\nconst constants_1 = __webpack_require__(/*! ../constants */ \"./src/constants.ts\");\nvar Dir;\n(function (Dir) {\n    Dir[Dir[\"Up\"] = 1] = \"Up\";\n    Dir[Dir[\"Down\"] = 2] = \"Down\";\n    Dir[Dir[\"Left\"] = 3] = \"Left\";\n    Dir[Dir[\"Right\"] = 4] = \"Right\";\n})(Dir || (Dir = {}));\nexports.Dir = Dir;\nvar Mode;\n(function (Mode) {\n    Mode[Mode[\"Local\"] = 1] = \"Local\";\n    Mode[Mode[\"Global\"] = 2] = \"Global\";\n})(Mode || (Mode = {}));\nexports.Mode = Mode;\nclass Cell {\n    constructor(note, noteString) {\n        this.toggled = false;\n        this.color = constants_1.constants.black;\n        this.note = note;\n        this.noteString = noteString;\n    }\n}\nexports.Cell = Cell;\nclass FretboardModel {\n    constructor(numRows, numCols) {\n        this.selected = false;\n        this.selectedRow = 0;\n        this.selectedCol = 0;\n        this.mode = Mode.Local;\n        // low E is note 0\n        this.notes = [\n            \"E0\",\n            \"F0\",\n            \"F#0\",\n            \"G0\",\n            \"G#0\",\n            \"A0\",\n            \"A#0\",\n            \"B0\",\n            \"C0\",\n            \"C#0\",\n            \"D0\",\n            \"D#0\",\n            \"E1\",\n            \"F1\",\n            \"F#1\",\n            \"G1\",\n            \"G#1\",\n            \"A1\",\n            \"A#1\",\n            \"B1\",\n            \"C1\",\n            \"C#1\",\n            \"D1\",\n            \"D#1\",\n            \"E2\",\n            \"F2\",\n            \"F#2\",\n            \"G2\",\n            \"G#2\",\n            \"A2\",\n            \"A#2\",\n            \"B2\",\n            \"C2\",\n            \"C#2\",\n            \"D2\",\n            \"D#2\",\n            \"E3\",\n            \"F3\",\n            \"F#3\",\n            \"G3\",\n            \"G#3\",\n            \"A3\",\n            \"A#3\",\n            \"B3\",\n            \"C3\",\n            \"C#3\",\n            \"D3\",\n            \"D#3\",\n            \"E4\",\n            \"F4\",\n            \"F#4\",\n            \"G4\",\n            \"G#4\",\n            \"A4\",\n            \"A#4\",\n            \"B4\",\n            \"C4\",\n            \"C#4\",\n            \"D4\",\n            \"D#4\", // 59\n        ];\n        // \"strang\" === guitar string\n        // not to be confused with \"string\" which is a data type\n        this.strangs = [\n            24,\n            19,\n            15,\n            10,\n            5,\n            0 // low E\n        ];\n        this.numRows = numRows;\n        this.numCols = numCols;\n        this.cells = [];\n        for (let row = 0; row < numRows; row++) {\n            this.cells.push([]);\n            for (let col = 0; col < numCols; col++) {\n                const note = this.strangs[row] + col + 1;\n                this.cells[row].push(new Cell(note, this.noteToString(note)));\n            }\n        }\n    }\n    setMode(newMode) {\n        this.mode = newMode;\n    }\n    getCell(row, col) {\n        return this.cells[row][col];\n    }\n    noteToStringFull(note) {\n        if (!(0, util_1.inRange)(note, 0, this.notes.length)) {\n            console.log(`ERROR: noteToStringFull(${note}) note out of range`);\n        }\n        return this.notes[note];\n    }\n    noteToString(note) {\n        return this.noteToStringFull(note).replace(/[0-9]/g, \"\");\n    }\n    strangFretToNote(strang, fret) {\n        return this.strangs[strang] + (fret + 1);\n    }\n    setToggle(row, col) {\n        if (this.mode === Mode.Local) {\n            this.setToggleLocal(row, col);\n            if (!this.isToggled(row, col)) {\n                this.setColorLocal(constants_1.constants.black, row, col);\n            }\n        }\n        else if (this.mode === Mode.Global) {\n            this.setToggleGlobal(row, col);\n            if (!this.isToggled(row, col)) {\n                this.setColorGlobal(constants_1.constants.black, row, col);\n            }\n        }\n    }\n    setToggleLocal(row, col) {\n        this.cells[row][col].toggled = !this.cells[row][col].toggled;\n    }\n    setToggleGlobal(row, col) {\n        const base = this.cells[row][col].note % 12;\n        for (const row of this.cells) {\n            for (let cell of row) {\n                if (cell.note % 12 === base) {\n                    cell.toggled = !cell.toggled;\n                }\n            }\n        }\n    }\n    setColor(color, row, col) {\n        if (this.mode === Mode.Local) {\n            this.setColorLocal(color, row, col);\n        }\n        else if (this.mode === Mode.Global) {\n            this.setColorGlobal(color, row, col);\n        }\n    }\n    setColorLocal(color, row, col) {\n        this.cells[row][col].color = color;\n    }\n    setColorGlobal(color, row, col) {\n        const base = this.cells[row][col].note % 12;\n        for (const row of this.cells) {\n            for (let cell of row) {\n                if (cell.note % 12 === base) {\n                    cell.color = color;\n                }\n            }\n        }\n    }\n    getColor(row, col) {\n        return this.cells[row][col].color;\n    }\n    isToggled(row, col) {\n        return this.cells[row][col].toggled;\n    }\n    untoggleAll() {\n        for (const row of this.cells) {\n            for (const cell of row) {\n                cell.toggled = false;\n            }\n        }\n    }\n    setSelected(row, col) {\n        this.selected = true;\n        this.selectedRow = row;\n        this.selectedCol = col;\n    }\n    isSelected(row, col) {\n        return (this.selected\n            && this.selectedRow === row\n            && this.selectedCol === col);\n    }\n    unselect() {\n        this.selected = false;\n    }\n    moveSelected(dir) {\n        const { newRow, newCol } = move(dir, this.selectedRow, this.selectedCol, this.numRows, this.numCols);\n        this.setSelected(newRow, newCol);\n    }\n    moveToggle(dir, row, col) {\n        if (!this.isToggled(this.selectedRow, this.selectedCol)) {\n            return;\n        }\n        const { newRow, newCol } = move(dir, row, col, this.numRows, this.numCols);\n        if (this.getCell(newRow, newCol).toggled) {\n            return;\n        }\n        this.setToggle(row, col);\n        this.setToggle(newRow, newCol);\n        this.setSelected(newRow, newCol);\n    }\n    moveToggleByOctave(dir, row, col) {\n        if (!this.isToggled(this.selectedRow, this.selectedCol)\n            || (dir !== Dir.Left && dir !== Dir.Right)) {\n            return;\n        }\n        const { newRow, newCol } = move(dir, row, col, this.numRows, this.numCols, 12);\n        if (this.getCell(newRow, newCol).toggled) {\n            return;\n        }\n        this.setToggle(row, col);\n        this.setToggle(newRow, newCol);\n        this.setSelected(newRow, newCol);\n    }\n    moveToggleByString(dir, row, col) {\n        if (!this.isToggled(this.selectedRow, this.selectedCol)\n            || (dir !== Dir.Up && dir !== Dir.Down)) {\n            return;\n        }\n        const { newRow, newCol } = move(dir, row, col, this.numRows, this.numCols);\n        if (newRow === row && newCol === col) {\n            return;\n        }\n        let curNote = this.getCell(row, col).note;\n        const notePositions = this.findNotePositions(curNote, newRow);\n        const newNewCol = notePositions[0];\n        this.setToggle(row, col);\n        this.setToggle(newRow, newNewCol);\n        this.setSelected(newRow, newNewCol);\n    }\n    findNotePositions(note, strang) {\n        const base = note % 12;\n        let strangNote = this.strangs[strang];\n        let res = [];\n        for (let i = 0; i < this.numCols; i++, strangNote++) {\n            if (strangNote % 12 === base) {\n                if ((i - 1) >= 0) {\n                    res.push(i - 1);\n                }\n            }\n        }\n        return res;\n    }\n}\nexports.FretboardModel = FretboardModel;\nfunction move(dir, row, col, numRows, numCols, inc = 1) {\n    let newRow = row;\n    let newCol = col;\n    switch (dir) {\n        case Dir.Up:\n            newRow -= inc;\n            break;\n        case Dir.Down:\n            newRow += inc;\n            break;\n        case Dir.Left:\n            newCol -= inc;\n            break;\n        case Dir.Right:\n            newCol += inc;\n            break;\n    }\n    if (!(0, util_1.inRange)(newRow, 0, numRows) || !(0, util_1.inRange)(newCol, 0, numCols)) {\n        return { newRow: row, newCol: col };\n    }\n    return { newRow, newCol };\n}\n\n\n//# sourceURL=webpack://guitar-buddy/./src/ui_elts/FretboardModel.ts?");

/***/ }),

/***/ "./src/ui_elts/LineElt.ts":
/*!********************************!*\
  !*** ./src/ui_elts/LineElt.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.LineElt = void 0;\nconst BaseElt_1 = __webpack_require__(/*! ./BaseElt */ \"./src/ui_elts/BaseElt.ts\");\nclass LineElt extends BaseElt_1.BaseElt {\n    constructor(gfx, beginCoord, endCoord) {\n        super(gfx, { x: 0, y: 0, w: 0, h: 0 });\n        this.beginCoord = beginCoord;\n        this.endCoord = endCoord;\n    }\n    onDraw() {\n        this.gfx.drawLineHeavy(this.beginCoord, this.endCoord);\n    }\n}\nexports.LineElt = LineElt;\n\n\n//# sourceURL=webpack://guitar-buddy/./src/ui_elts/LineElt.ts?");

/***/ }),

/***/ "./src/ui_elts/SingleDotElt.ts":
/*!*************************************!*\
  !*** ./src/ui_elts/SingleDotElt.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SingleDotElt = void 0;\nconst BaseElt_1 = __webpack_require__(/*! ./BaseElt */ \"./src/ui_elts/BaseElt.ts\");\nclass SingleDotElt extends BaseElt_1.BaseElt {\n    constructor(gfx, rect) {\n        super(gfx, rect);\n        this.radius = 4;\n        this.coord = {\n            x: this.rect.x + Math.floor(this.rect.w / 2),\n            y: this.rect.y + Math.floor(this.rect.h / 2)\n        };\n    }\n    onDraw() {\n        this.gfx.drawFilledCircle(this.coord, this.radius);\n    }\n}\nexports.SingleDotElt = SingleDotElt;\n\n\n//# sourceURL=webpack://guitar-buddy/./src/ui_elts/SingleDotElt.ts?");

/***/ }),

/***/ "./src/ui_elts/TextElt.ts":
/*!********************************!*\
  !*** ./src/ui_elts/TextElt.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.TextElt = void 0;\nconst BaseElt_1 = __webpack_require__(/*! ./BaseElt */ \"./src/ui_elts/BaseElt.ts\");\nconst constants_1 = __webpack_require__(/*! ../constants */ \"./src/constants.ts\");\nconst textConstants_1 = __webpack_require__(/*! ../textConstants */ \"./src/textConstants.ts\");\nclass TextElt extends BaseElt_1.BaseElt {\n    constructor(gfx, rect, text, color = constants_1.constants.black, z = 0) {\n        super(gfx, rect);\n        this.text = text;\n        this.color = color;\n        this.z = z;\n    }\n    onDraw() {\n        this.gfx.drawText(this.text, textConstants_1.textConstants.charHeight, {\n            x: this.rect.x,\n            y: this.rect.y\n        }, this.color, this.z);\n    }\n}\nexports.TextElt = TextElt;\n\n\n//# sourceURL=webpack://guitar-buddy/./src/ui_elts/TextElt.ts?");

/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.inRange = exports.clamp = exports.addHandler = exports.isInsideRect = void 0;\nfunction isInsideRect(x, y, rect) {\n    return (x >= rect.x\n        && x < (rect.x + rect.w)\n        && y >= rect.y\n        && y < (rect.y + rect.h));\n}\nexports.isInsideRect = isInsideRect;\nfunction addHandler(type, callback, options = {}) {\n    document.addEventListener(type, callback, options);\n}\nexports.addHandler = addHandler;\n// clamp val between low inclusive and high exclusive\nfunction clamp(val, low, high) {\n    if (val < low) {\n        return low;\n    }\n    else if (val >= high) {\n        return high - 1;\n    }\n    else {\n        return val;\n    }\n}\nexports.clamp = clamp;\nfunction inRange(val, low, high) {\n    if (val < low) {\n        return false;\n    }\n    else if (val >= high) {\n        return false;\n    }\n    else {\n        return true;\n    }\n}\nexports.inRange = inRange;\n\n\n//# sourceURL=webpack://guitar-buddy/./src/util.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;