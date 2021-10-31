import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Board} from "../board/board.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ name: 'refresh_token', select: false })
    refreshToken: string;

    @OneToMany(type => Board, board => board.user)
    boards: Board[];
}
