import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {BoardService} from "../board.service";
import { BoardStatus } from "../board.status.enum";
import {BoardDto} from "../dto/board.dto";
import {BoardPipe} from "../pipes/board.pipe";
import {Board} from "../board.entity";

@Controller('/board')
export class BoardController {
    constructor(private boardService: BoardService) {}

    @Get()
    getBoards(): Promise<Board[]> {
        return this.boardService.getBoards();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() boardDto: BoardDto): Promise<Board> {
        return this.boardService.createBoard(boardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
        return this.boardService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.boardService.deleteBoard(id);
    }

    @Patch('/:id')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardPipe) status: BoardStatus
    ): Promise<void> {
        return this.boardService.updateBoardStatus(id, status);
    }

}
