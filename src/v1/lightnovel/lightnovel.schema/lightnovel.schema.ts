import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LightnovelStatus } from 'src/common/enums/lightnovel-status.enum';

@Schema()
export class Lightnovel {
  @Prop({ type: String, required: true, index: true, alias: 'url_id' }) // ID sử dụng trên url
  urlId: string;

  @Prop({ type: String, required: true, index: true })
  name: string;

  @Prop({
    type: [String],
    required: true,
    default: [],
    index: true,
    alias: 'other_names',
  })
  otherNames: string[];

  @Prop({ type: String })
  author?: string;

  @Prop({ type: String })
  illustrator?: string;

  @Prop({ type: String, default: '' })
  image?: string;

  @Prop({ type: Object, default: [], required: true })
  categories: string[];

  @Prop({ type: Object, required: true })
  summary: Record<string, any>; // Data output từ tiptap editor

  @Prop({ type: Boolean, default: false })
  deleted: boolean;

  @Prop({
    type: Number,
    enum: LightnovelStatus,
    default: LightnovelStatus.InProcess,
  })
  status: LightnovelStatus;

  @Prop({ type: Number, default: 0 })
  score: number;

  @Prop({ type: Number, default: 16 })
  rating: number;

  @Prop({ type: Object })
  note?: Record<string, any>; // Data output từ tiptap editor

  @Prop({ type: Number, required: true, alias: 'user_id' })
  userId: number;

  @Prop({ type: Number, alias: 'translation_group_id' })
  translationGroupId?: number;

  @Prop({ type: Number, alias: 'created_at' })
  createdAt: number;

  @Prop({ type: Number, default: null, alias: 'updated_at' })
  updatedAt: number;
}

export type LightnovelDocument = Lightnovel & Document;
export const LightnovelSchema = SchemaFactory.createForClass(Lightnovel);
