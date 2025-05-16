import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PasswordsService } from './passwords.service';
import { CreatePasswordDto, UpdatePasswordDto } from './dto/index';
import { JwtAuthGuard } from '../auth/guards/index';
import { GetUser } from '../auth/decorators/index';

@Controller('passwords')
@UseGuards(JwtAuthGuard)
export class PasswordsController {
  constructor(private readonly passwordsService: PasswordsService) {}

  @Post()
  create(
    @Body() createPasswordDto: CreatePasswordDto,
    @GetUser() user: { id: string },
  ) {
    return this.passwordsService.create({
      ...createPasswordDto,
      userId: user.id,
    });
  }

  @Get()
  findAll(@GetUser() user: { id: string }) {
    return this.passwordsService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: { id: string }) {
    return this.passwordsService.findOne(id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
    @GetUser() user: { id: string },
  ) {
    return this.passwordsService.update(
      id,
      { ...updatePasswordDto, userId: user.id },
      user.id,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: { id: string }) {
    return this.passwordsService.remove(id, user.id);
  }
}
