//
//Resolves references to the asset.products data type.
import * as outlook from '../../../outlook/v/code/outlook.js';
//
//use popup to create a new message
export class svg extends outlook.baby {
    //
    //Get the namespace that defines all our svg elements
    NS = "http://www.w3.org/2000/svg";
    //
    //These are the specifications for the first circle
    c1 = { x: 150, y: 225, r: 75 };
    //
    //The speficications for the second circle
    c2 = { x: 450, y: 75, r: 75 };
    //
    //The line identifier:- to mark the highlighting line.
    line = document.createElementNS(this.NS, 'line');
    //
    //
    constructor(base) {
        super(base, "./html/svg.html");
    }
    //
    //In future, check if a file json containing iquestionare is selected
    async check() {
        //
        return true;
    }
    //
    //
    async get_result() {
        //
        return this.result;
    }
    //
    async show_panels() {
        //
        //Draw the svg circles.
        //
        //add the click event listener to the svg.
        const svg = this.get_element("svg_object");
        //
        svg.onclick = (evt) => this.move(evt);
    }
    //1. Move circle one to the where the current event was invoked from.
    move(evt) {
        //
        function read() {
            //
            //
        }
    }
}
