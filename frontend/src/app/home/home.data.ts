import { HomeModel } from "./home.model";

export class HomeData {   
    heroImg: string = 'Screenshot%20from%202024-11-17%2010-52-31.png';
    galleryHeading: string = 'Things We Love';

    gallery:HomeModel[] = [
        {
            img: 'Screenshot%20from%202024-11-17%2010-59-37.png',
            name: 'DISTINGUISHED SERVICE IN THE FIELD OF FASHION',
            description: 'Honoring Leonard A. Lauder, a visionary &amp; transformative leader in the beauty industry, who joins a list of more than 150 winners',
            prompt: 'SHOP OUR AWARD WINNERS'
        },
        {
            img: 'Screenshot%20from%202024-11-17%2010-59-54.png',
            name: 'NEIMAN MARCUS EXCLUSIVE',
            description: 'Honoring Leonard A. Lauder, a visionary transformative leader in the beauty industry, who joins a list of more than 150 winners',
            prompt: 'SHOP HOLIDAY COCKTAIL PARTY'
        },
        {
            img: 'Screenshot%20from%202024-11-17%2011-00-17.png',
            name: 'REFINED SHINE',
            description: 'Bracelets, rings more jewelry in David Yurman’s iconic Cable design',
            prompt: 'SHOP DAVID YURMAN'
        },
        {
            img: 'Screenshot%20from%202024-11-17%2011-34-20.png',
            name: 'STAR OF THE SHOW',
            description: 'Dropping temps call for an all-black trench from Nili Lotan that keeps you warm all season ',
            prompt: 'SHOP OUTERWEAR'
        },
        {
            img: 'Screenshot%20from%202024-11-17%2011-33-58.png',
            name: 'GILDED ELEGANCE',
            description: 'Gold Valentino Garavani Bowow pumps with a bow detail for a pop of elegance ',
            prompt: 'SHOP VALENTINO GARAVANI'
        },    
        {
            img: 'Screenshot%20from%202024-11-17%2011-33-44.png',
            name: 'DAILY DRIVER',
            description: ' Your new go-to handbag from Saint Laurent is waiting for you ',
            prompt: 'SHOP SAINT LAURENT'
        }
            
    ]
    
}