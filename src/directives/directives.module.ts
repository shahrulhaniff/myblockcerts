import { NgModule } from '@angular/core';
import { TextAvatarDirective } from './text-avatar/text-avatar';
import { ParallaxHeader } from './parallax-header/parallax-header';
@NgModule({
	declarations: [TextAvatarDirective,
    ParallaxHeader],
	imports: [],
	exports: [TextAvatarDirective,
    ParallaxHeader]
})
export class DirectivesModule {}
