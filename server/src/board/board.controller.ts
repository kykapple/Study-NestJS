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
import {BoardService} from "./board.service";
import {Board, BoardStatus} from "./board.model";
import {BoardDto} from "./dto/board.dto";
import {BoardPipe} from "./pipes/board.pipe";

@Controller('/board')
export class BoardController {
    constructor(private boardService: BoardService) {}

    @Get()
    getBoards(): Board[] {
        return this.boardService.getBoards();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() boardDto: BoardDto): Board {
        return this.boardService.createBoard(boardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: string): Board {
        return this.boardService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id: string): void {
        return this.boardService.deleteBoard(id);
    }

    @Patch('/:id')
    updateBoardStatus(
        @Param('id') id: string,
        @Body('status', BoardPipe) status: BoardStatus
    ): Board {
        return this.boardService.updateBoardStatus(id, status);
    }

}
