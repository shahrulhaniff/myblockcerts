import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MycertPage } from './mycert';

@NgModule({
  declarations: [
    MycertPage,
  ],
  imports: [
    IonicPageModule.forChild(MycertPage),
  ],
})
export class MycertPageModule {}
