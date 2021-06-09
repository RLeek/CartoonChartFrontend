const season= ["summer", "autumn", "winter", "spring"] as const;
type Season = typeof season[number];
const seasonValues = season as ReadonlyArray<string>;

const order = ["ascending", "descending"] as const;
type Order = typeof order[number];
const orderValues = order as ReadonlyArray<string>;

const sort = ["views", "rating", "title", "release"] as const;
type Sort = typeof sort[number];
const sortValues = sort as ReadonlyArray<string>;
    
type Format = "Television"|"Movies"

type Calender = {
    'Television': Animation[],
    'Movies': Animation[],
    'Included': Format[],
}

type Animation = {
    id: number;
    title: string;
    synopsis:string;
    format: string;
    status:string;
    release: Date;
    episodes: number;
    runtime: number;
    cover: string;
    trailer:string;
    reviews: number,
    average_rating: number,
    genres:string[],
    views:number,
    sequel?: Animation[];
    prequel?: Animation[];
    alternative?: Animation[];
    other?: Animation[];
}

export { seasonValues, orderValues, sortValues };
export type { Animation, Season, Order, Sort, Format, Calender };
