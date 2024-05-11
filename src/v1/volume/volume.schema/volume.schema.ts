import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { Lightnovel } from 'src/v1/lightnovel/lightnovel.schema/lightnovel.schema';

@Schema()
export class LightnovelVolume {
  @Prop({ type: Number, required: true, index: true }) // ID sử dụng trên url
  id: number;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Object, default: { key: '', url: '' } })
  image: { key: string; url: string };

  @Prop({ type: Boolean, default: false })
  deleted: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lightnovel',
    required: true,
  })
  lightnovel_id: Lightnovel;

  @Prop({ type: Number })
  created_at: number;

  @Prop({ type: Number, default: null })
  updated_at: number;
}

export type LightnovelVolumeDocument = LightnovelVolume & Document;

export const LightnovelVolumeSchema =
  SchemaFactory.createForClass(LightnovelVolume);
