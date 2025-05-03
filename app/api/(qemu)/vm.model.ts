import type { QEMUImage } from "./image.model";
import type { ISOImage } from "./iso.model";

export class VM{
    private __name: string;
    private __iso: ISOImage;
    private __memory: string;
    private __image: QEMUImage;
    private __connectionString: string;
    constructor(name:string, iso:ISOImage, memory: number,image:QEMUImage){
        this.__name = name;
        this.__iso = iso;
        this.__memory = memory+"G";
        this.__image = image;
        this.__connectionString = "";
    }
    public set name(name:string){
        this.name = name;
    }
    public set connectionString(connectionString :string){
        this.__connectionString= connectionString;
    }
    public set iso(iso:ISOImage){
        this.__iso= iso;
    }
    public set memory(memory:number){
        this.__memory= memory+"G";
    }
    public set image(image:QEMUImage){
        this.__image= image;
    }
    public get name(){

        return this.__name;
    }
    public get iso(){

        return this.__iso;
    }
    public get memory(): string{
        return this.__memory;
    }
    public get image(){
        return this.__image;
    }
    public get connectionString(){
        return this.__connectionString;
    }
    public get properties(){
        return {
            name: this.__name,
            iso: this.__iso,
            memory: this.__memory,
            image: this.__image

        }
    }
}