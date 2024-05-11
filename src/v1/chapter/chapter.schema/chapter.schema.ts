import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { LightnovelVolume } from 'src/v1/volume/volume.schema/volume.schema';

@Schema()
export class LightnovelChapter {
  @Prop({ type: String, default: undefined, index: true })
  id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Object, required: true })
  content: Record<string, any>;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;

  @Prop({ type: Number, default: 0 })
  viewed: number;

  @Prop({ type: Number, default: 0 })
  words: number;

  @Prop({ type: Date })
  viewed_at: Date;

  @Prop({ type: Boolean, default: false })
  charge: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LightnovelVolume',
    required: true,
  })
  volume_id: LightnovelVolume;

  @Prop({ type: Number })
  created_at: number;

  @Prop({ type: Number, default: null })
  updated_at: number;
}

export type LightnovelChapterDocument = LightnovelChapter & Document;

export const LightnovelChapterSchema =
  SchemaFactory.createForClass(LightnovelChapter);
