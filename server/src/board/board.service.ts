import {Injectable, NotFoundException} from '@nestjs/common';
import { Board, BoardStatus } from "./board.model";
import { BoardDto } from "./dto/board.dto";
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardService {
    private boards: Board[] = [];

    getBoards(): Board[] {
        return this.boards;
    }

    createBoard(boardDto: BoardDto): Board {
        const { title, description } = boardDto;
        const board: Board = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC,
        };

        this.boards.push(board);
        return board;
    }

    getBoardById(id: string): Board {
        const board = this.boards.find(boards => boards.id === id);

        if(!board) {
            throw new NotFoundException(`Cant find board with id ${id}`);
        }

        return board;
    }

    deleteBoard(id: string): void {
        const board = this.getBoardById(id);
        this.boards = this.boards.filter(board => board.id !== id);
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }

}


