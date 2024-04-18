import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";


@Entity('sources')
export class NewsSource {

    constructor(url : string) {
        this.url = url
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url : string

}