import {ArgumentMetadata, BadRequestException, PipeTransform} from "@nestjs/common";
import {BoardStatus} from "../board.model";

export class BoardPipe implements PipeTransform {

    readonly StatusOptions = [
        BoardStatus.PUBLIC,
        BoardStatus.PRIVATE
    ];

    transform(value: any, metadata: ArgumentMetadata): any {
        value = value.toUpperCase();

        if(!this.StatusOptions.includes(value)) {
            throw new BadRequestException(`${value} isn't in the status`);
        }

        return value;
    }
}
