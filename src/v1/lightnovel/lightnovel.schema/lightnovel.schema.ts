import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { LightnovelStatus } from 'src/utils/utils.enums/lightnovel-status.enum';

@Schema()
export class Lightnovel {
  @Prop({ type: String, required: true, index: true }) // ID sử dụng trên url
  url_id: string;

  @Prop({ type: String, required: true, index: true })
  name: string;

  @Prop({ type: [String], required: true, default: [], index: true })
  other_names: string[];

  @Prop({ type: String })
  author?: string;

  @Prop({ type: String })
  illustrator?: string;

  @Prop({ type: Object, default: { key: '', url: '' } })
  image?: { key: string; url: string };

  @Prop({ type: Object, default: [], required: true })
  categories: { id: string; name: string }[];

  @Prop({ type: Object, required: true })
  summary: Record<string, any>; // Data output từ tiptap editor

  @Prop({ type: Boolean, default: false })
  deleted: boolean;

  @Prop({
    type: String,
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

  @Prop({ type: Number, required: true })
  user_id: number;

  @Prop({ type: Number })
  translation_group_id?: number;

  @Prop({ type: Number })
  created_at: number;

  @Prop({ type: Number, default: null })
  updated_at: number;
}

export type LightnovelDocument = Lightnovel & Document;
export const LightnovelSchema = SchemaFactory.createForClass(Lightnovel);
