import {SourceLink} from "../../Data/Models/SourceLink";
import axios from "axios";
import rssParser from 'react-native-rss-parser';
import {RSS} from "../../Data/Models/RSS";
import {AppDataSource} from "../Database/DatabaseSetup";


//const domparser = new DOMParser()

export async function GetRSS() {
    try {
        return await FetchRSS()
    }
    catch (err) {
        console.log("GetRSS Failed" + err)
    }
}

async function FetchRSS() {
    let AllRSS : RSS[] = []
    //1-get links
    let rsslinks = await GetSources()
    if (rsslinks.length == 0) {
        AllRSS = []
    }
    //2-iterate over links and fetch rss
    for (let i = 0; i < rsslinks.length; i++)
    {
        let rsslink = rsslinks[i].url
        let response = await axios.get(rsslink)
        let rssData = await rssParser.parse(response.data)
        for (let i = 0; i < 5; i++)
        {
            //let thumbnailhtmlelement = "media:thumbnail"
            //let thumbnailurl = parsedFeed.querySelector(thumbnailhtmlelement)
            //let thumbnailstring = thumbnailurl.getAttribute('url')
            let feeditem = rssData.items[i]
            //let publishdatecheck = ParseArabicDateStrings(feeditem.published)
            let newfeed : RSS = {
                Title: feeditem.title,
                imageurl: feeditem.enclosures[0]?.url,
                published: feeditem.published,
                source: rssData.title,
                url: feeditem.links[0]?.url
            }
            AllRSS.push(newfeed)
        }
    }
    return AllRSS
}

export async function AddLink(url : string) {
    try {
        let newsource = new  SourceLink(url)
        await AppDataSource.manager.save(newsource)
        console.log("Adding Link Successful")
    }
    catch (err) {
        console.log("Adding Link FAILED: " + err)
    }
}

export async function GetSources() {
    try {
        return await AppDataSource.manager.find(SourceLink)
    }
    catch (err) {
        console.log("Get Links Failed: " + err)
    }
}

export async function DeleteLinks() {
    try {
        await AppDataSource.manager.clear(SourceLink)
        console.log("Deleted All Links")
    }
    catch (err) {
        console.log("Deleting All Links failed: " + err)
    }
}

export async function DeleteLinkFromDatabase(id : number) {
    try {
        await AppDataSource.manager.delete(SourceLink, id)
        console.log('Deleted saved source successfully')
    }
    catch (err) {
        console.log('Deleting saved source FAILED ' + err)
    }
}

export function SortRSS() {

}

function ParseArabicDateStrings(arabicdate : string) {
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F]/
    if (!arabicRegex.test(arabicdate)) {
        return null
    }
    const [, day, month, year, time, period] = arabicdate.match(/(\d+)\s+(\S+)\s+(\d+)\s+(\d+:\d+)\s+(\S+)/)
    const monthMappings: { [key: string]: string } = {
        "يناير": "January",
        "فبراير": "February",
        "مارس": "March",
        "أبريل": "April",
        "مايو": "May",
        "يونيو": "June",
        "يوليو": "July",
        "أغسطس": "August",
        "سبتمبر": "September",
        "أكتوبر": "October",
        "نوفمبر": "November",
        "ديسمبر": "December"
    }
    const englishMonth = monthMappings[month];
    return `${englishMonth} ${day}, ${year} ${time} ${period}`
}





/*TESTING SAVED LINKS
for (let i = 0; i < rsslinks.length; i++) {
    console.log("fetching news from rss source links: " + rsslinks[i].url)
}
 */
