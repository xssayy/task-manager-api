import { IsEnum, IsOptional, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';

export type SortField = 'createdAt' | 'updatedAt' | 'title';
export type SortOrder = 'asc' | 'desc';

export class FilterTaskDto {
  @ApiPropertyOptional({
    enum: TaskStatus,
    description: 'Filter by task status',
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({
    enum: ['createdAt', 'updatedAt', 'title'],
    description: 'Sort by field',
    default: 'createdAt',
  })
  @IsOptional()
  @IsIn(['createdAt', 'updatedAt', 'title'])
  sort?: SortField;

  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
    description: 'Sort order',
    default: 'desc',
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: SortOrder;
}
