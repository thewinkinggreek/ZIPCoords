export enum InputType {
    zip = "zip",
    coords = "coords",
    unknown = "unknown"
}


type ZIPInput = {
    type: InputType.zip,
    value: number
}


type CoordsInput = {
    type: InputType.coords,
    value: { lat: number, lon: number}
}


type UnknownInput = {
    type: InputType.unknown,
    value: null
}


export type ParsedInput = ZIPInput | CoordsInput | UnknownInput;
