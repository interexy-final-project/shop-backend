import { Injectable } from '@nestjs/common';
import { FetchPropertiesRepo } from './repo/fetch-properties.repo';

@Injectable()
export class FetchPropertiesService {
  constructor(private readonly repo_fetch_properties: FetchPropertiesRepo) {}
  async getAllSizes() {
    return await this.repo_fetch_properties.getSizes();
  }

  async getAllColors() {
    return await this.repo_fetch_properties.getColors();
  }
}
