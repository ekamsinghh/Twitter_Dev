import { helper } from "../services/helper.js";
export const execute= () => {
    const response = helper();
    if(response){
        return "Number comes out to be even";
    }
    else{
        return "Number comes out to be odd";
    }
}