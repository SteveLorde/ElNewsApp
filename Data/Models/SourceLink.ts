import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";


@Entity('sources')
export class SourceLink {

    constructor(url : string) {
        this.url = url
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url : string

}