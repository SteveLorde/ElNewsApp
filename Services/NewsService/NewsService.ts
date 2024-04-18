import {SourceLink} from "../../Data/Models/SourceLink"
import axios from "axios"
import {RSS} from "../../Data/Models/RSS"
import {AppDataSource} from "../../Data/DatabaseSetup"
import * as htmlparser2 from 'htmlparser2'
import * as cheerio from 'cheerio';

export class NewsService{

    constructor() {
    }

    async GetRSS() {
        try {
            return await this.FetchRSS()
        }
        catch (err) {
            console.log("GetRSS Failed" + err)
        }
    }

    async FetchRSS() {
        try {
            let AllRSS : RSS[] = []
            //1-get links
            let rsslinks = await this.GetSources()
            /*
            //WTF WHY?!
            if (rsslinks.length == 0) {
                AllRSS = []
            }
             */

            //2-iterate over links and fetch rss
            for (let i = 0; i < rsslinks.length; i++)
            {
                let rsslink = rsslinks[i].url
                let response = await axios.get(rsslink)
                let rssData = htmlparser2.parseFeed(response.data)
                const feeditemsxml = cheerio.load(response.data)
                let links : string[] = []
                let thumbnaillink = feeditemsxml('media\\:thumbnail, enclosure').each( (index,value) => {
                    let link = feeditemsxml(value).attr('url')
                    console.log("thumb url = " + link)
                    links.push(link)
                })
                for (let i = 0; i < 5; i++)
                {
                    let feeditem = rssData.items[i]
                    let newfeed : RSS = {
                        Title: feeditem.title,
                        imageurl: links[i],
                        published: feeditem.pubDate.toDateString(),
                        source: rssData.title,
                        url: feeditem.link
                    }
                    AllRSS.push(newfeed)
                }
            }
            return AllRSS
        }
        catch (err) {
            console.log(err)
        }
    }

    async AddLink(url : string) {
        try {
            let newsource = new  SourceLink(url)
            await AppDataSource.manager.save(newsource)
            console.log("Adding Link Successful")
        }
        catch (err) {
            console.log("Adding Link FAILED: " + err)
        }
    }

    async GetSources() {
        try {
            return await AppDataSource.manager.find(SourceLink)
        }
        catch (err) {
            console.log("Get Links Failed: " + err)
        }
    }

    async DeleteLinks() {
        try {
            await AppDataSource.manager.clear(SourceLink)
            console.log("Deleted All Links")
        }
        catch (err) {
            console.log("Deleting All Links failed: " + err)
        }
    }

    async DeleteLinkFromDatabase(id : number) {
        try {
            await AppDataSource.manager.delete(SourceLink, id)
            console.log('Deleted saved source successfully')
        }
        catch (err) {
            console.log('Deleting saved source FAILED ' + err)
        }
    }

}
