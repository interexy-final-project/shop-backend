import { Controller, Get } from '@nestjs/common';
import { FetchPropertiesService } from './fetch-properties.service';

@Controller('fetch-properties')
export class FetchPropertiesController {
  constructor(
    private readonly fetchPropertiesService: FetchPropertiesService,
  ) {}

  @Get('getSizes')
  public async getAllSizes() {
    return await this.fetchPropertiesService.getAllSizes();
  }

  @Get('getColors')
  public async getAllColors() {
    return await this.fetchPropertiesService.getAllColors();
  }
}
