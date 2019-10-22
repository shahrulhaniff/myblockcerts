import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PfdmodalPage } from './pfdmodal';

import { DocumentViewer } from '@ionic-native/document-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    PfdmodalPage,
  ],
  imports: [
    IonicPageModule.forChild(PfdmodalPage),
    ,DocumentViewer
    ,PdfViewerModule
  ],
})
export class PfdmodalPageModule {}
