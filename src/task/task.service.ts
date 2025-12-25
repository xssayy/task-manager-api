import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';
import {
  DeleteTaskResponseDto,
  UpdateTaskResponseDto,
} from './dto/task-response.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.prisma.task.create({ data: createTaskDto });
  }

  async findAll(filterDto?: FilterTaskDto): Promise<Task[]> {
    const where = filterDto?.status ? { status: filterDto.status } : {};
    const orderBy = {
      [filterDto?.sort || 'createdAt']: filterDto?.order || 'desc',
    };
    return await this.prisma.task.findMany({ where, orderBy });
  }

  /**
   * Finds a task by ID. Also used as existence check in update/remove methods.
   * @throws NotFoundException if task not found
   */
  async findOne(id: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({ where: { id: id } });
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);
    return task;
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<UpdateTaskResponseDto> {
    await this.findOne(id);
    const result = await this.prisma.task.update({
      where: {
        id: id,
      },
      data: {
        ...updateTaskDto,
      },
    });
    return {
      message: `Task with id ${id} updated successfully`,
      data: result,
    };
  }

  async remove(id: string): Promise<DeleteTaskResponseDto> {
    await this.findOne(id);
    await this.prisma.task.delete({ where: { id: id } });
    return { message: `Task with id ${id} deleted successfully` };
  }
}
