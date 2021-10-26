import {Injectable, NotFoundException} from '@nestjs/common';
import {  BoardStatus } from "./board.status.enum";
import { BoardDto } from "./dto/board.dto";
import { v1 as uuid } from 'uuid';
import {InjectRepository} from "@nestjs/typeorm";
import {BoardRepository} from "./board.repository";
import {Board} from "./board.entity";

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository
    ) {}

    async getBoardById(id: number): Promise<Board> {
        const board = await this.boardRepository.findOne(id);

        if(!board) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return board;
    }

    async getBoards(): Promise<Board[]> {
        return this.boardRepository.find();
    }

    async createBoard(boardDto: BoardDto): Promise<Board> {
        const { title, description } = boardDto;
        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
        });

        await this.boardRepository.save(board);
        return board;
    }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);

        if(!result.affected) {
            throw new NotFoundException(`Can't find board with id ${id}`);
        }
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<void> {
        // const board = await this.getBoardById(id);
        // board.status = status;
        //
        // return await this.boardRepository.save(board);
        const result = await this.boardRepository.update(id, { status }) ;

        if(!result.affected) {
            throw new NotFoundException(`Can't find board with id ${id}`);
        }
    }

}


