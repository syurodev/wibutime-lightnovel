import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Category {
  @Prop({ type: mongoose.Schema.Types.ObjectId, index: true })
  id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;
}

export type CategoryDocument = Category & Document;

export const CategorySchema = SchemaFactory.createForClass(Category);
