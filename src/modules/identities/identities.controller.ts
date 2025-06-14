import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IdentitiesService } from './identities.service';
import { CreateIdentityDto } from './dto/create-identity.dto';
import { UpdateIdentityDto } from './dto/update-identity.dto';

@Controller('identities')
export class IdentitiesController {
  constructor(private readonly identitiesService: IdentitiesService) {}

  @Post()
  create(@Body() createIdentityDto: CreateIdentityDto) {
    return this.identitiesService.create(createIdentityDto);
  }

  @Get()
  findAll() {
    return this.identitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.identitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIdentityDto: UpdateIdentityDto) {
    return this.identitiesService.update(+id, updateIdentityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.identitiesService.remove(+id);
  }
}
