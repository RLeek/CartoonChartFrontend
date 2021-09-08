import { Season, Order, Sort} from "./types";


const seasonMap:Record<string, Season> = {
    "Summer": "summer",
    "Autumn": "autumn",
    "Winter": "winter",
    "Spring": "spring"
}

const OrderMap:Record<string, Order> = {
    "Ascending": "ascending",
    "Descending": "descending",
}

const SortMap:Record<string, Sort> = {
    "Title": "title",
    "Rating": "rating",
    "Release": "release",
    "Popularity": "views"
}

export async function getSeason(season:string, year:string, sort:string, order:string) {
    
    const response = await fetch("https://api.cartooncalender.com/animations?season="+ seasonMap[season] + "&year=" + year + "&sort=" + SortMap[sort] + "&order=" + OrderMap[order] + "&seasonType=year", {
        method: 'GET', 
    });

    return await response.json();
}

