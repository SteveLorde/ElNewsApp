import {AppDataSource} from "../../App";
import {SourceLink} from "../../Data/Models/SourceLink";
import axios from "axios";
import rssParser from 'react-native-rss-parser';
import {RSS} from "../../Data/Models/RSS";



let AllRSS : RSS[] = []

export async function GetRSS() {
    //1-get links
    let rsslinks = await GetSources()
    for (let i = 0; i < rsslinks.length; i++) {
        console.log("rss source links: " + rsslinks[i].url)
    }
    //2-iterate over links and fetch rss
    for (let i = 0; i < rsslinks.length; i++)
    {
        let rsslink = rsslinks[i].url
        let response = await axios.get(rsslink)
        let rssData = await rssParser.parse(response.data)

        for (let i = 0; i < 4; i++)
        {
            let feeditem = rssData.items[i]
            let newfeed : RSS = {
                Title: feeditem.title,
                imageurl: feeditem.itunes.image,
                published: feeditem.published,
                source: rssData.title,
                url: feeditem.links.map(z => z.url).toString()
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
        return true
    }
    catch (err) {
        console.log("adding new source failed" + err)
    }
}

export async function GetSources() {
    return await AppDataSource.manager.find(SourceLink)
}

export async function DeleteLinks() {
    try {
        await AppDataSource.manager.clear(SourceLink)
        return true
    }
    catch (err) {
        console.log("Deleting All source links failed")
    }

}

export async function DeleteLink(id : number) {
    try {
        await AppDataSource.manager.delete(SourceLink, id)
    }
    catch (err) {
        console.log("Deleting source link of id" + id + "failed")
    }
}

export function SortRSS() {

}