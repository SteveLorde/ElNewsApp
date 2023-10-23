import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class SourceLink {

    constructor(url : string) {
        this.url = url
    }

    // @ts-ignore
    @PrimaryGeneratedColumn
    id: number

    // @ts-ignore
    @Column
    url : string

}