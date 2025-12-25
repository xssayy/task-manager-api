import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';

export class TaskDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'Buy groceries' })
  title: string;

  @ApiProperty({ example: 'Milk, eggs, bread', nullable: true })
  description: string | null;

  @ApiProperty({ enum: TaskStatus, example: TaskStatus.TODO })
  status: TaskStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class UpdateTaskResponseDto {
  @ApiProperty({ example: 'Task with id xxx updated successfully' })
  message: string;

  @ApiProperty({ type: TaskDto })
  data: TaskDto;
}

export class DeleteTaskResponseDto {
  @ApiProperty({ example: 'Task with id xxx deleted successfully' })
  message: string;
}
