import { ApiProperty } from '@nestjs/swagger';
export class topRestaurantsDTO{
    @ApiProperty()
    dishNumber: number;

    @ApiProperty()
    startPrice: number;

    @ApiProperty()
    endPrice: number;
};

export class fineOpenRestaurantsDTO{
    @ApiProperty()
    day: string;

    @ApiProperty()
    startTime: number;

    @ApiProperty()
    endTime: number;
}
export class searchRestaurantsDTO{
    @ApiProperty()
    searchTerm: string;
}

export class CreateRestaurantDto {}

