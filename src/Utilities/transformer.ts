import { Calender, Format, Animation } from "./types"

function monthToSeason(month:number):string {
    if (month <= 1 || month === 11) {
        return "Winter"
    } 

    if (month >= 2 && month <= 4) {
        return "Spring"
    }

    if (month >= 5 && month <= 7) {
        return "Summer"
    }

    if (month >= 8 && month <= 10) {
        return "Autumn"
    }

    return "null"
}

function transformFormat(format:string):Format[] {
    if (format === "All") {
        return ["Television", "Movies"]
    } 

    if (format === "Television") {
        return ["Television"]
    }

    if (format === "Movies") {
        return ["Movies"]
    }

    return ["Television", "Movies"]
}


function transformAnimations(data:{data:Animation[]} , format:string) {
    let shows:Calender = {
        'Television':[],
        'Movies':[],
        'Included':transformFormat(format)
    }

    //Iterate through data
    data['data'].forEach((entry)=> {
        if (entry['format'] === "Television") {
            entry['release'] = new Date(entry['release']);
            shows['Television'].push(entry);
        } 
        if (entry['format'] === "Movie") {
            entry['release'] = new Date(entry['release']);
            shows['Movies'].push(entry)
        }
    })

    return shows;
}



export { monthToSeason, transformAnimations, transformFormat };