export enum InputType {
    zip = "zip",
    coords = "coords",
    unknown = "unknown"
}


export type ZIPInput = {
    type: InputType.zip,
    value: number
}


export type CoordsInput = {
    type: InputType.coords,
    value: { lat: number, lon: number}
}


type UnknownInput = {
    type: InputType.unknown,
    value: null
}


export type ParsedInput = ZIPInput | CoordsInput | UnknownInput;


export type Response = {
    zip_code?: number;
    lat?: number;
    lon?: number;
};
